import { Response } from "express";
import "dotenv/config";
import createError from "http-errors";
import { ZodError } from "zod";
import {
  exchangeCodeForToken,
  getCredentialsFromDB,
  getLinkedInAuthUrl,
  getLinkedInProfile,
  postToLinkedIn,
  storeCredentialsInDB,
  validateAndRefreshToken,
} from "@/utils/helper";
import crypto from "crypto";
import {
  linkedinCallbackValidator,
  linkedinPostValidator,
} from "@repo/common/validator";
import { supabase } from "@/utils/supabaseClient";
import { AuthRequest } from "@/middlewares/authMiddleware";
import { get } from "http";

export async function getLinkedinCredentials(
  request: AuthRequest,
  response: Response
) {
  try {
    const userId = request.userId;
    const state = crypto.randomBytes(20).toString("hex");

    request.session.userId = userId;
    // Store state in session or database (using userId as key)
    // In a real application, you would store this in a secure session or temporary database record
    // For simplicity, we'll just include it in the redirect_uri

    const authUrl = getLinkedInAuthUrl(state);

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
  request: AuthRequest,
  response: Response
) {
  try {
    const { code, error } = linkedinCallbackValidator.parse(request.query);

    if (error) {
      throw createError(400, `LinkedIn authorization error: ${error}`);
    }

    console.log("callback session : ", request.session.userId);
    const userId = request.session.userId;

    const tokenData = await exchangeCodeForToken(code as string);

    // Get user's LinkedIn profile to get their LinkedIn ID
    const profile = await getLinkedInProfile(tokenData.access_token);

    const stored = await storeCredentialsInDB(
      userId!,
      tokenData.access_token,
      tokenData.expires_in,
      profile.id,
      profile.picture
    );

    if (!stored) {
      throw createError(500, "Failed to store LinkedIn credentials");
    }
    request.session.destroy((err) => {
      if (err) {
        console.error("could not destroy session", err);
      }
      response.redirect(process.env.REDIRECT_URL!);
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

export async function getLinkedinStatus(
  request: AuthRequest,
  response: Response
) {
  try {
    const { data, error } = await supabase
      .from("linkedin")
      .select("id, linkedin_id, expires_at")
      .eq("user_id", request.userId)
      .single();

    if (error) {
      console.log(error);
      throw createError(500, "Failed to fetch LinkedIn credentials");
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

export async function postToLinkedin(request: AuthRequest, response: Response) {
  try {
    const { text, shareUrl, title, visibility } = linkedinPostValidator.parse(
      request.body
    );

    const userId = request.userId;

    const credentials = await getCredentialsFromDB(userId);

    if (!credentials) {
      throw createError(404, "LinkedIn credentials not found");
    }

    // Validate and refresh token if needed
    const validAccessToken = await validateAndRefreshToken(credentials);
    if (!validAccessToken) {
      throw createError(401, "LinkedIn authentication expired");
    }
    const postId = await postToLinkedIn(
      validAccessToken,
      credentials.profile_id,
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
