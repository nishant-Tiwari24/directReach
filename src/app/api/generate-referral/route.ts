import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request, res: NextResponse) {
    const formData = await req.json();
    const prompt = `You are an AI assistant tasked with creating a personalized referral for linked and X based on the following details:
    Education: ${formData.education}
    Skills: ${formData.skills.join(", ")}
    Experience: ${formData.experience}
    Interests: ${formData.interests}
    Location: ${formData.location}.
    `
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a professional refral writer" },
            { role: "user", content: prompt },
          ],
          model: "gpt-4o-mini",
    });

    const generatedReferral = completion.choices[0].message.content;
    return NextResponse.json({ generatedReferral });
}

