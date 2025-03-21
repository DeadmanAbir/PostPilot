import { Response } from "express";
import FirecrawlApp from "@mendable/firecrawl-js";
import "dotenv/config";
import createError from "http-errors";
import { ApifyClient } from "apify-client";
import { ZodError } from "zod";
import {
  youtubeValidator,
  twitterValidator,
  websiteUrlValidator,
  localFileUploadDetailsValidator,
  remoteFileUploadDetailsValidator,
  textNodeDataValidaor,
} from "@repo/common/validator";
import { extractTweetId, getUserId } from "@/utils/helper";
import { supabase } from "@/utils/supabaseClient";
import { AuthRequest } from "@/middlewares/authMiddleware";

export async function fetchYoutubeVideoDetails(
  request: AuthRequest,
  response: Response
) {
  try {
    const body = youtubeValidator.parse(request.body);

    const input = {
      outputFormat: "textWithTimestamps",
      urls: [body.url],
      maxRetries: 6,
      proxyOptions: {
        useApifyProxy: true,
        apifyProxyGroups: ["BUYPROXIES94952"],
      },
    };
    const client = new ApifyClient({
      token: process.env.APIFY_TOKEN,
    });
    const run = await client.actor("1s7eXiaukVuOr4Ueg").call(input);

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    const videoData = {
      url: body.url,
      video: items[0]?.captions,
    };

    const { data, error } = await supabase.from("files").insert([
      {
        user_id: getUserId(),
        tweet: JSON.stringify(videoData),
      },
    ]);

    if (error) {
      console.log(error);
      throw createError(
        500,
        `Failed to insert youtube video transcripts : ${error}`
      );
    }

    response.status(200).json(videoData);
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

export const fetchTweets = async (request: AuthRequest, response: Response) => {
  try {
    const { tweetUrl } = twitterValidator.parse(request.body);
    const tweetId = extractTweetId(tweetUrl);
    if (!tweetId) {
      throw createError(500, `No Tweet ID found for : ${tweetUrl}`);
    }
    const input = {
      tweetIDs: [tweetId],
      maxItems: 1,
    };
    const client = new ApifyClient({
      token: process.env.APIFY_TOKEN,
    });
    const run = await client.actor("CJdippxWmn9uRfooo").call(input);

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    const tweetData = {
      url: tweetUrl,
      tweet: items[0]?.text,
    };

    const userId = getUserId();

    const { data, error } = await supabase
      .from("tweets")
      .insert([
        { user_id: getUserId(), url: tweetData.url, tweet: tweetData.tweet },
      ])
      .select();

    if (error) {
      console.log(error);
      throw createError(500, `Failed to insert tweet data: ${error}`);
    }

    response.status(200).json(data);
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof ZodError) {
      response
        .status(422)
        .json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      console.log(e);
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export async function fetchWebsiteUrl(
  request: AuthRequest,
  response: Response
) {
  try {
    const { url } = websiteUrlValidator.parse(request.body);
    const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

    const scrapeResponse = await app.scrapeUrl(url, {
      formats: ["screenshot"],
    });

    if (!scrapeResponse.success) {
      throw createError(500, `Failed to scrape: ${scrapeResponse.error}`);
    }
    const websiteData = {
      url: url,
      screenshot: scrapeResponse.screenshot,
      title: scrapeResponse.title,
    };

    const { data, error } = await supabase
      .from("websites")
      .insert([
        {
          user_id: getUserId(),
          url: url,
          screenshot: websiteData.screenshot,
          title: websiteData.title,
        },
      ])
      .select();

    if (error) {
      console.log(error);
      throw createError(500, `Failed to insert website data`);
    }

    response.status(200).json(data);
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

export async function saveLocalFileData(
  request: AuthRequest,
  response: Response
) {
  try {
    const paths = localFileUploadDetailsValidator.parse(request.body);

    const data = paths.map((path) => {
      return {
        user_id: getUserId(),
        url: path.path,
        name: path.fileName,
      };
    });

    const { data: fileData, error } = await supabase
      .from("files")
      .insert(data)
      .select();

    if (error) {
      console.log(error);
      throw createError(500, `Failed to insert file data: ${error.message}`);
    }
    response.status(200).json({ fileData });
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

export async function saveRemoteFileData(
  request: AuthRequest,
  response: Response
) {
  try {
    const data = remoteFileUploadDetailsValidator.parse(request.body);

    const imageData = data.map((file) => {
      return {
        user_id: getUserId(),
        url: file.url,
        name: file.fileName,
      };
    });

    const { data: fileData, error } = await supabase
      .from("files")
      .insert(imageData)
      .select();

    if (error) {
      console.log(error);
      throw createError(500, `Failed to insert file data: ${error.message}`);
    }
    response.status(200).json({ fileData });
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

export async function saveTextNodeData(
  request: AuthRequest,
  response: Response
) {
  try {
    const { name, description } = textNodeDataValidaor.parse(request.body);

    const { data, error } = await supabase
      .from("text_node")
      .insert([{ user_id: getUserId(), name: name, description }])
      .select();

    if (error) {
      console.log(error);
      throw createError(
        500,
        `Failed to insert text node  data: ${error.message}`
      );
    }
    response.status(200).json({ data });
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

export function getUsersAdmin(request: AuthRequest, response: Response) {
  console.log(request.userId, request.email, request.displayName);

  response.status(200).json("Sorry, cant find that");
}
