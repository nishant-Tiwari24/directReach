import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    education: v.string(),
    experience: v.string(),
    githubUsername: v.string(),
    interests: v.string(),
    leetcodeUsername: v.string(),
    location: v.string(),
    projects: v.array(v.string()),
    skills: v.array(v.string()),
  }),
  emailSearches: defineTable({
    companyName: v.string(),
    employeeName: v.object({
      firstName: v.string(),
      lastName: v.string(),
    }),
    jobTitle: v.string(),
    jobRole: v.string(),
    purpose: v.string(),
    email: v.string() || null,
    generatedReferral: v.string() || null
  }),
});
