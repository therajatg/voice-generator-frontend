import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface VoiceGeneration {
  id: number;
  text: string;
  status: "pending" | "processing" | "completed" | "failed";
  audio_url?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateVoiceGenerationResponse {
  id: number;
  status: string;
  text: string;
  created_at: string;
  message: string;
}

export interface VoiceGenerationsListResponse {
  voice_generations: Array<{
    id: number;
    text: string;
    status: string;
    audio_url?: string;
    created_at: string;
  }>;
}

export const voiceGenerationAPI = {
  create: async (text: string): Promise<CreateVoiceGenerationResponse> => {
    const response = await api.post("/voice_generations", {
      voice_generation: { text },
    });
    return response.data;
  },

  getById: async (id: number): Promise<VoiceGeneration> => {
    const response = await api.get(`/voice_generations/${id}`);
    return response.data;
  },

  getAll: async (): Promise<VoiceGenerationsListResponse> => {
    const response = await api.get("/voice_generations");
    return response.data;
  },
};

export default api;
