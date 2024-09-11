import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request, res: NextResponse) {
  const { companyName, employeeName: { firstName, lastName }, jobTitle, jobRole, purpose } = await req.json();

  const prompt = `You are an AI assistant tasked with creating a short, personalized email referral for an individual. Here are the details:
  - Company Name: ${companyName}
  - Employee's First Name: ${firstName}
  - Employee's Last Name: ${lastName}
  - Job Title: ${jobTitle}
  - Job Role: ${jobRole}
  - Purpose of the Email: ${purpose}

  Please craft a concise message of 40-50 words, highlighting the key strengths of the individual in relation to their job title and role, and aligning it with the purpose of the email.`;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a professional email referral writer." },
      { role: "user", content: prompt },
    ],
    model: "gpt-4o-mini",
  });

  const generatedReferral = completion.choices[0].message.content;
  console.log({ generatedReferral });
  return NextResponse.json({ generatedReferral });
}
