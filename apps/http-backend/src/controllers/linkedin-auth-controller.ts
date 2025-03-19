import { Request, Response } from "express";
import "dotenv/config";
import createError from "http-errors";
import { ZodError } from "zod";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { getUserId } from "@/utils/helper";

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
    const { code, redirectUri } = request.body;

    if (!code || !redirectUri) {
      throw createError(
        400,
        "Authorization code and redirect URI are required"
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Get LinkedIn user profile
    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { sub: linkedinId } = profileResponse.data;

    // Get user from session (assuming user is already authenticated)
    // In a real application, you would get this from your auth system

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

    const { data, error: dbError } = await supabase
      .from("linkedin")
      .insert([
        {
          user_id: getUserId(),
          access_token,
          refresh_token,
          expires_at: expiresAt.toISOString(),
          linkedin_id: linkedinId,
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (dbError) {
      console.log(dbError);
      throw createError(
        500,
        `Failed to insert linkedin credentials : ${dbError}`
      );
    }

    response.status(200).json({ success: true });
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
      throw createError(
        500,
        `Failed to retrieve linkedin credentials : ${error}`
      );
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
