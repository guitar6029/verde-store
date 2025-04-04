import { getDetailsOrder } from "@/lib/db/orders";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import OrdersList from "@/components/Orders/OrdersList";
import ItemsContainer from "@/components/Items/ItemsContainer";
import Goback from "@/components/Nav/Goback";
export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  //get the order details
  if (!orderId) return null;
  const { success, data, error } = await getDetailsOrder(orderId);
  if (!success || !data) {
    console.error(error);
    return (
      <div className="p-10 min-h-screen">
        <HeaderWithImgBg title="Order Details" />
        <Goback gobackPath="/orders" />
        <h1 className="text-7xl verde m-auto">Error Fetching Order</h1>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen">
      <HeaderWithImgBg title="Order Details" />
      <Goback gobackPath="/orders" />
      <OrdersList
        showDetailsBtn={false}
        showInvoiceBtn={false}
        orders={[{ order: data.order, detailedOrder: data.orderItems }]}
        errors={error}
      />
      <section>
        <ItemsContainer data={data.productsDetails} />
      </section>
    </div>
  );
}
