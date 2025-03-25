import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { getUser } from "./actions";
import { getGreeting } from "@/utils/greeting";

export default async function Account() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  /**************
   * if user is not logged in
   * redirect to home
   *********/
  if (error || !data.user) {
    redirect("/");
  }

  const { data: userData, error: userError } = await getUser(data.user?.id);

  if (userError) {
    return (
      <div className="relative min-h-screen flex flex-col gap-[3rem] p-10">
        <HeaderWithImgBg title="Account" />
        <p className="text-2xl mx-auto my-auto">Sorry something went wrong</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col gap-[3rem] p-10">
      <HeaderWithImgBg title="Account" />
      <h1 className="text-7xl verde">{getGreeting()}, {userData?.first_name}</h1>
    </div>
  );
}
