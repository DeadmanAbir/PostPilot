import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import createError from "http-errors";
import { ZodError } from "zod";
import { profileIdValidator } from "@repo/common/validator";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Please provide SUPABASE_URL and SUPABASE_KEY in .env file");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getProfileData(request: Request, response: Response) {
  try {
    const { id } = profileIdValidator.parse(request.params);

    const { data: users, error } = await supabase
      .from("users")
      .select("name , email, profile_url")
      .eq("id", id);

    if (error) {
      console.log(error);
      throw createError(500, `Failed to fetch user data: ${error}`);
    }

    response.status(200).json(users);
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof ZodError) {
      response
        .status(422)
        .json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
