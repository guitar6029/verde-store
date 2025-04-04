import GotoBtn from "@/components/Nav/Goto";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { getGreeting } from "@/utils/greeting";
import { createClient } from "@/utils/supabase/server";
import { UserRound } from "lucide-react";
import Link from "next/link";
export default async function AccountClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // get detailed orders
  if (!user) return null;

  return (
    <div className="p-10 flex flex-col gap-5 min-h-screen">
      <HeaderWithImgBg title="Account" />
      <div className="flex flex-row gap-10 items-center">
        <div className="w-fit p-5 border-2 border-green-400 rounded-full flex flex-row item-center justify-center">
          <UserRound size={50} />
        </div>
        <h1 className="text-7xl verde">
          {getGreeting()} {user?.user_metadata?.email.split("@")[0] || "User"}!
        </h1>
      </div>
      <section className="flex flex-col gap-4 mt-10">
        <GotoBtn gotoPath="/account/orders" text="Orders" />
      </section>
    </div>
  );
}
