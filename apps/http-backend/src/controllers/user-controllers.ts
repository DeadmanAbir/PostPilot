import { Request, Response } from "express";
import "dotenv/config";
import createError from "http-errors";
import { ZodError } from "zod";

import { profileIdValidator } from "@repo/common/validator";

import jwt from "jsonwebtoken";
import { supabase } from "@/utils/supabaseClient";

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

export async function addNewUserData(request: Request, response: Response) {
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

export async function getUser(request: Request, response: Response) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw createError(401, "Unauthorized: No headers provided.");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw createError(401, "Unauthorized: No token provided.");
    }

    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);

    if (typeof decoded !== "string" && decoded.sub) {
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
          post(*)
      `
        )
        .eq("id", decoded.sub);

      if (error) {
        console.log(error);
        throw createError(500, `Failed to get user data: ${error.message}`);
      }

      response.status(200).json({ users });
    } else {
      throw createError(401, "Unauthorized: Invalid token provided.");
    }
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
