interface AudioPlayerProps {
  audioUrl: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  console.log("audioUrl", audioUrl);
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">Generated Audio:</h3>
      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
