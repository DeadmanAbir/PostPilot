import {
  getLinkedinCredentials,
  getLinkedinStatus,
  handleLinkedinCallback,
  postToLinkedin,
} from "../controllers/linkedin-auth-controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/status", getLinkedinStatus);
router.get("/callback", handleLinkedinCallback);
router.get("/get-credentials", getLinkedinCredentials);

router.post("/post", postToLinkedin);

export default router;
