import { z } from "zod";
import { demoValidator } from "./validator";

export type DemoType = z.infer<typeof demoValidator>;
