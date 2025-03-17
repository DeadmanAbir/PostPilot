import { addNewUserData, getProfileData } from "@/controllers/profile";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/get-profile/:id", getProfileData);
router.post("/onboard-user", addNewUserData);

export default router;
