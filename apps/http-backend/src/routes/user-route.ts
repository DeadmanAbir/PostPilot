import {
  addNewUserData,
  getProfileData,
  getUser,
} from "@/controllers/user-controllers";
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/onboard-user", addNewUserData);

router.get("/get-user", getUser);
router.get("/get-profile", getProfileData);

export default router;
