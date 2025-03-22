import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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
    <div>
      <h1>Accountt</h1>
      <p>Hello {data.user.email}</p>
    </div>
  );
}
