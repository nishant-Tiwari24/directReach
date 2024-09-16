import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request, res: NextResponse) {
  const {
    companyName,
    employeeName: { firstName, lastName },
    jobTitle,
    jobRole,
    purpose,
  } = await req.json();
  const prompt = `
  
 
  You are an AI assistant tasked with creating a short, personalized email referral for an individual. Here is the template which you have to follow dont leave any square bracket normally empty:
  Hi Nishant,
  [insert what you have in common with person you are reaching out to]. I came across the [name of role you are applying to (can also make it a hyperlink)] role at [Company name] and am interested in applying. Would you be open to sharing my resume with the hiring team so they know about my interest in this role? Happy to chat more if you have the time. Looking forward to hearing from you.
  
  - Company Name: ${companyName}
  - Employee's First Name: ${firstName}
  - Employee's Last Name: ${lastName}
  - Job Title: ${jobTitle}
  - Job Role: ${jobRole}
  - Purpose of the Email: ${purpose}

  Please craft a concise message (not a mail, no salutations required, no subject, just a great message for linkedin) of 40-50 words, highlighting the key strengths of the individual in relation to their job title and role, and aligning it with the purpose of the .`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional email referral writer.",
      },
      { role: "user", content: prompt },
    ],
    model: "gpt-4o-mini",
  });

  const generatedReferral = completion.choices[0].message.content;
  console.log({ generatedReferral });
  return NextResponse.json({ generatedReferral });
}
