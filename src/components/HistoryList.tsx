import type { VoiceGeneration } from "../types";

interface HistoryListProps {
  generations: VoiceGeneration[];
}

export default function HistoryList({ generations }: HistoryListProps) {
  if (generations.length === 0) {
    return <p className="text-center text-gray-500 py-8">No generations yet</p>;
  }

  return (
    <div className="space-y-3">
      {generations.map((generation) => (
        <div
          key={generation.id}
          className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500"
        >
          <p className="text-sm text-gray-700 mb-2">{generation.text}</p>
          <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
            <span>{new Date(generation.created_at).toLocaleString()}</span>
            <span className="capitalize">{generation.status}</span>
          </div>
          {generation.audio_url && (
            <audio controls className="w-full mt-2">
              <source src={generation.audio_url} type="audio/mpeg" />
            </audio>
          )}
        </div>
      ))}
    </div>
  );
}
