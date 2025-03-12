import { generatePost } from "@/controllers/content-generator";
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/generate-post", generatePost);

export default router;
