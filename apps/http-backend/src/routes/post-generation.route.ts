import { generatePost, regeneratePost } from "@/controllers/content-generator";
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/generate-post", generatePost);
router.post("/regenerate-post", regeneratePost);

export default router;
