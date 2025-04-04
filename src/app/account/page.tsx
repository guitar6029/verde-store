import GotoBtn from "@/components/Nav/Goto";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { getGreeting } from "@/utils/greeting";
import { createClient } from "@/utils/supabase/server";

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
      <h1 className="text-7xl verde mt-10">
        {getGreeting()} {user?.user_metadata?.email.split("@")[0] || "User"}!
      </h1>
      <GotoBtn gotoPath="/account/orders" text="Orders" />
    </div>
  );
}
