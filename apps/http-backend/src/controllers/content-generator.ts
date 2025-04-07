import { Response } from "express";

import { generatePostPrompt, regeneratePostPrompt } from "@/utils/constant";
import { ZodError } from "zod";
import {
  postGenerateValidator,
  postRegenerateValidator,
} from "@repo/common/validator";
import { createClient, getUserId, improvePrompt } from "@/utils/helper";
import "dotenv/config";
import createError from "http-errors";
import { AuthRequest } from "@/middlewares/authMiddleware";
import { supabase } from "@/utils/supabaseClient";

export const generatePost = async (
  request: AuthRequest,
  response: Response
) => {
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
    const insertedData = [
      {
        post_content: postData.post_content,
      },
    ];

    response.status(200).json({ insertedData });
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

export const regeneratePost = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { query, previousPost } = postRegenerateValidator.parse(request.body);

    const chatGemini = createClient("Gemini");
    const data = await chatGemini.chat({
      prompt: query || "Revamp the post",
      systemInstruction: regeneratePostPrompt,
      context: previousPost,
      outputFormat: "{`post_content`: ``}",
    });

    // @ts-ignore
    const postContent = JSON.parse(data.content);

    const updatedData = [{ post_content: postContent.post_content }];

    response.status(200).json({ updatedData });
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
