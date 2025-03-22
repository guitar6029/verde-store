import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";

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

  return (
    <div className="relative min-h-screen flex flex-col gap-[3rem] p-20">
      <HeaderWithImgBg title="Account" />
      <p>Hello {data.user.email}</p>
    </div>
  );
}
