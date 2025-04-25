import {
  addNewUserData,
  deleteLinkedinAccount,
  getLinkedinData,
  getPostData,
  getProfileData,
  getUser,
  updateUserData,
} from "../controllers/user-controllers";
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/onboard-user", addNewUserData);
router.patch("/update-user", updateUserData);
router.delete("/delete-account", deleteLinkedinAccount);

router.get("/get-user", getUser);
router.get("/get-linekdin-credentials", getLinkedinData);
router.get("/get-profile", getProfileData);
router.get("/get-posts", getPostData);

export default router;
