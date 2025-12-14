export type VoiceGenerationStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export interface VoiceGeneration {
  id: number;
  text: string;
  status: VoiceGenerationStatus;
  audio_url?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}
