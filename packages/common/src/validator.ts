import { z } from "zod";

export const demoValidator = z.object({
  name: z.string(),
});

// demoValidator.parse(body); will do the validation

export const youtubeValidator = z.object({
  url: z.string().url(),
});

export const twitterValidator = z.object({
  tweetUrl: z.string().url(),
});

export const websiteUrlValidator = z.object({
  url: z.string().url(),
});

export const postGenerateValidator = z.object({
  query: z.string(),
});
