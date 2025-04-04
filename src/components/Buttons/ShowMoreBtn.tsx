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
      className="flex sm:w-full md:w-[200px] text-center flex-row items-center justify-center gap-2 text-2xl rounded-xl p-2 bg-green-200 hover:bg-green-300 cursor-pointer group"
    >
      <button className="group-hover:cursor-pointer">{currentState ? "View all items" : "Collapse"}</button>
      {currentState ? <ChevronDown className="group-hover:cursor-pointer" size={20} /> : <ChevronUp className="group-hover:cursor-pointer" size={20} />}
    </div>
  );
}
