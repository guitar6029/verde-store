import { Mail as MailIcon } from "lucide-react";

export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-10 bg-red-50">
        <div className="flex flex-col items-center gap-2 bg-cyan-100">
          <div className="flex flex-col gap-2 items-center bg-green-100 p-10">
            <h1 className="text-6xl font-bold verde">Check your email</h1>
            <div className="flex flex-row items-center justify-center p-5 rounded-full bg-green-100 hover:bg-green-200 transition duration-300 ease-in group">
              <MailIcon className="w-5 h-5 group-hover:text-green-600 group-hover:scale-110" />
            </div>
          </div>

          <p className="text-2xl p-10">We sent you a confirmation link</p>
        </div>
      </div>
    </div>
  );
}
