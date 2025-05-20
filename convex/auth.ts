import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Creates a new user document after successful authentication.
 * Ensures that user profile information is stored in the database.
 */
export const createUser = mutation({
  args: {
    email: v.string(),
    username: v.string(),
    // avatar_url might be added if provided by auth provider
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called createUser without authentication present");
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    if (existingUser) {
      // Optionally update existing user details here if needed
      // For now, we'll just return the existing user ID
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      username: args.username,
      auth_id: identity.subject, // Link to the Convex auth identity
      // avatar_url: identity.pictureUrl, // If available and desired
    });

    return userId;
  },
});

/**
 * Retrieves a user document by their Convex authentication ID.
 */
export const getUserByAuthId = query({
  args: {}, // auth_id will be derived from the authenticated context
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // Not authenticated, so no user to return
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    return user;
  },
});

// Potential future additions:
// - Mutation to link OAuth provider information if not handled by default
// - Mutation to update user profile (username, avatar_url, etc.)
// - Query to get user by username (e.g., for profile pages)
//   export const getUserByUsername = query({
//     args: { username: v.string() },
//     handler: async (ctx, args) => {
//       return await ctx.db
//         .query("users")
//         .withIndex("by_username", (q) => q.eq("username", args.username))
//         .unique();
//     },
//   });
