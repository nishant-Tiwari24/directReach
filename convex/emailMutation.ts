import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createEmailSearch = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    try {
      // Insert a new email search record into the 'emailSearches' table
      const newEmailSearchId = await ctx.db.insert('emailSearches', {
        companyName: args.companyName,
        employeeName: args.employeeName,
        jobTitle: args.jobTitle,
        jobRole: args.jobRole,
        purpose: args.purpose,
        email: args.email,
        generatedReferral: args.generatedReferral
      });

      return { success: true, emailSearchId: newEmailSearchId };
    } catch (error) {
      console.error("Error creating email search:", error);
      return { success: false, error: "Failed to create email search" };
    }
  },
});
