import { Request, Response } from "express";
import "dotenv/config";
import { ApifyClient } from "apify-client";
// helper functions
import { youtubeValidator, twitterValidator } from "@repo/common/validator";
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
  } catch (e: any) {
    response.status(422).json({ error: e.message });
  }
}

export async function fetchTweets(request: Request, response: Response) {
  try {
    const { tweetUrl } = twitterValidator.parse(request.body);
    const tweetId = extractTweetId(tweetUrl);
    if (!tweetId) {
      throw new Error(`No Tweet ID found for : ${tweetUrl}`);
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
  } catch (e: any) {
    console.log(e);
    response.status(422).json({ error: e.message });
  }
}

export function getUsersAdmin(request: Request, response: Response) {
  response.status(200).json("Sorry, cant find that");
}
