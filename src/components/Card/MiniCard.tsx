import type { Plant } from "@/types/CardProps";
import Image from "next/image";
import Link from "next/link";

export default function MiniCard(props: Plant) {
    return (
        <Link href={`/plants/${props.id}`} className="p-10 flex flex-col gap-2 rounded-xl shadow-xl shadow-neutral-200 hover:shadow-neutral-400 transition h-[17rem] duration-300 ease-in hover:bg-neutral-100">
            <div className="flex flex-col gap-1">
                <Image src={props.image_url} alt={props.name} width={50} height={50} className="object-contain w-20 h-20 rounded-xl" />
                <h1 className="text-5xl verde">{props.name}</h1>
            </div>
        </Link>
    )
}