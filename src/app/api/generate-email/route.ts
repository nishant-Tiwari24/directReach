import { NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    // Fetch GitHub Data
    const githubResponse = await axios.get(
      `https://api.github.com/users/${formData.githubUsername}/repos`
    );
    const githubData = githubResponse.data;
    const selectedRepos = formData.projects.join(", ");
    const githubRepos = githubData.public_repos;
    const githubFollowers = githubData.followers;
    const githubLanguages = Object.keys(githubData.language || {}).join(", ");

    // Fetch LeetCode Data
    const leetcodeResponse = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${formData.leetcodeUsername}`
    );
    const leetcodeData = leetcodeResponse.data;
    const leetcodeSolved = leetcodeData.totalSolved;
    const leetcodeRanking = leetcodeData.ranking;

    // Cold Email Template
    const emailTemplate = ` Generate a string not a Markdown
    Dear Nishant Tiwari,

    I hope this message finds you well. I am writing to express my interest in the [Job Title] position at Welix Fintech that I found on LinkedIn.

    With [number] years of experience in , I believe my skills in ${formData.skills.join(
      ", "
    )} align well with the requirements of the role.

    Thank you for considering my application. I have attached my resume for your review and would appreciate the opportunity to discuss how my background and skills make me a strong candidate for this position.

    I look forward to hearing from you.

    Best regards,
    `;

    const prompt = `You are an AI assistant tasked with creating a personalized email based on the following details:
    Education: ${formData.education}
    Skills: ${formData.skills.join(", ")}
    Experience: ${formData.experience}
    Interests: ${formData.interests}
    Location: ${formData.location}.
    GitHub: ${
      formData.githubUsername
    } - Repositories: ${githubRepos}, Followers: ${githubFollowers}, Languages: ${githubLanguages}, Selected Projects: ${selectedRepos}.
    LeetCode: ${
      formData.leetcodeUsername
    } - Problems Solved: ${leetcodeSolved}, Ranking: ${leetcodeRanking}.
    Take refrence from following template for the email:
    ${emailTemplate} Tell about projects with project description in points for 
    Ensure that the generated email is professional, includes relevant details in short points, and is formatted using Markdown. of less than 100 words`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o-mini",
    });

    const generatedEmail = completion.choices[0].message.content;
    return NextResponse.json({ generatedEmail });
  } catch (error) {
    console.error("Error generating email:", error);
    return NextResponse.error();
  }
}
