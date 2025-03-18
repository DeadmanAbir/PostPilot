import { z } from "zod";
import { demoValidator, fileUploadDetailsValidator } from "./validator";

export type DemoType = z.infer<typeof demoValidator>;

export type FileUploadDetail = z.infer<typeof fileUploadDetailsValidator>;
