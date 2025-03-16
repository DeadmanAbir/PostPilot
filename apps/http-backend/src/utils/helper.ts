import { ChatGemini } from "./chatGemini";
import { ChatOpenAI } from "./chatOpenAi";
import { improveQueryPrompt } from "./constant";

export function extractTweetId(url: string): string | null {
  const match = url.match(/status\/(\d+)/);
  return match?.[1] ?? null;
}

export const improvePrompt = async (prompt: string): Promise<string> => {
  try {
    const chatOpenAI = createClient("OpenAI");

    const data = await chatOpenAI.chat({
      prompt: prompt,
      systemInstruction: improveQueryPrompt,
      outputFormat: `{"enhanced_prompt": ""}`,
      temperature: 0.6,
    });

    return JSON.stringify(data);
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Error in improving prompt");
  }
};

export const createClient = (llm: "OpenAI" | "Gemini") => {
  if (llm == "OpenAI") {
    const chatOpenAI = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o-mini",
    });

    return chatOpenAI;
  }
  const chatGemini = new ChatGemini({
    apiKey: process.env.GEMINI_API_KEY!,
    model: "gemini-2.0-flash",
  });
  return chatGemini;
};

export const getUserId = (): string => {
  return "aba9a698-b5b1-4c9c-b39f-9c6467cc19f1";
};
