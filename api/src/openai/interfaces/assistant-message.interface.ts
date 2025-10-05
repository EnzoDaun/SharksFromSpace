import { OpenAIUserPartType, OpenAIAssistantPartType } from '../enums/assistant-message.enum';

export type UserMessagePart =
  | { type: OpenAIUserPartType.TEXT; text: string }
  | { type: OpenAIUserPartType.IMAGE_URL; image_url: { url: string } }
  | { type: OpenAIUserPartType.IMAGE_FILE; image_file: { file_id: string } };

export type AssistantMessagePart =
  | { type: OpenAIAssistantPartType.TEXT; text: { value: string } }
  | { type: OpenAIAssistantPartType.IMAGE_URL; image_url: { url: string } }
  | { type: OpenAIAssistantPartType.IMAGE_FILE; image_file: { file_id: string } };

export interface RunAssistantHtmlParams {
  userText: string;
  imageUrls: [string, string] | string[]; // manter compatível
  temperature?: number;
  // Removido maxOutputTokens pois não é suportado por Assistants v2
}