import {
  PostDetail,
  ProfileDetails,
  RegeneratePostContent,
} from "@repo/common/types";

export const getProfileData = async (accessToken: string) => {
  try {
    const response = await fetch("/api/get-profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    throw error;
  }
};

export const connectToLinkedin = async (accessToken: string) => {
  try {
    const response = await fetch(`/api/linkedin/get-credentials`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to connect to Linkedin:", error);
    throw error;
  }
};

export const updateProfile = async (
  accessToken: string,
  details: ProfileDetails
) => {
  try {
    const response = await fetch(`/api/update-user`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export const linkedinPost = async (
  accessToken: string,
  details: PostDetail
) => {
  try {
    const response = await fetch("/api/generate-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(details),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.insertedData[0];
  } catch (error) {
    console.error("Failed to post:", error);
    throw error;
  }
};

export const regeneratePost = async (
  accessToken: string,
  details: RegeneratePostContent
) => {
  try {
    const response = await fetch("/api/generate-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(details),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.insertedData[0];
  } catch (error) {
    console.error("Failed to regenerate post:", error);
    throw error;
  }
};
