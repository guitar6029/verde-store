import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { getUser } from "./actions";

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
      <div className="relative min-h-screen flex flex-col gap-[3rem] p-20">
        <HeaderWithImgBg title="Account" />
        <p>Sorry something went wrong</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col gap-[3rem] p-20">
      <HeaderWithImgBg title="Account" />
      <p>Hello {userData?.first_name}</p>
    </div>
  );
}
