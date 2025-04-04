import { ChevronDown, ChevronUp } from "lucide-react";

export default function ShowMore({
  toggle,
  currentState,
}: {
  toggle: () => void;
  currentState: boolean;
}) {
  return (
    <div
      onClick={toggle}
      className="flex flex-row items-center gap-2 cursor-pointer"
    >
      <button>{currentState ? "View all items" : "Collapse"}</button>
      {currentState ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
    </div>
  );
}
