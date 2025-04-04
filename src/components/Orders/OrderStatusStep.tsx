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
        {/* <div
          className={`w-20 h-20 flex flex-row items-center justify-center p-5 border-2 ${
            current_step ? "border-green-700 bg-green-200" : "border-white"
          } rounded-full`}
        >
          <div
            className={`w-10 h-10 ${
              current_step
                ? "bg-green-400 border-green-500"
                : "bg-green-200 border-green-300"
            } border-2  rounded-full`}
          ></div>
        </div> */}
        <div className="flex flex-col items-center gap-2">
          <div className={`${current_step ? "text-green-600" : "text-gray-400"}`}>
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
        <div className="w-[150px] h-[2px] bg-neutral-200 transform rotate-[90deg] mt-15 mb-15 xl:rotate-0 xl:mt-0 xl:mb-0"></div>
      ) : null}
    </div>
  );
}
