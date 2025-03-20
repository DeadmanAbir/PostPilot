import { Request, Response } from "express";
import "dotenv/config";
import createError from "http-errors";
import { ZodError } from "zod";
import { createClient } from "@supabase/supabase-js";
import axios, { get } from "axios";
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
    // Get user ID from query parameter (in a real app, this would typically come from a session or token)
    const userId = getUserId();

    if (!userId) {
      response.status(400).json({ error: "User ID is required" });
      return;
    }

    // Generate a state parameter to prevent CSRF attacks
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
    const { code, state, error } = request.query;

    if (error) {
      response
        .status(400)
        .json({ error: `LinkedIn authorization error: ${error}` });
      return;
    }

    // Validate state to prevent CSRF attacks
    // Extract user ID from state (in a real app, you'd validate against a stored state)
    const stateParts = (state as string).split("_");
    if (stateParts.length !== 2) {
      response.status(400).json({ error: "Invalid state parameter" });
      return;
    }

    const userId = getUserId();

    // Exchange authorization code for access token
    const tokenData = await exchangeCodeForToken(code as string);

    // Get user's LinkedIn profile to get their LinkedIn ID
    const profile = await getLinkedInProfile(tokenData.access_token);

    // Store credentials in Supabase
    const stored = await storeCredentialsInDB(
      userId,
      tokenData.access_token,
      tokenData.refresh_token,
      tokenData.expires_in,
      profile.id
    );

    if (!stored) {
      response
        .status(500)
        .json({ error: "Failed to store LinkedIn credentials" });
    }

    // Redirect to a successful connection page or close the popup window
    response.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'LINKEDIN_AUTH_SUCCESS' }, '*');
            window.close();
          </script>
          <p>LinkedIn account connected successfully! You can close this window.</p>
        </body>
      </html>
    `);
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

// there will be a middleware for this
export async function postToLinkedin(request: Request, response: Response) {
  try {
    // Get user ID from request body (in a real app, this would typically come from authentication)
    const { text, shareUrl, title, visibility } = request.body;
    const userId = getUserId();
    if (!userId) {
      response.status(400).json({ error: "User ID is required" });
      return;
    }

    if (!text) {
      response.status(400).json({ error: "Post text is required" });
      return;
    }

    // Retrieve LinkedIn credentials from Supabase
    const credentials = await getCredentialsFromDB(userId);

    if (!credentials) {
      response.status(404).json({
        error: "LinkedIn credentials not found",
        needsAuth: true,
      });
      return;
    }

    // Validate and refresh token if needed
    const validAccessToken = await validateAndRefreshToken(userId, credentials);

    if (!validAccessToken) {
      response.status(401).json({
        error: "LinkedIn authentication expired",
        needsAuth: true,
      });
      return;
    }

    // Post to LinkedIn
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
