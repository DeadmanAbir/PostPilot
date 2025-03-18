import { z } from "zod";
import {
  demoValidator,
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
