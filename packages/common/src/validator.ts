import { z } from "zod";

export const demoValidator = z.object({
  name: z.string(),
});

// demoValidator.parse(body); will do the validation
