import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// === Queries ===

/**
 * Fetches a single build by its ID, joining with user data for creator's username.
 */
export const getById = query({
  args: { id: v.id("builds") },
  handler: async (ctx, args) => {
    const build = await ctx.db.get(args.id);
    if (!build) {
      return null; // Or throw an error if a build must exist
    }

    const creator = await ctx.db.get(build.user_id);
    if (!creator) {
      // This case should ideally not happen if data integrity is maintained
      console.warn(`Build ${build._id} has a user_id ${build.user_id} but no matching user found.`);
      return { ...build, creatorUsername: "Unknown User", likesCount: 0 };
    }
    
    // Get likes count for this build
    const likes = await ctx.db
      .query("likes")
      .withIndex("by_build_id", (q) => q.eq("build_id", build._id))
      .collect();
    
    // Check if the current user (if any) has liked this build
    let userHasLiked = false;
    const identity = await ctx.auth.getUserIdentity();
    if (identity) {
        const user = await ctx.db.query("users").withIndex("by_auth_id", q => q.eq("auth_id", identity.subject)).unique();
        if (user) {
            const like = await ctx.db.query("likes")
                .withIndex("by_user_build", q => q.eq("user_id", user._id).eq("build_id", build._id))
                .unique();
            userHasLiked = !!like;
        }
    }


    return {
      ...build,
      creatorUsername: creator.username,
      likesCount: likes.length,
      userHasLiked, // Add this field
    };
  },
});

/**
 * Fetches all builds, optionally filtered and sorted.
 * Joins with user data for creator's username and includes likes count.
 */
export const getAll = query({
  args: {
    filters: v.optional(
      v.object({
        game: v.optional(v.string()),
        user_id: v.optional(v.id("users")),
        // Add other potential filters here, e.g., title contains text
      })
    ),
    // Basic sort example, can be expanded
    sortField: v.optional(v.string()), // e.g., "_creationTime", "title"
    sortOrder: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  handler: async (ctx, args) => {
    let buildsQuery = ctx.db.query("builds");

    if (args.filters) {
      if (args.filters.game) {
        buildsQuery = buildsQuery.withIndex("by_game", (q) =>
          q.eq("game", args.filters.game)
        );
      }
      if (args.filters.user_id) {
        // If filtering by game also, this might require a more complex query or post-filtering
        // For simplicity, if user_id is provided, we assume it's the primary filter
        // or that an appropriate composite index exists or will be added.
        // If not filtering by game, this index is fine:
        if (!args.filters.game) {
             buildsQuery = buildsQuery.withIndex("by_user_id", (q) =>
                q.eq("user_id", args.filters.user_id)
            );
        }
      }
    }
    
    // Handle sorting
    if (args.sortField && args.sortOrder) {
        if (args.sortField === "_creationTime" || args.sortField === "title" || args.sortField === "game") { // Add other sortable fields from 'builds' table
            // @ts-ignore (Convex types might not fully cover dynamic sort fields on generic QueryBuilder)
             buildsQuery = buildsQuery.order(args.sortOrder === "asc" ? "asc" : "desc");
        }
    } else {
        // Default sort order if not specified
        buildsQuery = buildsQuery.order("desc"); // Sort by _creationTime descending by default
    }


    const builds = await buildsQuery.collect();
    
    // If filtering by user_id AND game, and no composite index, filter results post-query
    let filteredBuilds = builds;
    if (args.filters?.user_id && args.filters?.game) {
        filteredBuilds = builds.filter(build => build.user_id === args.filters?.user_id && build.game === args.filters?.game);
    }


    // Enhance builds with creator username and likes count
    const buildsWithDetails = await Promise.all(
      filteredBuilds.map(async (build) => {
        const creator = await ctx.db.get(build.user_id);
        const likes = await ctx.db
          .query("likes")
          .withIndex("by_build_id", (q) => q.eq("build_id", build._id))
          .collect();
        
        // Check if the current user (if any) has liked this build
        let userHasLiked = false;
        const identity = await ctx.auth.getUserIdentity();
        if (identity) {
            const user = await ctx.db.query("users").withIndex("by_auth_id", q => q.eq("auth_id", identity.subject)).unique();
            if (user) {
                const like = await ctx.db.query("likes")
                    .withIndex("by_user_build", q => q.eq("user_id", user._id).eq("build_id", build._id))
                    .unique();
                userHasLiked = !!like;
            }
        }

        return {
          ...build,
          creatorUsername: creator?.username || "Unknown User",
          likesCount: likes.length,
          userHasLiked,
        };
      })
    );

    return buildsWithDetails;
  },
});

// === Mutations ===

/**
 * Creates a new build, associating it with the authenticated user.
 */
export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    game: v.string(),
    build_data: v.any(), // Should match the type in schema.ts
    is_public: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to create a build.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    if (!user) {
      // This can happen if the user document isn't created yet after auth.
      // Consider creating it here or ensuring AuthContext handles it robustly.
      throw new Error("User profile not found. Please complete profile creation.");
    }

    const buildId = await ctx.db.insert("builds", {
      user_id: user._id,
      title: args.title,
      description: args.description,
      game: args.game,
      build_data: args.build_data,
      is_public: args.is_public ?? true, // Default to public if not specified
    });

    return buildId;
  },
});

/**
 * Updates an existing build. Ensures only the owner can update.
 */
export const update = mutation({
  args: {
    id: v.id("builds"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    game: v.optional(v.string()),
    build_data: v.optional(v.any()),
    is_public: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to update a build.");
    }

    const build = await ctx.db.get(args.id);
    if (!build) {
      throw new Error("Build not found.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    if (!user || build.user_id !== user._id) {
      throw new Error("User is not authorized to update this build.");
    }

    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    
    return { success: true, buildId: id };
  },
});

/**
 * Deletes a build. Ensures only the owner can delete.
 */
export const remove = mutation({
  args: { id: v.id("builds") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to delete a build.");
    }

    const build = await ctx.db.get(args.id);
    if (!build) {
      throw new Error("Build not found.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    if (!user || build.user_id !== user._id) {
      throw new Error("User is not authorized to delete this build.");
    }

    // Also delete associated likes and comments
    const likes = await ctx.db.query("likes").withIndex("by_build_id", q => q.eq("build_id", args.id)).collect();
    await Promise.all(likes.map(like => ctx.db.delete(like._id)));

    const comments = await ctx.db.query("comments").withIndex("by_build_id", q => q.eq("build_id", args.id)).collect();
    await Promise.all(comments.map(comment => ctx.db.delete(comment._id)));


    await ctx.db.delete(args.id);
    return { success: true, buildId: args.id };
  },
});

/**
 * Allows an authenticated user to like/unlike a build.
 */
export const toggleLike = mutation({
  args: { buildId: v.id("builds") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to like/unlike a build.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User profile not found.");
    }

    const existingLike = await ctx.db
      .query("likes")
      .withIndex("by_user_build", (q) =>
        q.eq("user_id", user._id).eq("build_id", args.buildId)
      )
      .unique();

    if (existingLike) {
      // User has already liked, so unlike
      await ctx.db.delete(existingLike._id);
      return { liked: false, buildId: args.buildId };
    } else {
      // User has not liked, so like
      await ctx.db.insert("likes", {
        user_id: user._id,
        build_id: args.buildId,
      });
      return { liked: true, buildId: args.buildId };
    }
  },
});
