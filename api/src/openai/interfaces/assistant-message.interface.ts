import {
  OpenAIUserPartType,
  OpenAIAssistantPartType,
} from '../enums/assistant-message.enum';

export type UserMessagePart =
  | { type: OpenAIUserPartType.TEXT; text: string }
  | { type: OpenAIUserPartType.IMAGE_URL; image_url: { url: string } }
  | { type: OpenAIUserPartType.IMAGE_FILE; image_file: { file_id: string } };

export type AssistantMessagePart =
  | { type: OpenAIAssistantPartType.TEXT; text: { value: string } }
  | { type: OpenAIAssistantPartType.IMAGE_URL; image_url: { url: string } }
  | {
      type: OpenAIAssistantPartType.IMAGE_FILE;
      image_file: { file_id: string };
    };

export interface AssistantMessageOptions {
  systemPrompt: string;
  userPrompt: string;
  imageUrls: [string, string] | string[];
}

export interface OpenAIRunOptions {
  assistantId: string;
  instructions?: string;
}

export interface RunAssistantHtmlParams {
  userText: string;
  imageUrls: [string, string] | string[];
  temperature?: number;
}
