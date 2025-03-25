import { ShoppingBasket } from "lucide-react";

export default function ShoppingCart({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-row items-center justify-center p-5 rounded-full bg-green-100 hover:bg-green-200 transition duration-300 ease-in group">
      <ShoppingBasket className="w-5 h-5 group-hover:text-green-600 group-hover:scale-110" />
    </div>
  );
}
