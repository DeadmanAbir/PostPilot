import { z } from "zod";
import {
  demoValidator,
  linkedinPostValidator,
  localFileUploadDetailsValidator,
  profileUpdateValidator,
  remoteFileUploadDetailsValidator,
} from "./validator";

export type DemoType = z.infer<typeof demoValidator>;

export type LocalFileUploadDetail = z.infer<
  typeof localFileUploadDetailsValidator
>;

export type RemoteFileUploadDetail = z.infer<
  typeof remoteFileUploadDetailsValidator
>;

export type PostContent = z.infer<typeof linkedinPostValidator>;

export type ConnectToLinkedinResponse = {
  authUrl: string;
};

export type ProfileUpdateResponse = {
  success: boolean;
};

export type ProfileDetails = z.infer<typeof profileUpdateValidator>;
