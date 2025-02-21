import express, { Router } from "express";

import {
  fetchTweets,
  fetchYoutubeVideoDetails,
  getUsersAdmin,
} from "@/controllers/file-controllers";

const router: Router = express.Router();

router.post("/youtube-video", fetchYoutubeVideoDetails);

router.post("/fetch-tweet", fetchTweets);

router.get("/files", getUsersAdmin);

export default router;
