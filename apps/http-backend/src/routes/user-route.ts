import {
  addNewUserData,
  getProfileData,
  getUser,
  saveFileData,
} from "@/controllers/user-controllers";
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/onboard-user", addNewUserData);
router.post("/insert-file", saveFileData);

router.get("/get-user", getUser);
router.get("/get-profile/:id", getProfileData);

export default router;
