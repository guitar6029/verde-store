import LoadingSpinner from "@/components/Icons/Loading";

type FormType = "submit" | "button";

export default function FormButton({
  type,
  loading,
  defaultTextState,
  loadingTextState,
}: {
  type: FormType;
  loading: boolean;
  defaultTextState: string;
  loadingTextState: string;
}) {
  return (
    <button
      type={type}
      disabled={loading}
      aria-busy={loading}
      aria-label={loading ? loadingTextState : defaultTextState}
      className="text-5xl verde p-5 bg-green-200 hover:cursor-pointer hover:bg-green-300 transition duration-300 ease-in"
    >
      {loading ? (
        <div className="flex flex-row gap-4 items-center justify-center">
          <span>{loadingTextState}</span>
          <LoadingSpinner />
        </div>
      ) : (
        <span>{defaultTextState}</span>
      )}
    </button>
  );
}
