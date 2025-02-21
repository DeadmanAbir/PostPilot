import {
  Content,
  CountTokensResponse,
  GenerateContentStreamResult,
  GenerativeModel,
  GoogleGenerativeAI,
  RequestOptions,
} from "@google/generative-ai";
import {
  FileState,
  GoogleAIFileManager,
  UploadFileResponse,
} from "@google/generative-ai/server";
interface ChatGeminiArgs {
  apiKey: string;
  model: string;
}

interface GeminiChatProps {
  prompt: string;
  stream?: boolean;
  systemInstruction?: string;
  options?: RequestOptions;
  context?: string;
  outputFormat?: string;
  file?:
    | Record<"path" | "mimetype", string>[]
    | Record<"link" | "mimetype", string>[];
}

interface GeminiChatWithHistoryProps extends GeminiChatProps {
  chatHistory: Record<"model" | "user", string>[];
  maxOutputTokens?: number;
}

interface ChatGeminiResponse {
  content: string;
  promptTokenCount: number | null;
  candidatesTokenCount: number | null;
}

interface ChatGeminiHistoryCountTokensProps {
  chatHistory: Record<"model" | "user", string>[];
  options?: RequestOptions;
}

interface ChatGeminiCountTokensProps {
  prompt: string;
  options?: RequestOptions;
  context?: string;
  outputFormat?: string;
  file?:
    | Record<"path" | "mimetype", string>[]
    | Record<"link" | "mimetype", string>[];
}

export class ChatGemini {
  private client: GoogleGenerativeAI;
  private fileManager: GoogleAIFileManager;
  private model: string;

  constructor(props: ChatGeminiArgs) {
    const { apiKey, model } = props;
    if (!apiKey || apiKey.length === 0) {
      throw new Error("No API key provided for Gemini AI.");
    }
    this.client = new GoogleGenerativeAI(apiKey);
    this.fileManager = new GoogleAIFileManager(apiKey);
    this.model = model;
  }

  async chat(
    props: GeminiChatProps
  ): Promise<ChatGeminiResponse | GenerateContentStreamResult> {
    const {
      prompt,
      stream = false,
      options,
      systemInstruction,
      context,
      outputFormat,
      file,
    } = props;

    const client = this.createClient(this.model, systemInstruction, options);
    const content = this.createContext(prompt, context, outputFormat);

    const fileParts =
      file && file.length > 0 ? await this.fileUpload(file) : [];

    if (stream) {
      return await client.generateContentStream([content, ...fileParts]);
    }

    const result = await client.generateContent([content, ...fileParts]);
    const response = await result.response;
    const text = await response.text();

    return {
      content: text.replace("```json\n", "").replace("\n```", "") ?? "",
      promptTokenCount: response?.usageMetadata?.promptTokenCount ?? null,
      candidatesTokenCount:
        response?.usageMetadata?.candidatesTokenCount ?? null,
    };
  }

  async chatWithHistory(
    props: GeminiChatWithHistoryProps
  ): Promise<ChatGeminiResponse | GenerateContentStreamResult> {
    const {
      prompt,
      stream = false,
      options,
      systemInstruction,
      context,
      outputFormat,
      chatHistory,
      maxOutputTokens,
    } = props;

    const client = this.createClient(this.model, systemInstruction, options);

    const content = this.createContext(prompt, context, outputFormat);

    const history = this.createChatHistory(chatHistory);

    const chat = client.startChat({
      history,
      generationConfig: {
        maxOutputTokens,
      },
    });

    if (!stream) {
      const result = await chat.sendMessage(content);
      const response = await result.response;
      const text = await response.text();

      return {
        content: text.replace("```json\n", "").replace("\n```", "") ?? "",
        promptTokenCount: response?.usageMetadata?.promptTokenCount ?? null,
        candidatesTokenCount:
          response?.usageMetadata?.candidatesTokenCount ?? null,
      };
    }

    const result = await chat.sendMessageStream(content);
    return result;
  }

  async countChatHistoryTokens(
    props: ChatGeminiHistoryCountTokensProps
  ): Promise<CountTokensResponse> {
    const { options, chatHistory } = props;

    const client = this.createClient(this.model, undefined, options);
    const history = this.createChatHistory(chatHistory);
    const chat = client.startChat({
      history,
    });

    const countResult = await client.countTokens({
      generateContentRequest: { contents: await chat.getHistory() },
    });

    return countResult;
  }

  async countTokens(
    props: ChatGeminiCountTokensProps
  ): Promise<CountTokensResponse> {
    const { prompt, context, outputFormat, file, options } = props;

    const client = this.createClient(this.model, undefined, options);

    const content = this.createContext(prompt, context, outputFormat);

    const fileParts = file ? await this.fileUpload(file) : [];
    const result = await client.countTokens([content, ...fileParts]);

    return result;
  }

  private createChatHistory(
    chatHistory: Record<"model" | "user", string>[]
  ): Content[] {
    return chatHistory.flatMap((entry) => [
      { role: "user" as const, parts: [{ text: entry.user }] },
      { role: "model" as const, parts: [{ text: entry.model }] },
    ]);
  }

  private createClient(
    model: string,
    systemInstruction?: string,
    options?: RequestOptions
  ): GenerativeModel {
    return this.client.getGenerativeModel({
      model,
      systemInstruction,
      ...options,
    });
  }

  private createContext(
    prompt: string,
    context?: string,
    outputFormat?: string
  ): string {
    let content = prompt;

    if (context) {
      content += `\ncontext:\n${context}`;
    }

    if (outputFormat) {
      content += `\noutput format:\n${outputFormat}`;
    }

    return content;
  }

  private async fileUpload(
    file:
      | Record<"path" | "mimetype", string>[]
      | Record<"link" | "mimetype", string>[]
  ) {
    const fileUploads = file.some((f) => "path" in f)
      ? await Promise.all(
          (file as Record<"path" | "mimetype", string>[]).map((img) =>
            this.handleFileUpload(img.path, img.mimetype)
          )
        )
      : [];

    const localFileParts = await Promise.all(
      fileUploads.map(async (upload) => ({
        fileData: {
          fileUri: upload.file.uri,
          mimeType: upload.file.mimeType,
        },
      }))
    );

    const onlineFileParts = file.some((f) => "link" in f)
      ? await Promise.all(
          (file as Record<"link" | "mimetype", string>[]).map(async (img) => {
            const response = await fetch(img.link);
            const buffer = await response.arrayBuffer();

            return {
              inlineData: {
                data: Buffer.from(buffer).toString("base64"),
                mimeType: img.mimetype,
              },
            };
          })
        )
      : [];

    const fileParts = [...localFileParts, ...onlineFileParts];

    return fileParts;
  }

  private async handleFileUpload(
    path: string,
    mimeType: string
  ): Promise<UploadFileResponse> {
    const uploadResult = await this.fileManager.uploadFile(path, {
      mimeType: mimeType,
    });
    let file = await this.fileManager.getFile(uploadResult.file.name);

    while (file.state === FileState.PROCESSING) {
      process.stdout.write(".");

      await new Promise((resolve) => setTimeout(resolve, 5000));
      file = await this.fileManager.getFile(uploadResult.file.name);
    }

    if (file.state === FileState.FAILED) {
      throw new Error("Media processing failed.");
    }
    return uploadResult;
  }
}
