import { ChatGemini } from "./chatGemini";
import { ChatOpenAI } from "./chatOpenAi";
import { improveQueryPrompt } from "./constant";
import "dotenv/config";
import { supabase } from "./supabaseClient";

interface LinkedInCredentials {
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  profile_id: string;
}
import { PostContent } from "@repo/common/types";

export const extractTweetId = (url: string): string | null => {
  const match = url.match(/status\/(\d+)/);
  return match?.[1] ?? null;
};

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
    model: "gemini-2.5-pro-exp-03-25",
  });
  return chatGemini;
};

export const getLinkedInAuthUrl = (state: string): string => {
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
};

export const exchangeCodeForToken = async (
  code: string
): Promise<{
  access_token: string;
  expires_in: number;
}> => {
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
};

export const getLinkedInProfile = async (
  accessToken: string
): Promise<{ id: string; email: string; picture?: string }> => {
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
    console.log(" profile data: ", data);
    return {
      id: data.sub,
      email: data.email,
      picture: data.picture,
    };
  } catch (error) {
    console.error("LinkedIn profile error:", error);
    throw error;
  }
};

export const getUserId = (): string => {
  return "bd3ab8a6-a4d0-4b15-8242-32b9902f3673";
};

export const getCredentialsFromDB = async (
  userId: string
): Promise<LinkedInCredentials | null> => {
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
};

export const storeCredentialsInDB = async (
  userId: string,
  accessToken: string,
  expiresIn: number,
  linkedinId: string,
  picture?: string
): Promise<boolean> => {
  try {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    const { error } = await supabase.from("linkedin").upsert(
      [
        {
          user_id: userId,
          access_token: accessToken,
          expires_at: expiresAt.toISOString(),
          profile_id: linkedinId,
          profile_pic: picture,
          updated_at: new Date().toISOString(),
        },
      ],
      { onConflict: "user_id" }
    );

    if (error) {
      console.error("Error storing LinkedIn credentials:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error storing credentials:", error);
    return false;
  }
};

export const validateAndRefreshToken = async (
  credentials: LinkedInCredentials
): Promise<string | null> => {
  try {
    if (
      credentials.expires_at &&
      new Date(credentials.expires_at) < new Date()
    ) {
      return credentials.access_token;
    }

    // Token is still valid
    return credentials.access_token;
  } catch (error) {
    console.error("Access Token Expired:", error);
    return null;
  }
};

export const postToLinkedIn = async (
  accessToken: string,
  profileId: string,
  content: PostContent,
  mediaAttachments: { status: string; media: string }[],
  mediaCategory: "NONE" | "IMAGE" | "VIDEO"
): Promise<string> => {
  try {
    const { text, shareUrl, title, visibility } = content;
    // Create post payload
    const postPayload: any = {
      author: `urn:li:person:${profileId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: text,
          },
          shareMediaCategory: mediaCategory,
          media: mediaAttachments,
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
};

export const processMedia = async (
  accessToken: string,
  profileId: string,
  mediaUrl: string,
  mediaType: string
) => {
  const registerResponse = await fetch(
    "https://api.linkedin.com/v2/assets?action=registerUpload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        registerUploadRequest: {
          recipes: [`urn:li:digitalmediaRecipe:feedshare-${mediaType}`],
          owner: `urn:li:person:${profileId}`,
          serviceRelationships: [
            {
              relationshipType: "OWNER",
              identifier: "urn:li:userGeneratedContent",
            },
          ],
        },
      }),
    }
  );

  const registerData = await registerResponse.json();
  const uploadUrl =
    registerData.value.uploadMechanism[
      "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
    ].uploadUrl;
  const asset = registerData.value.asset;

  // Get media content
  const mediaResponse = await fetch(mediaUrl);
  const mediaBuffer = await mediaResponse.arrayBuffer();

  // Upload media to LinkedIn's provided URL
  await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: new Uint8Array(mediaBuffer),
  });

  return {
    status: "READY",
    media: asset,
  };
};
