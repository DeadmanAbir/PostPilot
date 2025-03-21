import {
  getLinkedinCredentials,
  getLinkedinStatus,
  handleLinkedinCallback,
  postToLinkedin,
} from "@/controllers/linkedin-auth-controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/status", getLinkedinStatus);
router.get("/callback", handleLinkedinCallback);

router.post("/post", postToLinkedin);
router.get("/get-credentials", getLinkedinCredentials);

export default router;
