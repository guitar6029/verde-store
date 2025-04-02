export default function LoadingDotsAnimated({
  loadingText = "Loading",
}: {
  loadingText?: string;
}) {
  return (
    <div className="verde text-9xl mx-auto my-auto flex flex-row gap-2">
      <span>{loadingText}</span>
      <span className="animate-bounce bounce-1">.</span>
      <span className="animate-bounce bounce-2">.</span>
      <span className="animate-bounce bounce-3">.</span>
    </div>
  );
}
