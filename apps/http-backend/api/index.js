"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_express5 = __toESM(require("express"));

// src/routes/context-processing-route.ts
var import_express = __toESM(require("express"));

// src/controllers/file-controllers.ts
var import_firecrawl_js = __toESM(require("@mendable/firecrawl-js"));
var import_config3 = require("dotenv/config");
var import_http_errors = __toESM(require("http-errors"));
var import_apify_client = require("apify-client");
var import_zod2 = require("zod");

// ../../packages/common/src/validator.ts
var import_zod = require("zod");
var demoValidator = import_zod.z.object({
  name: import_zod.z.string()
});
var youtubeValidator = import_zod.z.object({
  url: import_zod.z.string().url()
});
var twitterValidator = import_zod.z.object({
  tweetUrl: import_zod.z.string().url(),
  title: import_zod.z.string()
});
var websiteUrlValidator = import_zod.z.object({
  url: import_zod.z.string().url()
});
var postGenerateValidator = import_zod.z.object({
  query: import_zod.z.string(),
  media: import_zod.z.object({
    files: import_zod.z.array(import_zod.z.string()).optional(),
    images: import_zod.z.array(import_zod.z.string()).optional(),
    text_node: import_zod.z.array(import_zod.z.string()).optional(),
    tweets: import_zod.z.array(import_zod.z.string()).optional(),
    youtube: import_zod.z.array(import_zod.z.string()).optional(),
    websites: import_zod.z.array(import_zod.z.string()).optional()
  })
});
var postRegenerateValidator = import_zod.z.object({
  query: import_zod.z.string().optional(),
  previousPost: import_zod.z.string(),
  media: import_zod.z.object({
    files: import_zod.z.array(import_zod.z.string()).optional(),
    images: import_zod.z.array(import_zod.z.string()).optional(),
    text_node: import_zod.z.array(import_zod.z.string()).optional(),
    tweets: import_zod.z.array(import_zod.z.string()).optional(),
    youtube: import_zod.z.array(import_zod.z.string()).optional(),
    websites: import_zod.z.array(import_zod.z.string()).optional()
  })
});
var improvePostValidator = import_zod.z.object({
  query: import_zod.z.string()
});
var profileIdValidator = import_zod.z.object({
  id: import_zod.z.string()
});
var localFileUploadDetailsValidator = import_zod.z.array(
  import_zod.z.object({
    name: import_zod.z.string(),
    url: import_zod.z.string(),
    storage_name: import_zod.z.string()
  })
);
var remoteFileUploadDetailsValidator = import_zod.z.array(
  import_zod.z.object({
    fileName: import_zod.z.string().optional(),
    url: import_zod.z.string().url()
  })
);
var textNodeDataValidaor = import_zod.z.object({
  name: import_zod.z.string(),
  description: import_zod.z.string()
});
var linkedinCallbackValidator = import_zod.z.object({
  code: import_zod.z.string(),
  error: import_zod.z.string().optional()
});
var linkedinPostValidator = import_zod.z.object({
  text: import_zod.z.string(),
  shareUrl: import_zod.z.string().optional(),
  title: import_zod.z.string().optional(),
  visibility: import_zod.z.enum(["PUBLIC", "CONNECTIONS"]),
  images: import_zod.z.array(import_zod.z.string()).optional(),
  video: import_zod.z.string().optional()
});
var profileUpdateValidator = import_zod.z.object({
  name: import_zod.z.string().optional(),
  profile_url: import_zod.z.string().optional()
});

// src/utils/chatGemini.ts
var import_generative_ai = require("@google/generative-ai");
var import_server = require("@google/generative-ai/server");
var ChatGemini = class {
  client;
  fileManager;
  model;
  constructor(props) {
    const { apiKey, model } = props;
    if (!apiKey || apiKey.length === 0) {
      throw new Error("No API key provided for Gemini AI.");
    }
    this.client = new import_generative_ai.GoogleGenerativeAI(apiKey);
    this.fileManager = new import_server.GoogleAIFileManager(apiKey);
    this.model = model;
  }
  async chat(props) {
    const {
      prompt,
      stream = false,
      options,
      systemInstruction,
      context,
      outputFormat,
      file
    } = props;
    const client = this.createClient(this.model, systemInstruction, options);
    const content = this.createContext(prompt, context, outputFormat);
    const fileParts = file && file.length > 0 ? await this.fileUpload(file) : [];
    if (stream) {
      return await client.generateContentStream([content, ...fileParts]);
    }
    const result = await client.generateContent([content, ...fileParts]);
    const response = await result.response;
    const text = await response.text();
    return {
      content: text.replace("```json\n", "").replace("\n```", "") ?? "",
      promptTokenCount: response?.usageMetadata?.promptTokenCount ?? null,
      candidatesTokenCount: response?.usageMetadata?.candidatesTokenCount ?? null
    };
  }
  async chatWithHistory(props) {
    const {
      prompt,
      stream = false,
      options,
      systemInstruction,
      context,
      outputFormat,
      chatHistory,
      maxOutputTokens
    } = props;
    const client = this.createClient(this.model, systemInstruction, options);
    const content = this.createContext(prompt, context, outputFormat);
    const history = this.createChatHistory(chatHistory);
    const chat = client.startChat({
      history,
      generationConfig: {
        maxOutputTokens
      }
    });
    if (!stream) {
      const result2 = await chat.sendMessage(content);
      const response = await result2.response;
      const text = await response.text();
      return {
        content: text.replace("```json\n", "").replace("\n```", "") ?? "",
        promptTokenCount: response?.usageMetadata?.promptTokenCount ?? null,
        candidatesTokenCount: response?.usageMetadata?.candidatesTokenCount ?? null
      };
    }
    const result = await chat.sendMessageStream(content);
    return result;
  }
  async countChatHistoryTokens(props) {
    const { options, chatHistory } = props;
    const client = this.createClient(this.model, void 0, options);
    const history = this.createChatHistory(chatHistory);
    const chat = client.startChat({
      history
    });
    const countResult = await client.countTokens({
      generateContentRequest: { contents: await chat.getHistory() }
    });
    return countResult;
  }
  async countTokens(props) {
    const { prompt, context, outputFormat, file, options } = props;
    const client = this.createClient(this.model, void 0, options);
    const content = this.createContext(prompt, context, outputFormat);
    const fileParts = file ? await this.fileUpload(file) : [];
    const result = await client.countTokens([content, ...fileParts]);
    return result;
  }
  createChatHistory(chatHistory) {
    return chatHistory.flatMap((entry) => [
      { role: "user", parts: [{ text: entry.user }] },
      { role: "model", parts: [{ text: entry.model }] }
    ]);
  }
  createClient(model, systemInstruction, options) {
    return this.client.getGenerativeModel({
      model,
      systemInstruction,
      ...options
    });
  }
  createContext(prompt, context, outputFormat) {
    let content = prompt;
    if (context) {
      content += `
context:
${context}`;
    }
    if (outputFormat) {
      content += `
output format:
${outputFormat}`;
    }
    return content;
  }
  async fileUpload(file) {
    const fileUploads = file.some((f) => "path" in f) ? await Promise.all(
      file.map(
        (img) => this.handleFileUpload(img.path, img.mimetype)
      )
    ) : [];
    const localFileParts = await Promise.all(
      fileUploads.map(async (upload) => ({
        fileData: {
          fileUri: upload.file.uri,
          mimeType: upload.file.mimeType
        }
      }))
    );
    const onlineFileParts = file.some((f) => "link" in f) ? await Promise.all(
      file.map(async (img) => {
        const response = await fetch(img.link);
        const buffer = await response.arrayBuffer();
        return {
          inlineData: {
            data: Buffer.from(buffer).toString("base64"),
            mimeType: img.mimetype
          }
        };
      })
    ) : [];
    const fileParts = [...localFileParts, ...onlineFileParts];
    return fileParts;
  }
  async handleFileUpload(path, mimeType) {
    const uploadResult = await this.fileManager.uploadFile(path, {
      mimeType
    });
    let file = await this.fileManager.getFile(uploadResult.file.name);
    while (file.state === import_server.FileState.PROCESSING) {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 5e3));
      file = await this.fileManager.getFile(uploadResult.file.name);
    }
    if (file.state === import_server.FileState.FAILED) {
      throw new Error("Media processing failed.");
    }
    return uploadResult;
  }
};

// src/utils/chatOpenAi.ts
var import_openai = __toESM(require("openai"));
var import_fs = __toESM(require("fs"));
var ChatOpenAI = class {
  client;
  model;
  constructor(props) {
    const { apiKey, model } = props;
    if (!apiKey || apiKey.length === 0) {
      throw new Error("No API key provided for OpenAI.");
    }
    this.client = new import_openai.default({ apiKey });
    this.model = model;
  }
  async chat(props) {
    const {
      prompt,
      context,
      outputFormat,
      options,
      chatHistory,
      temperature,
      systemInstruction,
      image
    } = props;
    let userMessages = [];
    if (systemInstruction) {
      userMessages.push({ role: "system", content: systemInstruction });
    }
    if (chatHistory && chatHistory.length > 0) {
      chatHistory.forEach((chat) => {
        userMessages.push({ role: "user", content: chat.user });
        userMessages.push({ role: "assistant", content: chat.assistant });
      });
    }
    const content = this.createContext(prompt, context, outputFormat, image);
    userMessages.push({
      role: "user",
      content: image && image.length > 0 ? JSON.parse(content) : content
    });
    const chatCompletion = await this.client.chat.completions.create({
      messages: userMessages,
      model: this.model,
      temperature: temperature ?? 0.5,
      ...options
    });
    if (!options?.stream) {
      return {
        // @ts-ignore
        prompt_tokens: chatCompletion.usage?.prompt_tokens ?? 0,
        // @ts-ignore
        completion_tokens: chatCompletion.usage?.completion_tokens ?? 0,
        output: (
          // @ts-ignore
          chatCompletion.choices[0].message?.content.replace("```json\n", "").replace("\n```", "") ?? ""
        )
      };
    }
    return chatCompletion;
  }
  async detectThreat(props) {
    const { input, options } = props;
    const moderation = await this.client.moderations.create({
      input,
      model: this.model,
      ...options
    });
    return moderation;
  }
  createContext(prompt, context, outputFormat, file) {
    let content = prompt;
    if (context) {
      content += `
context:
${context}`;
    }
    if (outputFormat) {
      content += `
output format:
${outputFormat}`;
    }
    if (file && file.length > 0) {
      let finalContent = [
        { type: "text", text: content },
        ...file.map((f) => ({
          type: "image_url",
          image_url: {
            url: f.type === "local" ? this.encodeImage(f.path) : f.path
          }
        }))
      ];
      return JSON.stringify(finalContent);
    }
    return content;
  }
  encodeImage = (imagePath) => {
    const imageBuffer = import_fs.default.readFileSync(imagePath);
    return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
  };
};

// src/utils/constant.ts
var improveQueryPrompt = `Your task is to refine and improve the given user query to make it more structured, detailed, and optimized for generating a high-quality LinkedIn post. Do NOT generate the post itself\u2014only enhance the query to be more effective for an LLM to create a well-crafted LinkedIn post. Ensure clarity, proper context, target audience considerations, and a professional yet engaging tone.`;
var generatePostPrompt = `Generate a LinkedIn post written in a natural, engaging, and human tone. Use simple vocabulary and a third-person perspective\u2014avoid AI-generated style or pretext. The post should feel organic, as if written by a professional storyteller or industry expert.

If additional context is provided (such as a YouTube transcript, Twitter text, or an image description), incorporate relevant insights to make the post richer and more compelling. Focus on clarity, storytelling, and engagement while keeping it concise and impactful. Avoid jargon-heavy language and keep it approachable for a broad audience.`;
var regeneratePostPrompt = `
Revise the given LinkedIn post while maintaining a natural, engaging, and human tone. Use simple vocabulary and a third-person perspective\u2014avoid AI-generated style or pretext. Ensure the post feels authentic, as if written by a professional storyteller or industry expert.

Use the previous post and any additional context provided to improve clarity, storytelling, and engagement. If specific feedback is given, incorporate those changes. If no feedback is provided, refine the post for better readability, impact, and flow while keeping the core message intact.
`;
var improvePostPrompt = `You are a professional content enhancer specialized in improving LinkedIn posts. The user will provide a rough or unpolished draft. Your task is to refine it for LinkedIn by:

- Fixing any grammatical, spelling, or punctuation errors.
- Improving sentence structure and flow.
- Enhancing vocabulary with clear, engaging, and professional wording (but avoid jargon).
- Making the content concise and reader-friendly.
- Converting to pointwise/bullet format if it improves readability (especially for tips, takeaways, or summaries).

Important:
- Do not change the core message, topic, or personal tone of the content.
- Do not add any extra information or examples unless explicitly instructed.
- Maintain a tone suitable for LinkedIn\u2014professional, approachable, and thoughtful.

`;

// src/utils/helper.ts
var import_config2 = require("dotenv/config");

// src/utils/supabaseClient.ts
var import_supabase_js = require("@supabase/supabase-js");
var import_config = require("dotenv/config");
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Please provide SUPABASE_URL and SUPABASE_KEY in .env file");
}
var supabase = (0, import_supabase_js.createClient)(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// src/utils/helper.ts
var extractTweetId = (url) => {
  const match = url.match(/status\/(\d+)/);
  return match?.[1] ?? null;
};
var improvePrompt = async (prompt) => {
  try {
    const chatOpenAI = createClient2("OpenAI");
    const data = await chatOpenAI.chat({
      prompt,
      systemInstruction: improveQueryPrompt,
      outputFormat: `{"enhanced_prompt": ""}`,
      temperature: 0.6
    });
    return JSON.stringify(data);
  } catch (e) {
    console.log(e);
    throw new Error("Error in improving prompt");
  }
};
var createClient2 = (llm) => {
  if (llm == "OpenAI") {
    const chatOpenAI = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o-mini"
    });
    return chatOpenAI;
  }
  const chatGemini = new ChatGemini({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.0-flash"
  });
  return chatGemini;
};
var getLinkedInAuthUrl = (state) => {
  const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
  const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
  const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI;
  if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET || !LINKEDIN_REDIRECT_URI) {
    throw new Error("Missing LinkedIn environment variables");
  }
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&scope=profile%20email%20w_member_social%20openid&state=${encodeURIComponent(state)}`;
};
var exchangeCodeForToken = async (code) => {
  const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
  const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
  const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI;
  if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET || !LINKEDIN_REDIRECT_URI) {
    throw new Error("Missing LinkedIn environment variables");
  }
  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: LINKEDIN_REDIRECT_URI,
      client_id: LINKEDIN_CLIENT_ID,
      client_secret: LINKEDIN_CLIENT_SECRET
    });
    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
      }
    );
    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("LinkedIn token exchange error:", error);
    throw error;
  }
};
var getLinkedInProfile = async (accessToken) => {
  try {
    const response = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`);
    }
    const data = await response.json();
    return {
      id: data.sub,
      email: data.email,
      picture: data.picture
    };
  } catch (error) {
    console.error("LinkedIn profile error:", error);
    throw error;
  }
};
var getUserId = () => {
  return "bd3ab8a6-a4d0-4b15-8242-32b9902f3673";
};
var getCredentialsFromDB = async (userId) => {
  try {
    const { data, error } = await supabase.from("linkedin").select("*").eq("user_id", userId).single();
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
var storeCredentialsInDB = async (userId, accessToken, expiresIn, linkedinId, picture) => {
  try {
    const expiresAt = /* @__PURE__ */ new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
    const { error } = await supabase.from("linkedin").upsert(
      [
        {
          user_id: userId,
          access_token: accessToken,
          expires_at: expiresAt.toISOString(),
          profile_id: linkedinId,
          profile_pic: picture,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }
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
var validateAndRefreshToken = async (credentials) => {
  try {
    if (credentials.expires_at && new Date(credentials.expires_at) < /* @__PURE__ */ new Date()) {
      return credentials.access_token;
    }
    return credentials.access_token;
  } catch (error) {
    console.error("Access Token Expired:", error);
    return null;
  }
};
var postToLinkedIn = async (accessToken, profileId, content, mediaAttachments, mediaCategory) => {
  try {
    const { text, shareUrl, title, visibility } = content;
    const postPayload = {
      author: `urn:li:person:${profileId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text
          },
          shareMediaCategory: mediaCategory,
          media: mediaAttachments
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": visibility
      }
    };
    if (shareUrl) {
      postPayload.specificContent["com.linkedin.ugc.ShareContent"].shareMediaCategory = "ARTICLE";
      postPayload.specificContent["com.linkedin.ugc.ShareContent"].media = [
        {
          status: "READY",
          originalUrl: shareUrl
        }
      ];
      if (title) {
        postPayload.specificContent["com.linkedin.ugc.ShareContent"].media[0].title = {
          text: title
        };
      }
    }
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postPayload)
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
var processMedia = async (accessToken, profileId, mediaUrl, mediaType) => {
  const registerResponse = await fetch(
    "https://api.linkedin.com/v2/assets?action=registerUpload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
      },
      body: JSON.stringify({
        registerUploadRequest: {
          recipes: [`urn:li:digitalmediaRecipe:feedshare-${mediaType}`],
          owner: `urn:li:person:${profileId}`,
          serviceRelationships: [
            {
              relationshipType: "OWNER",
              identifier: "urn:li:userGeneratedContent"
            }
          ]
        }
      })
    }
  );
  const registerData = await registerResponse.json();
  const uploadUrl = registerData.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
  const asset = registerData.value.asset;
  const mediaResponse = await fetch(mediaUrl);
  const mediaBuffer = await mediaResponse.arrayBuffer();
  await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: new Uint8Array(mediaBuffer)
  });
  return {
    status: "READY",
    media: asset
  };
};
var fetchMediaData = async (media) => {
  const results = [];
  for (const [key, ids] of Object.entries(media)) {
    if (Array.isArray(ids) && (key === "files" || key === "images" || key === "websites")) {
      const { data, error } = await supabase.from(key).select(key === "websites" ? "screenshot" : "url").in("id", ids);
      if (error) {
        console.error(`Error fetching data from ${key}:`, error);
        continue;
      }
      data?.forEach((item) => {
        results.push({
          link: item.url || item.screenshot || "",
          mimetype: key === "files" ? "application/pdf" : "image/jpeg"
        });
      });
    }
  }
  return results;
};
var fetchTextualData = async (data) => {
  let result = "";
  let sourceCount = 1;
  for (const [key, ids] of Object.entries(data)) {
    if (Array.isArray(ids) && (key === "tweets" || key === "text_node")) {
      const { data: fetchedData, error } = await supabase.from(key).select(key === "tweets" ? "tweet" : "description").in("id", ids);
      if (error) {
        console.error(`Error fetching data from ${key}:`, error);
        continue;
      }
      fetchedData?.forEach((item) => {
        const content = key === "tweets" ? item.tweet : item.description;
        if (content) {
          result += `source ${sourceCount}: "${content}"

`;
          sourceCount++;
        }
      });
    }
  }
  return result.trim();
};

// src/controllers/file-controllers.ts
async function fetchYoutubeVideoDetails(request, response) {
  try {
    const body = youtubeValidator.parse(request.body);
    const input = {
      outputFormat: "textWithTimestamps",
      urls: [body.url],
      maxRetries: 6,
      proxyOptions: {
        useApifyProxy: true,
        apifyProxyGroups: ["BUYPROXIES94952"]
      }
    };
    const client = new import_apify_client.ApifyClient({
      token: process.env.APIFY_TOKEN
    });
    const run = await client.actor("1s7eXiaukVuOr4Ueg").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    const videoData = {
      url: body.url,
      video: items[0]?.captions
    };
    const { data, error } = await supabase.from("files").insert([
      {
        user_id: getUserId(),
        tweet: JSON.stringify(videoData)
      }
    ]);
    if (error) {
      console.log(error);
      throw (0, import_http_errors.default)(
        500,
        `Failed to insert youtube video transcripts : ${error}`
      );
    }
    response.status(200).json(videoData);
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod2.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
var fetchTweets = async (request, response) => {
  try {
    const { tweetUrl, title } = twitterValidator.parse(request.body);
    const tweetId = extractTweetId(tweetUrl);
    if (!tweetId) {
      throw (0, import_http_errors.default)(500, `No Tweet ID found for : ${tweetUrl}`);
    }
    const input = {
      tweetIDs: [tweetId],
      maxItems: 1
    };
    const client = new import_apify_client.ApifyClient({
      token: process.env.APIFY_TOKEN
    });
    const run = await client.actor("CJdippxWmn9uRfooo").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    const tweetData = {
      url: tweetUrl,
      tweet: items[0]?.text
    };
    const userId = request.userId;
    const { error } = await supabase.from("tweets").insert([
      { user_id: userId, url: tweetData.url, tweet: tweetData.tweet, title }
    ]).select();
    if (error) {
      console.log(error);
      throw (0, import_http_errors.default)(500, `Failed to insert tweet data: ${error}`);
    }
    response.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod2.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      console.log(e);
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
async function fetchWebsiteUrl(request, response) {
  try {
    const { url } = websiteUrlValidator.parse(request.body);
    const app2 = new import_firecrawl_js.default({ apiKey: process.env.FIRECRAWL_API_KEY });
    const scrapeResponse = await app2.scrapeUrl(url, {
      formats: ["screenshot"]
    });
    if (!scrapeResponse.success) {
      throw (0, import_http_errors.default)(500, `Failed to scrape: ${scrapeResponse.error}`);
    }
    const websiteData = {
      url,
      screenshot: scrapeResponse.screenshot,
      title: scrapeResponse.metadata?.title
    };
    const { error } = await supabase.from("websites").insert([
      {
        user_id: request.userId,
        url,
        screenshot: websiteData.screenshot,
        title: websiteData.title
      }
    ]).select();
    if (error) {
      console.log(error);
      throw (0, import_http_errors.default)(500, `Failed to insert website data`);
    }
    response.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod2.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function saveLocalFileData(request, response) {
  try {
    const paths = localFileUploadDetailsValidator.parse(request.body);
    const data = paths.map((path) => {
      return {
        user_id: request.userId,
        url: path.url,
        name: path.name,
        storage_name: path.storage_name
      };
    });
    const { data: fileData, error } = await supabase.from("files").insert(data);
    if (error) {
      console.log(error);
      throw (0, import_http_errors.default)(500, `Failed to insert file data: ${error.message}`);
    }
    response.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod2.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function saveRemoteFileData(request, response) {
  try {
    const data = remoteFileUploadDetailsValidator.parse(request.body);
    const imageData = data.map((file) => {
      return {
        user_id: request.userId,
        url: file.url,
        name: file.fileName
      };
    });
    const { error } = await supabase.from("files").insert(imageData).select();
    if (error) {
      console.log(error);
      throw (0, import_http_errors.default)(500, `Failed to insert file data: ${error.message}`);
    }
    response.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod2.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function saveTextNodeData(request, response) {
  try {
    const { name, description } = textNodeDataValidaor.parse(request.body);
    const userId = request.userId;
    const { error } = await supabase.from("text_node").insert([{ user_id: userId, name, description }]).select();
    if (error) {
      console.log(error);
      throw (0, import_http_errors.default)(
        500,
        `Failed to insert text node  data: ${error.message}`
      );
    }
    response.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod2.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function saveLocalImageData(request, response) {
  try {
    const paths = localFileUploadDetailsValidator.parse(request.body);
    const data = paths.map((path) => {
      return {
        user_id: request.userId,
        url: path.url,
        name: path.name,
        storage_name: path.storage_name
      };
    });
    const { error } = await supabase.from("images").insert(data);
    if (error) {
      console.log(error);
      throw (0, import_http_errors.default)(500, `Failed to insert image : ${error.message}`);
    }
    response.status(200).json({ sucess: true });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod2.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function saveRemoteImageData(request, response) {
  try {
    const data = remoteFileUploadDetailsValidator.parse(request.body);
    const imageData = data.map((file) => {
      return {
        user_id: request.userId,
        url: file.url,
        name: file.fileName
      };
    });
    const { error } = await supabase.from("images").insert(imageData);
    if (error) {
      console.log(error);
      throw (0, import_http_errors.default)(
        500,
        `Failed to insert remote image data: ${error.message}`
      );
    }
    response.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod2.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
function getUsersAdmin(request, response) {
  console.log(request.userId, request.email, request.displayName);
  response.status(200).json("Sorry, cant find that");
}

// src/routes/context-processing-route.ts
var router = import_express.default.Router();
router.post("/youtube-video", fetchYoutubeVideoDetails);
router.post("/fetch-tweet", fetchTweets);
router.post("/fetch-url", fetchWebsiteUrl);
router.post("/add-local-file", saveLocalFileData);
router.post("/add-local-image", saveLocalImageData);
router.post("/add-remote-file", saveRemoteFileData);
router.post("/add-remote-image", saveRemoteImageData);
router.post("/add-text-node", saveTextNodeData);
router.get("/files", getUsersAdmin);
var context_processing_route_default = router;

// src/controllers/content-generator.ts
var import_zod3 = require("zod");
var import_config4 = require("dotenv/config");
var generatePost = async (request, response) => {
  try {
    const { query, media } = postGenerateValidator.parse(request.body);
    const mockdata = await fetchMediaData({
      files: media.files,
      images: media.images,
      websites: media.websites
    });
    const textData = await fetchTextualData({
      text_node: media.text_node,
      tweets: media.tweets
    });
    const enhancedPrompt = await improvePrompt(query);
    const promptData = JSON.parse(enhancedPrompt);
    const parsedPromptData = JSON.parse(promptData.output);
    const prompt = parsedPromptData.enhanced_prompt.concat(
      "\n",
      "Note : If any context is available (in any form), **use it heavily** on your response."
    );
    console.log(textData, "textData");
    const chatGemini = createClient2("Gemini");
    const data = await chatGemini.chat({
      prompt,
      systemInstruction: generatePostPrompt,
      outputFormat: "{`post_content`: ``}",
      file: mockdata,
      context: textData
    });
    const postData = JSON.parse(data.content);
    const insertedData = [
      {
        post_content: postData.post_content
      }
    ];
    response.status(200).json({ insertedData });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod3.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
var regeneratePost = async (request, response) => {
  try {
    const { query, previousPost, media } = postRegenerateValidator.parse(
      request.body
    );
    const mockdata = await fetchMediaData({
      files: media.files,
      images: media.images,
      websites: media.websites
    });
    const textData = await fetchTextualData({
      text_node: media.text_node,
      tweets: media.tweets
    });
    const chatGemini = createClient2("Gemini");
    const data = await chatGemini.chat({
      prompt: query || "Revamp the post",
      systemInstruction: regeneratePostPrompt,
      context: previousPost.concat("\n", textData),
      outputFormat: "{`post_content`: ``}",
      file: mockdata
    });
    const postContent = JSON.parse(data.content);
    const updatedData = [{ post_content: postContent.post_content }];
    response.status(200).json({ updatedData });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod3.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
var improvePost = async (request, response) => {
  try {
    const { query } = improvePostValidator.parse(request.body);
    console.log(query, "query");
    const chatOpenai = createClient2("OpenAI");
    const data = await chatOpenai.chat({
      prompt: "Here's a LinkedIn post I want to publish. Please enhance it according to your instructions.",
      systemInstruction: improvePostPrompt,
      context: query,
      outputFormat: '{"post_content": ""}'
    });
    const postContent = JSON.parse(data.output);
    const updatedData = [{ post_content: postContent.post_content }];
    response.status(200).json({ updatedData });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod3.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// src/routes/post-generation.route.ts
var import_express2 = __toESM(require("express"));
var router2 = import_express2.default.Router();
router2.post("/generate-post", generatePost);
router2.post("/regenerate-post", regeneratePost);
router2.post("/improve-post", improvePost);
var post_generation_route_default = router2;

// src/controllers/user-controllers.ts
var import_config5 = require("dotenv/config");
var import_http_errors2 = __toESM(require("http-errors"));
var import_zod4 = require("zod");
async function getProfileData(request, response) {
  try {
    const { data: users, error } = await supabase.from("users").select(
      "name , email, profile_url, linkedin(expires_at, profile_pic), post(post_content, created_at, media)"
    ).eq("id", request.userId);
    if (error) {
      console.log(error);
      throw (0, import_http_errors2.default)(500, `Failed to fetch user data: ${error}`);
    }
    response.status(200).json({ users });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod4.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function addNewUserData(request, response) {
  try {
    const { data, error } = await supabase.from("users").insert([
      {
        id: request.userId,
        name: request.displayName,
        email: request.email
      }
    ]).select();
    if (error) {
      console.log(error);
      throw (0, import_http_errors2.default)(500, `Failed to insert user data: ${error.message}`);
    }
    response.status(200).json({ data });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod4.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function updateUserData(request, response) {
  try {
    const { name, profile_url } = profileUpdateValidator.parse(request.body);
    const updateFields = {};
    if (name) updateFields.name = name;
    if (profile_url) updateFields.profile_url = profile_url;
    if (Object.keys(updateFields).length === 0) {
      response.status(400).json({ error: "No fields to update" });
      return;
    }
    const { error } = await supabase.from("users").update(updateFields).eq("id", request.userId);
    if (error) {
      console.error(error);
      throw (0, import_http_errors2.default)(500, `Failed to update user data: ${error.message}`);
    }
    response.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    if (e instanceof import_zod4.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function getUser(request, response) {
  try {
    const { data: users, error } = await supabase.from("users").select(
      `
          *,
          youtube(*),
          images(*),
          tweets(*),
          websites(*),
          text_node(*),
          files(*),
          linkedin(expires_at)
         
      `
    ).eq("id", request.userId);
    if (error) {
      console.log(error);
      throw (0, import_http_errors2.default)(500, `Failed to get user data: ${error.message}`);
    }
    response.status(200).json({ users });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod4.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function getLinkedinData(request, response) {
  try {
    const { data: users, error } = await supabase.from("users").select("linkedin(expires_at, profile_pic)").eq("id", request.userId);
    if (error) {
      console.log(error);
      throw (0, import_http_errors2.default)(500, `Failed to fetch user linkedin data: ${error}`);
    }
    response.status(200).json({ users });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod4.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function deleteLinkedinAccount(request, response) {
  try {
    const { error } = await supabase.from("linkedin").delete().eq("user_id", request.userId);
    if (error) {
      console.error(error);
      throw (0, import_http_errors2.default)(
        500,
        `Failed to delete linkedin account: ${error.message}`
      );
    }
    response.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    if (e instanceof import_zod4.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function getPostData(request, response) {
  try {
    const { data: posts, error } = await supabase.from("post").select("post_url, media, post_content, created_at").eq("user_id", request.userId);
    if (error) {
      console.log(error);
      throw (0, import_http_errors2.default)(500, `Failed to get post data: ${error.message}`);
    }
    response.status(200).json({ posts });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod4.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}

// src/routes/user-route.ts
var import_express3 = __toESM(require("express"));
var router3 = import_express3.default.Router();
router3.post("/onboard-user", addNewUserData);
router3.patch("/update-user", updateUserData);
router3.delete("/delete-account", deleteLinkedinAccount);
router3.get("/get-user", getUser);
router3.get("/get-linekdin-credentials", getLinkedinData);
router3.get("/get-profile", getProfileData);
router3.get("/get-posts", getPostData);
var user_route_default = router3;

// src/controllers/linkedin-auth-controller.ts
var import_config6 = require("dotenv/config");
var import_http_errors3 = __toESM(require("http-errors"));
var import_zod5 = require("zod");
var import_crypto = __toESM(require("crypto"));
async function getLinkedinCredentials(request, response) {
  try {
    const userId = request.userId;
    const state = import_crypto.default.randomBytes(20).toString("hex");
    request.session.userId = userId;
    const authUrl = getLinkedInAuthUrl(state);
    response.status(200).json({ authUrl });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod5.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function handleLinkedinCallback(request, response) {
  try {
    const { code, error } = linkedinCallbackValidator.parse(request.query);
    if (error) {
      throw (0, import_http_errors3.default)(400, `LinkedIn authorization error: ${error}`);
    }
    console.log("callback session : ", request.session.userId);
    const userId = request.session.userId;
    const tokenData = await exchangeCodeForToken(code);
    const profile = await getLinkedInProfile(tokenData.access_token);
    const stored = await storeCredentialsInDB(
      userId,
      tokenData.access_token,
      tokenData.expires_in,
      profile.id,
      profile.picture
    );
    if (!stored) {
      throw (0, import_http_errors3.default)(500, "Failed to store LinkedIn credentials");
    }
    request.session.destroy((err) => {
      if (err) {
        console.error("could not destroy session", err);
      }
      response.redirect(process.env.REDIRECT_URL);
    });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod5.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function getLinkedinStatus(request, response) {
  try {
    const { data, error } = await supabase.from("linkedin").select("id, linkedin_id, expires_at").eq("user_id", request.userId).single();
    if (error) {
      console.log(error);
      throw (0, import_http_errors3.default)(500, "Failed to fetch LinkedIn credentials");
    }
    const isExpired = data.expires_at && new Date(data.expires_at) < /* @__PURE__ */ new Date();
    response.status(200).json({
      connected: !isExpired,
      linkedinId: data.linkedin_id
    });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod5.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
async function postToLinkedin(request, response) {
  try {
    const { text, shareUrl, title, visibility, images, video } = linkedinPostValidator.parse(request.body);
    const userId = request.userId;
    const credentials = await getCredentialsFromDB(userId);
    if (!credentials) {
      throw (0, import_http_errors3.default)(404, "LinkedIn credentials not found");
    }
    const validAccessToken = await validateAndRefreshToken(credentials);
    if (!validAccessToken) {
      throw (0, import_http_errors3.default)(401, "LinkedIn authentication expired");
    }
    let mediaType = "NONE";
    let mediaAttachments = [];
    if (images) {
      for (const image of images) {
        mediaAttachments.push(
          await processMedia(
            validAccessToken,
            credentials.profile_id,
            image,
            "image"
          )
        );
      }
      mediaType = "IMAGE";
    } else if (video) {
      mediaAttachments.push(
        await processMedia(
          validAccessToken,
          credentials.profile_id,
          video,
          "video"
        )
      );
      mediaType = "VIDEO";
    }
    const postId = await postToLinkedIn(
      validAccessToken,
      credentials.profile_id,
      {
        text,
        shareUrl,
        title,
        visibility
      },
      mediaAttachments,
      mediaType
    );
    const { data, error } = await supabase.from("post").insert([
      {
        user_id: userId,
        post_content: text,
        post_url: `https://www.linkedin.com/feed/update/${postId}`,
        media: images || [video]
      }
    ]).select("post_url");
    if (error) {
      console.log(error);
      throw (0, import_http_errors3.default)(500, "Failed to save linkedin post");
    }
    response.status(201).json({
      success: true,
      message: "Content posted to LinkedIn successfully",
      post: data[0]?.post_url
    });
  } catch (e) {
    console.log(e);
    if (e instanceof import_zod5.ZodError) {
      response.status(422).json({ error: "Invalid request body", details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: "An unknown error occurred" });
    }
  }
}

// src/routes/linkedin-auth-route.ts
var import_express4 = __toESM(require("express"));
var router4 = import_express4.default.Router();
router4.get("/status", getLinkedinStatus);
router4.get("/callback", handleLinkedinCallback);
router4.get("/get-credentials", getLinkedinCredentials);
router4.post("/post", postToLinkedin);
var linkedin_auth_route_default = router4;

// src/index.ts
var import_cors = __toESM(require("cors"));

// src/middlewares/authMiddleware.ts
var import_http_errors4 = __toESM(require("http-errors"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_config7 = require("dotenv/config");
var authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) {
      throw (0, import_http_errors4.default)(
        401,
        "Unauthorized: Missing or invalid Authorization header."
      );
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw (0, import_http_errors4.default)(401, "Unauthorized: Token not provided.");
    }
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret) {
      throw (0, import_http_errors4.default)(500, "Internal Server Error: Missing JWT secret.");
    }
    const decoded = import_jsonwebtoken.default.verify(token, secret);
    if (typeof decoded === "string" || !decoded.sub || !decoded.email || !decoded.role || decoded.role !== "authenticated") {
      throw (0, import_http_errors4.default)(401, "Unauthorized: Invalid token payload.");
    }
    req.userId = decoded.sub;
    req.email = decoded.email;
    req.displayName = decoded.user_metadata?.displayName;
    next();
  } catch (error) {
    if (error instanceof import_jsonwebtoken.default.JsonWebTokenError) {
      return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
    next(error);
  }
};

// src/index.ts
var import_express_session = __toESM(require("express-session"));
var app = (0, import_express5.default)();
app.use(import_express5.default.json());
app.use((0, import_cors.default)());
app.use(
  (0, import_express_session.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1e3
    }
  })
);
var publicRoutes = ["/", "/api/linkedin/callback"];
app.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  authMiddleware(req, res, next);
});
app.get("/", (req, res) => {
  res.send("Hello Worldss!");
});
app.use("/api", context_processing_route_default);
app.use("/api", post_generation_route_default);
app.use("/api", user_route_default);
app.use("/api/linkedin", linkedin_auth_route_default);
app.listen(9e3, () => {
  console.log("Server is running on port 9000");
});
var index_default = app;
