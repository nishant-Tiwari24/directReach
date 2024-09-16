import { NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface FormData {
  githubUsername: string;
  leetcodeUsername: string;
  education: string;
  skills: string[];
  experience: string;
  interests: string;
  location: string;
  projects: string[];
}

export async function POST(req: Request) {
  try {
    const formData: FormData = await req.json();

    // Fetch GitHub Data
    const githubResponse = await axios.get(
      `https://api.github.com/users/${formData.githubUsername}/repos`
    );
    const githubData = githubResponse.data;

    // Validating and safely accessing GitHub data
    const githubRepos = githubData.public_repos || 0;
    const githubFollowers = githubData.followers || 0;
    const githubLanguages = githubData.language
      ? Object.keys(githubData.language).join(", ")
      : "N/A";
    const selectedRepos = formData.projects.join(", ");

    // Fetch LeetCode Data
    let leetcodeSolved = 0;
    let leetcodeRanking = "N/A";
    try {
      const leetcodeResponse = await axios.get(
        `https://leetcode-stats-api.herokuapp.com/${formData.leetcodeUsername}`
      );
      const leetcodeData = leetcodeResponse.data;
      leetcodeSolved = leetcodeData.totalSolved || 0;
      leetcodeRanking = leetcodeData.ranking || "N/A";
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
    }

    // Email template prompt
    const emailTemplate = `Generate a Markdown of 150 words

    I hope this message finds you well. I am writing to express my interest in the [Job Title] that I found on LinkedIn.

    With [number] years of experience in, I believe my skills in ${formData.skills.join(
      ", "
    )} align well with the requirements of the role.

    Thank you for considering my application. I have attached my resume for your review and would appreciate the opportunity to discuss how my background and skills make me a strong candidate for this position.

    I look forward to hearing from you.

    Best regards,`;

    const prompt = `You are an AI assistant tasked with creating a personalized email based on the following details:
    Education: ${formData.education}
    Skills: ${formData.skills.join(", ")}
    Experience: ${formData.experience}
    Interests: ${formData.interests}
    Location: ${formData.location}.
    GitHub: ${formData.githubUsername} - Repositories: ${githubRepos}, Followers: ${githubFollowers}, Languages: ${githubLanguages}, Selected Projects: ${selectedRepos}.
    LeetCode: ${formData.leetcodeUsername} - Problems Solved: ${leetcodeSolved}, Ranking: ${leetcodeRanking}.
    Use this reference template for the email:
    ${emailTemplate}.
    Ensure that the generated email is professional, concise, includes relevant details in short points, and is plain text. Limit the length to 100 words.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4",
    });

    const generatedEmail =
      completion.choices?.[0]?.message?.content || "Email generation failed.";

    return NextResponse.json({ generatedEmail });
  } catch (error) {
    console.error("Error generating email:", error);
    return NextResponse.json({
      error: "Failed to generate email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
