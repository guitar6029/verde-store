import { createClient } from "@/utils/supabase/server";
import { getDetailedOrders } from "@/lib/db/orders";
import OrdersList from "@/components/Orders/OrdersList";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";

export default async function OrderSection() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  const { data: detailedOrders, error } = await getDetailedOrders(user?.id);
  return (
    <section className="mt-10 p-10">
      <HeaderWithImgBg title="Orders" />
      <SectionTitle title="Recent Orders" />
      <OrdersList orders={detailedOrders ?? []} errors={error} />
    </section>
  );
}
