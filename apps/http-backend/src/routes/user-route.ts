import {
  addNewUserData,
  getProfileData,
  getUser,
  updateUserData,
} from "@/controllers/user-controllers";
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/onboard-user", addNewUserData);
router.patch("/update-user", updateUserData);

router.get("/get-user", getUser);
router.get("/get-profile", getProfileData);

export default router;
