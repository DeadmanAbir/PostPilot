import {
  AddNodeContent,
  LocalFileUploadDetail,
  PostContent,
  PostDetail,
  ProfileDetails,
  RegeneratePostContent,
  RemoteFileUploadDetail,
  TweetContent,
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
    const response = await fetch("/api/regenerate-post", {
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
    return data.updatedData[0];
  } catch (error) {
    console.error("Failed to regenerate post:", error);
    throw error;
  }
};

export const improvePost = async (accessToken: string, query: string) => {
  try {
    const response = await fetch("/api/improve-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.updatedData[0];
  } catch (error) {
    console.error("Failed to improve post:", error);
    throw error;
  }
};

export const fetchTweet = async (
  accessToken: string,
  content: TweetContent
) => {
  try {
    const response = await fetch("/api/fetch-tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch tweet data:", error);
    throw error;
  }
};

export const addTextNode = async (
  accessToken: string,
  details: AddNodeContent
) => {
  try {
    const response = await fetch("/api/add-text-node", {
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
    return data;
  } catch (error) {
    console.error("Failed to add node content:", error);
    throw error;
  }
};

export const fetchWebsite = async (accessToken: string, url: string) => {
  try {
    const response = await fetch("/api/fetch-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch url:", error);
    throw error;
  }
};

export const addRemoteImage = async (
  accessToken: string,
  images: RemoteFileUploadDetail
) => {
  try {
    const response = await fetch("/api/add-remote-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(images),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch remote images:", error);
    throw error;
  }
};

export const addRemoteFile = async (
  accessToken: string,
  files: RemoteFileUploadDetail
) => {
  try {
    const response = await fetch("/api/add-remote-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(files),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch remote files:", error);
    throw error;
  }
};

export const addLocalImage = async (
  accessToken: string,
  images: LocalFileUploadDetail
) => {
  try {
    const response = await fetch("/api/add-local-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(images),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add local image:", error);
    throw error;
  }
};

export const addLocalFile = async (
  accessToken: string,
  files: LocalFileUploadDetail
) => {
  try {
    const response = await fetch("/api/add-local-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(files),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add local file:", error);
    throw error;
  }
};

export const fetchUserSources = async (accessToken: string) => {
  try {
    const response = await fetch("/api/get-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.users[0];
  } catch (error) {
    console.error("Failed to get user sources:", error);
    throw error;
  }
};

export const postToLinkedin = async (
  accessToken: string,
  content: PostContent
) => {
  try {
    const response = await fetch("/api/linkedin/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to post:", error);
    throw error;
  }
};

export const getLinkedinData = async (accessToken: string) => {
  try {
    const response = await fetch("/api/get-linekdin-credentials", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.users[0];
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    throw error;
  }
};

export const deleteLinkedinAccount = async (accessToken: string) => {
  try {
    const response = await fetch(`/api/delete-account`, {
      method: "DELETE",
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
    console.error("Failed to delete linkedin account:", error);
    throw error;
  }
};

export const getPostData = async (accessToken: string) => {
  try {
    const response = await fetch("/api/get-posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error("Failed to fetch post data:", error);
    throw error;
  }
};
