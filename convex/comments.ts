import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// === Queries ===

/**
 * Fetches all comments for a specific build, ordered by creation time (descending).
 * Joins with user data to get commenter's username and avatar.
 */
export const getByBuildId = query({
  args: { buildId: v.id("builds") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_build_id", (q) => q.eq("build_id", args.buildId))
      .order("desc") // Order by _creationTime descending for newest first
      .collect();

    // Enhance comments with commenter's username and avatar_url
    const commentsWithUserDetails = await Promise.all(
      comments.map(async (comment) => {
        const commenter = await ctx.db.get(comment.user_id);
        return {
          ...comment,
          commenterUsername: commenter?.username || "Unknown User",
          commenterAvatarUrl: commenter?.avatar_url || null, // Or a default avatar
        };
      })
    );

    return commentsWithUserDetails;
  },
});

// === Mutations ===

/**
 * Creates a new comment, associating it with the authenticated user.
 */
export const create = mutation({
  args: {
    buildId: v.id("builds"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to create a comment.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User profile not found. Cannot create comment.");
    }

    const commentId = await ctx.db.insert("comments", {
      user_id: user._id,
      build_id: args.buildId,
      text: args.text,
    });

    return commentId;
  },
});

/**
 * Deletes a comment. Ensures only the owner of the comment can delete.
 */
export const remove = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to delete a comment.");
    }

    const comment = await ctx.db.get(args.id);
    if (!comment) {
      throw new Error("Comment not found.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    if (!user || comment.user_id !== user._id) {
      // Add admin override capability here if needed in the future
      throw new Error("User is not authorized to delete this comment.");
    }

    await ctx.db.delete(args.id);
    return { success: true, commentId: args.id };
  },
});
