import type { VoiceGenerationStatus } from "../types";

interface StatusBadgeProps {
  status: VoiceGenerationStatus;
  message?: string;
}

export default function StatusBadge({ status, message }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusMessage = () => {
    if (message) return message;
    switch (status) {
      case "pending":
        return "Voice generation started...";
      case "processing":
        return "Processing your request...";
      case "completed":
        return "Voice generated successfully!";
      case "failed":
        return "Voice generation failed";
      default:
        return status;
    }
  };

  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${getStatusStyles()}`}>
      <p className="font-medium">{getStatusMessage()}</p>
    </div>
  );
}
