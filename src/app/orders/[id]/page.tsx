export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  return <span>order {orderId} </span>;
}
