import { z } from "zod";

export const demoValidator = z.object({
  name: z.string(),
});

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
  media: z.object({
    files: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    text_node: z.array(z.string()).optional(),
    tweets: z.array(z.string()).optional(),
    youtube: z.array(z.string()).optional(),
    websites: z.array(z.string()).optional(),
  }),
});

export const postRegenerateValidator = z.object({
  query: z.string().optional(),
  previousPost: z.string(),
});

export const profileIdValidator = z.object({
  id: z.string(),
});

export const localFileUploadDetailsValidator = z.array(
  z.object({
    name: z.string(),
    url: z.string(),
    storage_name: z.string(),
  })
);

export const remoteFileUploadDetailsValidator = z.array(
  z.object({
    fileName: z.string().optional(),
    url: z.string().url(),
  })
);

export const textNodeDataValidaor = z.object({
  name: z.string(),
  description: z.string(),
});

export const linkedinCallbackValidator = z.object({
  code: z.string(),
  error: z.string().optional(),
});

export const linkedinPostValidator = z.object({
  text: z.string(),
  shareUrl: z.string().optional(),
  title: z.string().optional(),
  visibility: z.enum(["PUBLIC", "CONNECTIONS"]),
  images: z.array(z.string()).optional(),
  video: z.string().optional(),
});

export const profileUpdateValidator = z.object({
  name: z.string().optional(),
  profile_url: z.string().optional(),
});
