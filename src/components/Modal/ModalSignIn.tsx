import { X } from "lucide-react";
import Link from "next/link";

export default function ModalSignIn({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-0 left-0 w-full min-h-screen flex items-center justify-center z-[100]">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute top-0 left-0 w-full h-full bg-neutral-200 opacity-70 z-[100]"
      ></div>

      {/* Modal Content */}
      <div className="flex flex-col gap-5 rounded-xl bg-white p-10 z-[101]">
        <div className="flex flex-row justify-end w-full">
          <button onClick={onClose} className="hover:cursor-pointer p-5 bg-cyan-100 rounded-full">
            <X size={30} />
          </button>
        </div>
        <h1 className="verde text-7xl">Verde</h1>
        <span className="text-2xl">To favorite an item, please create an account</span>
        <div className="flex flex-col gap-2">
          <Link href="/register">
            <button className="hover:cursor-pointer verde bg-green-100 p-5 rounded-full hover:bg-green-200 transition duration-300 ease-in text-5xl">
              Continue to register
            </button>
          </Link>
          <hr />
          <div className="flex flex-row gap-2 items-center text-2xl">
            <span>Already have an account?</span>
            <Link href="/login">
              <span className="italic">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
