import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import Link from "next/link";
export default function SuccessPage() {
  return (
    <div className="min-h-screen p-10">
      <HeaderWithImgBg title="Success" />
      <div className="flex flex-col gap-2 justify-center items-center mx-auto">
        <h1 className="text-4xl">Thank you for your order!</h1>
        <Link href={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}
