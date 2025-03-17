import { Request, Response } from "express";

import { generatePostPrompt, regeneratePostPrompt } from "@/utils/constant";
import { ZodError } from "zod";
import { postGenerateValidator } from "@repo/common/validator";
import { createClient, getUserId, improvePrompt } from "@/utils/helper";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import "dotenv/config";
import createError from "http-errors";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Please provide SUPABASE_URL and SUPABASE_KEY in .env file");
}

const supabase = createSupabaseClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const generatePost = async (request: Request, response: Response) => {
  try {
    const { query } = postGenerateValidator.parse(request.body);

    const enhancedPrompt = await improvePrompt(query);

    const promptData = JSON.parse(enhancedPrompt);

    const parsedPromptData = JSON.parse(promptData.output);

    const chatGemini = createClient("Gemini");
    const data = await chatGemini.chat({
      prompt: parsedPromptData.enhanced_prompt,
      systemInstruction: generatePostPrompt,
      outputFormat: "{`post_content`: ``}",
    });
    // @ts-ignore
    const postData = JSON.parse(data.content);
    const { data: insertedData, error } = await supabase
      .from("post")
      .insert([
        {
          user_id: getUserId(),
          user_query: query,
          enhanced_query: parsedPromptData.enhanced_prompt,
          post_content: postData.post_content,
        },
      ])
      .select();
    if (error) {
      console.log(error);
      throw createError(500, `Failed to insert post data: ${error}`);
    }

    response.status(200).json(insertedData);
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
};

export const regeneratePost = async (request: Request, response: Response) => {
  try {
    const { query } = postGenerateValidator.parse(request.body);

    const chatGemini = createClient("Gemini");
    const data = await chatGemini.chat({
      prompt: query,
      systemInstruction: regeneratePostPrompt,
      outputFormat: "{`post_content`: ``}",
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
};
