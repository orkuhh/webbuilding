import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// === Queries ===

/**
 * Fetches a user profile by their _id.
 */
export const getById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user; // Returns the full user document, sensitive fields should be handled by client or schema visibility
  },
});

/**
 * Fetches a user profile by their username.
 */
export const getByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();
    return user;
  },
});

/**
 * Fetches the profile of the currently authenticated user.
 */
export const getCurrentUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // Not authenticated
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();
    
    return user;
  },
});


// === Mutations ===

/**
 * Updates the authenticated user's profile.
 * Ensures username uniqueness if it's being changed.
 */
export const update = mutation({
  args: {
    username: v.optional(v.string()),
    // avatar_url will be updated by uploadAvatarUrl after file upload
    // email can also be part of this if you allow users to change it (ensure uniqueness)
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to update their profile.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User profile not found.");
    }

    // Handle username change and uniqueness check
    if (args.username && args.username !== user.username) {
      const existingUserWithNewUsername = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", args.username))
        .unique();
      if (existingUserWithNewUsername) {
        throw new Error("Username is already taken. Please choose another one.");
      }
    }
    
    // Prepare updates, filtering out undefined values
    const updates = {
        ...(args.username !== undefined && { username: args.username }),
    };

    if (Object.keys(updates).length > 0) {
        await ctx.db.patch(user._id, updates);
    }

    return { success: true, userId: user._id };
  },
});

/**
 * Generates a short-lived URL for uploading a file to Convex storage.
 * This is the first step in the file upload process.
 */
export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
   if (!identity) {
    throw new Error("User must be authenticated to generate an upload URL.");
  }
  return await ctx.storage.generateUploadUrl();
});


/**
 * Updates the avatar_url on the user's profile after a file is uploaded.
 * This is called after the client successfully POSTs the file to the URL from generateUploadUrl.
 */
export const uploadAvatarUrl = mutation({
  args: { storageId: v.string() }, // The ID of the uploaded file in Convex storage
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to update their avatar.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_id", (q) => q.eq("auth_id", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User profile not found.");
    }
    
    // Get the URL for the stored file
    const avatarUrl = await ctx.storage.getUrl(args.storageId);
    if (!avatarUrl) {
        throw new Error("Failed to get URL for the stored avatar image.");
    }

    await ctx.db.patch(user._id, { avatar_url: avatarUrl, }); // Assuming storageId is the new avatar_url or you convert it

    return { success: true, avatarUrl: avatarUrl };
  },
});
