import express, { Router } from "express";

import {
  fetchTweets,
  fetchWebsiteUrl,
  fetchYoutubeVideoDetails,
  getUsersAdmin,
} from "@/controllers/file-controllers";

const router: Router = express.Router();

router.post("/youtube-video", fetchYoutubeVideoDetails);

router.post("/fetch-tweet", fetchTweets);

router.post("/fetch-url", fetchWebsiteUrl);

router.get("/files", getUsersAdmin);

export default router;
