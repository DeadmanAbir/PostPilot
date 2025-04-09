import { Response } from "express";
import "dotenv/config";
import createError from "http-errors";
import { ZodError } from "zod";

import { supabase } from "@/utils/supabaseClient";
import { AuthRequest } from "@/middlewares/authMiddleware";
import { profileUpdateValidator } from "@repo/common/validator";

export async function getProfileData(request: AuthRequest, response: Response) {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("name , email, profile_url, linkedin(expires_at, profile_pic)")
      .eq("id", request.userId);

    if (error) {
      console.log(error);
      throw createError(500, `Failed to fetch user data: ${error}`);
    }

    response.status(200).json({ users });
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

export async function addNewUserData(request: AuthRequest, response: Response) {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id: request.userId,
          name: request.displayName,
          email: request.email,
        },
      ])
      .select();

    if (error) {
      console.log(error);
      throw createError(500, `Failed to insert user data: ${error.message}`);
    }

    response.status(200).json({ data });
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

export async function updateUserData(request: AuthRequest, response: Response) {
  try {
    const { name, profile_url } = profileUpdateValidator.parse(request.body);
    const updateFields: Record<string, string> = {};

    if (name) updateFields.name = name;
    if (profile_url) updateFields.profile_url = profile_url;

    if (Object.keys(updateFields).length === 0) {
      response.status(400).json({ error: "No fields to update" });
      return;
    }

    const { error } = await supabase
      .from("users")
      .update(updateFields)
      .eq("id", request.userId);

    if (error) {
      console.error(error);
      throw createError(500, `Failed to update user data: ${error.message}`);
    }

    response.status(200).json({ success: true });
  } catch (e: unknown) {
    console.error(e);
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

export async function getUser(request: AuthRequest, response: Response) {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select(
        `
          *,
          youtube(*),
          images(*),
          tweets(*),
          websites(*),
          text_node(*),
          files(*),
          post(*)
      `
      )
      .eq("id", request.userId);

    if (error) {
      console.log(error);
      throw createError(500, `Failed to get user data: ${error.message}`);
    }

    response.status(200).json({ users });
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

export async function getLinkedinData(
  request: AuthRequest,
  response: Response
) {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("linkedin(expires_at, profile_pic)")
      .eq("id", request.userId);

    if (error) {
      console.log(error);
      throw createError(500, `Failed to fetch user linkedin data: ${error}`);
    }

    response.status(200).json({ users });
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
