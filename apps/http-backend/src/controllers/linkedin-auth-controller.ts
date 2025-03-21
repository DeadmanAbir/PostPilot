import { Request, Response } from "express";
import "dotenv/config";
import createError from "http-errors";
import { ZodError } from "zod";
import { createClient } from "@supabase/supabase-js";
import {
  exchangeCodeForToken,
  getCredentialsFromDB,
  getLinkedInAuthUrl,
  getLinkedInProfile,
  getUserId,
  postToLinkedIn,
  storeCredentialsInDB,
  validateAndRefreshToken,
} from "@/utils/helper";
import crypto from "crypto";
import {
  linkedinCallbackValidator,
  linkedinPostValidator,
} from "@repo/common/validator";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Please provide SUPABASE_URL and SUPABASE_KEY in .env file");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getLinkedinCredentials(
  request: Request,
  response: Response
) {
  try {
    const userId = getUserId();

    if (!userId) {
      response.status(400).json({ error: "User ID is required" });
      return;
    }

    const state = crypto.randomBytes(20).toString("hex");

    // Store state in session or database (using userId as key)
    // In a real application, you would store this in a secure session or temporary database record
    // For simplicity, we'll just include it in the redirect_uri

    // Generate the LinkedIn authorization URL with the state parameter
    const authUrl = getLinkedInAuthUrl(`${state}_${userId}`);

    // Return the authorization URL to the frontend for redirection
    response.status(200).json({ authUrl });
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

export async function handleLinkedinCallback(
  request: Request,
  response: Response
) {
  try {
    const { code, state, error } = linkedinCallbackValidator.parse(
      request.query
    );

    if (error) {
      throw createError(400, `LinkedIn authorization error: ${error}`);
    }

    const stateParts = (state as string).split("_");

    if (stateParts.length !== 2) {
      throw createError(400, "Invalid state parameter");
    }

    const userId = getUserId();

    // Exchange authorization code for access token

    const tokenData = await exchangeCodeForToken(code as string);

    console.log("tokenData: ", tokenData);

    // Get user's LinkedIn profile to get their LinkedIn ID
    const profile = await getLinkedInProfile(tokenData.access_token);

    console.log("profile: ", profile);

    const stored = await storeCredentialsInDB(
      userId,
      tokenData.access_token,
      tokenData.expires_in,
      profile.id
    );

    if (!stored) {
      throw createError(500, "Failed to store LinkedIn credentials");
    }

    response.redirect(process.env.REDIRECT_URL!);
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

export async function getLinkedinStatus(request: Request, response: Response) {
  try {
    const { data, error } = await supabase
      .from("linkedin")
      .select("id, linkedin_id, expires_at")
      .eq("user_id", getUserId())
      .single();

    if (!data || error) {
      console.log(error);
      response.status(200).json({ connected: false });
      return;
    }

    // Check if token is expired
    const isExpired = data.expires_at && new Date(data.expires_at) < new Date();

    response.status(200).json({
      connected: !isExpired,
      linkedinId: data.linkedin_id,
    });
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

export async function postToLinkedin(request: Request, response: Response) {
  try {
    const { text, shareUrl, title, visibility } = linkedinPostValidator.parse(
      request.body
    );

    const userId = getUserId();

    const credentials = await getCredentialsFromDB(userId);

    if (!credentials) {
      throw createError(404, "LinkedIn credentials not found");
    }

    // Validate and refresh token if needed
    const validAccessToken = await validateAndRefreshToken(userId, credentials);
    if (!validAccessToken) {
      throw createError(401, "LinkedIn authentication expired");
    }

    const postId = await postToLinkedIn(
      validAccessToken,
      credentials.linkedin_id,
      {
        text,
        shareUrl,
        title,
        visibility,
      }
    );

    response.status(201).json({
      success: true,
      message: "Content posted to LinkedIn successfully",
      postId,
    });
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
