import { Request, Response } from "express";
import { ChatOpenAI } from "@/utils/chatOpenAi";
import { generatePostPrompt, improveQueryPrompt } from "@/utils/constant";
import { ZodError } from "zod";
import { postGenerateValidator } from "@repo/common/validator";
import { ChatGemini } from "@/utils/chatGemini";

export async function generatePost(request: Request, response: Response) {
  try {
    const { query } = postGenerateValidator.parse(request.body);

    const enhancedPrompt = await improvePrompt(query);

    const chatGemini = new ChatGemini({
      apiKey: process.env.GEMINI_API_KEY!,
      model: "gemini-2.0-flash",
    });

    const data = await chatGemini.chat({
      prompt: enhancedPrompt,
      systemInstruction: generatePostPrompt,
      outputFormat: `{"post_content": ""}`,
    });
    // @ts-ignore
    response.status(200).json(JSON.parse(data.content));
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof ZodError) {
      response
        .status(422)
        .json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}

export async function improvePrompt(prompt: string): Promise<string> {
  try {
    const chatOpenAI = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o-mini",
    });

    const data = await chatOpenAI.chat({
      prompt: prompt,
      systemInstruction: improveQueryPrompt,
      outputFormat: `{"enhanced_prompt": ""}`,
      temperature: 0.6,
    });
    // @ts-ignore
    return data.output;
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Error in improving prompt");
  }
}
