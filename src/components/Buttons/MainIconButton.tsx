import { IconProps } from "@/types/Icon";

export default function MainIconBtn({
  refValue,
  size,
  Icon,
  className = "", // Default to an empty string if className isn't provided
  handleEvent,
}: {
  refValue?: React.RefObject<HTMLDivElement | null>;
  size: number;
  Icon?: React.ComponentType<IconProps>; // Optional Icon
  className?: string; // Optional className
  handleEvent?: () => void; // Optional event handler
}) {
  return (
    <div
      ref={refValue} // Use refValue for this div
      onClick={handleEvent} // Trigger the event handler if provided
      className={`${className} flex flex-row items-center justify-center p-5 rounded-full border-2 border-white hover:border-green-300 bg-green-100 hover:bg-green-200 transition duration-300 ease-in group hover:cursor-pointer`}
    >
      {Icon && <Icon size={size} />} {/* Render Icon only if provided */}
    </div>
  );
}