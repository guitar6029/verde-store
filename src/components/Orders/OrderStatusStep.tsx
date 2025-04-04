import { IconProps } from "@/types/Icon";

export default function OrderStatusStep({
  status,
  current_step,
  Icon,
  icon_size = 20,
}: {
  status: string;
  current_step: boolean;
  Icon: React.ComponentType<IconProps>;
  icon_size?: number;
}) {
  return (
    <div className="flex flex-col xl:flex-row items-center gap-2">
      <div className="flex flex-col items-center gap-1">
        <div
          className={`flex flex-col items-center gap-2 rounded-full border-2 ${
            current_step ? "border-green-400" : "border-gray-300"
          }  p-10`}
        >
          <div
            className={`${current_step ? "text-green-600" : "text-gray-400"}`}
          >
            <Icon size={icon_size} />
          </div>
          <h1
            className={`text-2xl ${
              current_step ? "text-green-600 font-bold" : ""
            }`}
          >
            {status}
          </h1>
        </div>
      </div>
      {status.toLowerCase() !== "delivered" ? (
        <div className="w-[125px] h-[5px] bg-neutral-200 transform rotate-[90deg] mt-15 mb-15 xl:rotate-0 xl:mt-0 xl:mb-0 xl:ml-5 xl:mr-5"></div>
      ) : null}
    </div>
  );
}
