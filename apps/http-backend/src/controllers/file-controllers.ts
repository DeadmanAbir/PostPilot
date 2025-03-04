import { Request, Response } from "express";
import FirecrawlApp from "@mendable/firecrawl-js";
import "dotenv/config";
import createError from "http-errors";
import { ApifyClient } from "apify-client";
import { ZodError } from "zod";
// helper functions
import {
  youtubeValidator,
  twitterValidator,
  websiteUrlValidator,
} from "@repo/common/validator";
import { extractTweetId } from "@/utils/helper";

export async function fetchYoutubeVideoDetails(
  request: Request,
  response: Response
) {
  try {
    const data = youtubeValidator.parse(request.body);

    const input = {
      outputFormat: "textWithTimestamps",
      urls: [data.url],
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

    // Fetch and print Actor results from the run's dataset (if any)
    console.log("Results from dataset");
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    response.status(200).json(items[0]?.captions);
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

export async function fetchTweets(request: Request, response: Response) {
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

    response.status(200).json(items[0]);
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

export async function fetchWebsiteUrl(request: Request, response: Response) {
  try {
    const { url } = websiteUrlValidator.parse(request.body);
    const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

    const scrapeResponse = await app.scrapeUrl(url, {
      formats: ["screenshot"],
    });

    if (!scrapeResponse.success) {
      throw createError(500, `Failed to scrape: ${scrapeResponse.error}`);
    }
    response.status(200).json(scrapeResponse);
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

export function getUsersAdmin(request: Request, response: Response) {
  response.status(200).json("Sorry, cant find that");
}
