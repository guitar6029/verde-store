import { IconProps } from "@/types/Icon";

export default function SectionTitle({
  title,
  Icon,
  icon_size = 50,
}: {
  title: string;
  Icon?: React.ComponentType<IconProps>;
  icon_size?: number;
}) {
  return (
    <div className="flex flex-row items-center gap-2 bg-cyan-50 w-fit p-10">
      {Icon ? <Icon size={icon_size} /> : null}
      <h1 className="text-7xl verde">{title}</h1>
    </div>
  );
}
