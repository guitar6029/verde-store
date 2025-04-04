import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { getGreeting } from "@/utils/greeting";
import { createClient } from "@/utils/supabase/server";
import { getDetailedOrder } from "@/lib/db/orders";
import OrdersList from "@/components/Orders/OrdersList";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
export default async function AccountClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // get detailed orders
  if (!user) return null;
  const { data: detailedOrders, error } = await getDetailedOrder(user?.id);

  return (
    <div className="p-10">
      <HeaderWithImgBg title="Account" />
      <h1 className="text-7xl verde mt-10">
        {getGreeting()} {user?.user_metadata?.email.split("@")[0] || "User"}!
      </h1>
      <section className="mt-10">
        <SectionTitle title="Recent Orders" />
        <OrdersList orders={detailedOrders ?? []} errors={error} />
      </section>
    </div>
  );
}
