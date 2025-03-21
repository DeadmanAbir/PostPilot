import { ChatGemini } from "./chatGemini";
import { ChatOpenAI } from "./chatOpenAi";
import { improveQueryPrompt } from "./constant";

import "dotenv/config";
import { supabase } from "./supabaseClient";

interface LinkedInCredentials {
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  linkedin_id: string;
}

interface PostContent {
  text: string;
  shareUrl?: string;
  title?: string;
  visibility: "PUBLIC" | "CONNECTIONS";
}

export function extractTweetId(url: string): string | null {
  const match = url.match(/status\/(\d+)/);
  return match?.[1] ?? null;
}

export const improvePrompt = async (prompt: string): Promise<string> => {
  try {
    const chatOpenAI = createClient("OpenAI");

    const data = await chatOpenAI.chat({
      prompt: prompt,
      systemInstruction: improveQueryPrompt,
      outputFormat: `{"enhanced_prompt": ""}`,
      temperature: 0.6,
    });

    return JSON.stringify(data);
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Error in improving prompt");
  }
};

export const createClient = (llm: "OpenAI" | "Gemini") => {
  if (llm == "OpenAI") {
    const chatOpenAI = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o-mini",
    });

    return chatOpenAI;
  }
  const chatGemini = new ChatGemini({
    apiKey: process.env.GEMINI_API_KEY!,
    model: "gemini-2.0-flash",
  });
  return chatGemini;
};

/**
 * Generate LinkedIn authorization URL
 */
export function getLinkedInAuthUrl(state: string): string {
  // LinkedIn OAuth configuration

  const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string;
  const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;
  const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI as string;

  if (
    !LINKEDIN_CLIENT_ID ||
    !LINKEDIN_CLIENT_SECRET ||
    !LINKEDIN_REDIRECT_URI
  ) {
    throw new Error("Missing LinkedIn environment variables");
  }

  return (
    `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${LINKEDIN_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&` +
    `scope=profile%20email%20w_member_social%20openid&` +
    `state=${encodeURIComponent(state)}`
  );
}

export async function exchangeCodeForToken(code: string): Promise<{
  access_token: string;
  expires_in: number;
}> {
  const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string;
  const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;
  const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI as string;

  if (
    !LINKEDIN_CLIENT_ID ||
    !LINKEDIN_CLIENT_SECRET ||
    !LINKEDIN_REDIRECT_URI
  ) {
    throw new Error("Missing LinkedIn environment variables");
  }

  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: LINKEDIN_REDIRECT_URI,
      client_id: LINKEDIN_CLIENT_ID,
      client_secret: LINKEDIN_CLIENT_SECRET,
    });

    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`);
    }
    const data = await response.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.error("LinkedIn token exchange error:", error);
    throw error;
  }
}

/**
 * Refresh an expired access token
 */
export async function refreshLinkedInToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}> {
  const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string;
  const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;
  const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI as string;

  if (
    !LINKEDIN_CLIENT_ID ||
    !LINKEDIN_CLIENT_SECRET ||
    !LINKEDIN_REDIRECT_URI
  ) {
    throw new Error("Missing LinkedIn environment variables");
  }
  console.log("getting refresh token");
  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: LINKEDIN_CLIENT_ID,
      client_secret: LINKEDIN_CLIENT_SECRET,
    });

    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`);
    }
    const data = await response.json();
    console.log("response: ", data);

    return data;
  } catch (error) {
    console.error("LinkedIn token refresh error:", error);
    throw error;
  }
}

/**
 * Get user profile information from LinkedIn
 */
export async function getLinkedInProfile(
  accessToken: string
): Promise<{ id: string; email: string }> {
  try {
    const response = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.sub,
      email: data.email,
    };
  } catch (error) {
    console.error("LinkedIn profile error:", error);
    throw error;
  }
}

export const getUserId = (): string => {
  return "cc2ae124-4439-4454-831d-5e94b889c192";
};

/**
 * Get LinkedIn credentials for a user from Supabase
 */
export async function getCredentialsFromDB(
  userId: string
): Promise<LinkedInCredentials | null> {
  try {
    const { data, error } = await supabase
      .from("linkedin")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Supabase error fetching LinkedIn credentials:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error getting LinkedIn credentials:", error);
    return null;
  }
}

/**
 * Store LinkedIn credentials in Supabase
 */
export async function storeCredentialsInDB(
  userId: string,
  accessToken: string,
  expiresIn: number,
  linkedinId: string
): Promise<boolean> {
  try {
    // Calculate token expiration date
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    const { error } = await supabase.from("linkedin").upsert({
      user_id: userId,
      access_token: accessToken,
      expires_at: expiresAt.toISOString(),
      linkedin_id: linkedinId,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error storing LinkedIn credentials:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error storing credentials:", error);
    return false;
  }
}

/**
 * Validate access token and refresh if needed
 */
export async function validateAndRefreshToken(
  userId: string,
  credentials: LinkedInCredentials
): Promise<string | null> {
  try {
    if (
      credentials.expires_at &&
      new Date(credentials.expires_at) > new Date()
    ) {
      return credentials.access_token;
    }

    // Token is still valid
    return credentials.access_token;
  } catch (error) {
    console.error("Access Token Expired:", error);
    return null;
  }
}

/**
 * Post content to LinkedIn
 */
export async function postToLinkedIn(
  accessToken: string,
  linkedinId: string,
  content: PostContent
): Promise<string> {
  try {
    const { text, shareUrl, title, visibility = "PUBLIC" } = content;

    // Create post payload
    const postPayload: any = {
      author: `urn:li:person:${linkedinId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: text,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": visibility,
      },
    };

    // Add URL if provided
    if (shareUrl) {
      postPayload.specificContent[
        "com.linkedin.ugc.ShareContent"
      ].shareMediaCategory = "ARTICLE";
      postPayload.specificContent["com.linkedin.ugc.ShareContent"].media = [
        {
          status: "READY",
          originalUrl: shareUrl,
        },
      ];

      // Add title if provided
      if (title) {
        postPayload.specificContent[
          "com.linkedin.ugc.ShareContent"
        ].media[0].title = {
          text: title,
        };
      }
    }

    // Send post request to LinkedIn API
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postPayload),
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`);
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("LinkedIn posting error:", error);
    throw error;
  }
}
