import express, { Router } from "express";

import {
  fetchTweets,
  fetchWebsiteUrl,
  fetchYoutubeVideoDetails,
  getUsersAdmin,
  saveLocalFileData,
  saveRemoteFileData,
  saveTextNodeData,
} from "@/controllers/file-controllers";

const router: Router = express.Router();

router.post("/youtube-video", fetchYoutubeVideoDetails);

router.post("/fetch-tweet", fetchTweets);

router.post("/fetch-url", fetchWebsiteUrl);

router.post("/add-local-file", saveLocalFileData);

router.post("/add-remote-file", saveRemoteFileData);

router.post("/add-text-node", saveTextNodeData);

router.get("/files", getUsersAdmin);

export default router;
