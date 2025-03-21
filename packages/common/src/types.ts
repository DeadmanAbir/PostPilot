import { z } from "zod";
import {
  demoValidator,
  linkedinPostValidator,
  localFileUploadDetailsValidator,
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
