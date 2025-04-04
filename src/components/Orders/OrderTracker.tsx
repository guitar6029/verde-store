import { Status } from "@/types/Orders";
import { Box, Cog, PackageCheck, Truck } from "lucide-react";
import OrderStatusStep from "@/components/Orders/OrderStatusStep";

const orderStatuses = [
  {
    name: "Ordered",
    actual_text: "ordered",
    icon: Box,
  },
  {
    name: "Processed",
    actual_text: "packed",
    icon: Cog,
  },
  {
    name: "Shipped",
    actual_text: "shipped",
    icon: Truck,
  },
  {
    name: "Delivered",
    actual_text: "delivered",
    icon: PackageCheck,
  },
];

export default function OrderTracker({
  currentStatus,
}: {
  currentStatus: Status;
}) {
  return (
    <div className="flex flex-col xl:flex-row items-center">
      {orderStatuses.map((step, index) => {
        return (
          <OrderStatusStep
            key={index}
            status={step.name}
            current_step={currentStatus === step.actual_text}
            Icon={step.icon}
            icon_size={40}
          />
        );
      })}
    </div>
  );
}
