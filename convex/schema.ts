import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    email: v.string(),
    avatar_url: v.optional(v.string()),
    auth_id: v.string(),
  })
    .index("by_auth_id", ["auth_id"])
    .index("by_username", ["username"])
    .index("by_email", ["email"]),

  builds: defineTable({
    user_id: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    game: v.string(),
    build_data: v.any(), // Consider a more specific object type if known
    is_public: v.boolean(),
    // created_at will be handled by Convex's _creationTime system field
    // updated_at will be handled by Convex's _lastModifiedTime system field (if applicable to mutations)
  })
    .index("by_user_id", ["user_id"])
    .index("by_game", ["game"]),

  likes: defineTable({
    user_id: v.id("users"),
    build_id: v.id("builds"),
  }).index("by_user_build", ["user_id", "build_id"]),

  comments: defineTable({
    user_id: v.id("users"),
    build_id: v.id("builds"),
    text: v.string(),
    // created_at will be handled by Convex's _creationTime system field
  }).index("by_build_id", ["build_id"]),
});
