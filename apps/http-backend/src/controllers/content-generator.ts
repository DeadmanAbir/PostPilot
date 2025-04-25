import { Response } from "express";

import {
  generatePostPrompt,
  improvePostPrompt,
  regeneratePostPrompt,
} from "../utils/constant";
import { ZodError } from "zod";
import {
  improvePostValidator,
  postGenerateValidator,
  postRegenerateValidator,
} from "@repo/common/validator";
import {
  createClient,
  fetchMediaData,
  fetchTextualData,
  improvePrompt,
} from "../utils/helper";
import "dotenv/config";
import { AuthRequest } from "../middlewares/authMiddleware";

export const generatePost = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { query, media } = postGenerateValidator.parse(request.body);

    const mockdata = await fetchMediaData({
      files: media.files,
      images: media.images,
      websites: media.websites,
    });
    const textData = await fetchTextualData({
      text_node: media.text_node,
      tweets: media.tweets,
    });

    const enhancedPrompt = await improvePrompt(query);

    const promptData = JSON.parse(enhancedPrompt);

    const parsedPromptData = JSON.parse(promptData.output);
    const prompt = parsedPromptData.enhanced_prompt.concat(
      "\n",
      "Note : If any context is available (in any form), **use it heavily** on your response."
    );
    console.log(textData, "textData");
    const chatGemini = createClient("Gemini");
    const data = await chatGemini.chat({
      prompt,
      systemInstruction: generatePostPrompt,
      outputFormat: "{`post_content`: ``}",
      file: mockdata,
      context: textData,
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
    const { query, previousPost, media } = postRegenerateValidator.parse(
      request.body
    );

    const mockdata = await fetchMediaData({
      files: media.files,
      images: media.images,
      websites: media.websites,
    });
    const textData = await fetchTextualData({
      text_node: media.text_node,
      tweets: media.tweets,
    });

    const chatGemini = createClient("Gemini");
    const data = await chatGemini.chat({
      prompt: query || "Revamp the post",
      systemInstruction: regeneratePostPrompt,
      context: previousPost.concat("\n", textData),
      outputFormat: "{`post_content`: ``}",
      file: mockdata,
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

export const improvePost = async (request: AuthRequest, response: Response) => {
  try {
    const { query } = improvePostValidator.parse(request.body);
    console.log(query, "query");
    const chatOpenai = createClient("OpenAI");
    const data = await chatOpenai.chat({
      prompt:
        "Here's a LinkedIn post I want to publish. Please enhance it according to your instructions.",
      systemInstruction: improvePostPrompt,
      context: query,
      outputFormat: '{"post_content": ""}',
    });

    // @ts-ignore
    const postContent = JSON.parse(data.output);
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
