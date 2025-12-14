import { useState, useEffect } from "react";
import VoiceGenerationForm from "./components/VideoGenerationForm";
import StatusBadge from "./components/StatusBadge";
import AudioPlayer from "./components/AudioPlayer";
import HistoryList from "./components/HistoryList";
import { voiceGenerationAPI } from "./services/api";
import type { VoiceGeneration, VoiceGenerationStatus } from "./types";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentGeneration, setCurrentGeneration] =
    useState<VoiceGeneration | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<VoiceGeneration[]>([]);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  // Poll for status updates
  useEffect(() => {
    if (!currentGeneration) return;
    if (
      currentGeneration.status === "completed" ||
      currentGeneration.status === "failed"
    )
      return;

    const interval = setInterval(async () => {
      try {
        const updated = await voiceGenerationAPI.getById(currentGeneration.id);
        setCurrentGeneration(updated);

        if (updated.status === "completed" || updated.status === "failed") {
          clearInterval(interval);
          setIsLoading(false);
          loadHistory();
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentGeneration]);

  const loadHistory = async () => {
    try {
      const response = await voiceGenerationAPI.getAll();
      const completed = response.voice_generations.filter(
        (vg) => vg.status === "completed"
      ) as VoiceGeneration[];
      setHistory(completed);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  };

  const handleSubmit = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentGeneration(null);

    try {
      const response = await voiceGenerationAPI.create(text);
      const generation = await voiceGenerationAPI.getById(response.id);
      setCurrentGeneration(generation);
    } catch (err: any) {
      setError(
        err.response?.data?.errors?.join(", ") || "Failed to generate voice"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-3">
            🎙️ Voice Generation
          </h1>
          <p className="text-xl text-purple-100">
            Convert text to speech using AI
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <VoiceGenerationForm onSubmit={handleSubmit} isLoading={isLoading} />

          {/* Status */}
          {currentGeneration && (
            <div className="mt-6">
              <StatusBadge
                status={currentGeneration.status}
                message={currentGeneration.error_message}
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-100 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Audio Player */}
          {currentGeneration?.audio_url && (
            <div className="mt-6">
              <AudioPlayer audioUrl={currentGeneration.audio_url} />
            </div>
          )}
        </div>

        {/* History Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Generations
          </h2>
          <HistoryList generations={history} />
        </div>
      </div>
    </div>
  );
}

export default App;
