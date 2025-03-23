// components/HeartButton.tsx
import { Heart, HeartOff } from "lucide-react";

interface HeartButtonProps {
  isFavorited: boolean;
  onClick: () => void;
}

const HeartButton: React.FC<HeartButtonProps> = ({ isFavorited, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-row items-center justify-center p-5 rounded-full ${
        isFavorited ? "bg-red-200" : "bg-red-100"
      } hover:bg-red-200 transition duration-300 ease-in group hover:cursor-pointer`}
    >
      {isFavorited ? (
        <HeartOff className="w-5 h-5 text-red-600 group-hover:scale-110" />
      ) : (
        <Heart className="w-5 h-5 group-hover:text-red-600 group-hover:scale-110" />
      )}
    </div>
  );
};

export default HeartButton;
