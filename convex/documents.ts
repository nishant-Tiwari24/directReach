import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createProfile = mutation({
  args: {
    education: v.string(),
    skills: v.array(v.string()),
    experience: v.string(),
    interests: v.string(),
    location: v.string(),
    githubUsername: v.string(),
    leetcodeUsername: v.string(),
    projects: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const newProfileId = await ctx.db.insert('profiles', {
      education: args.education,
      skills: args.skills,
      experience: args.experience,
      interests: args.interests,
      location: args.location,
      githubUsername: args.githubUsername,
      leetcodeUsername: args.leetcodeUsername,
      projects: args.projects,
    });
    return newProfileId;
  },
});
