"use client";

import { ShoppingBasket} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ItemCardProp } from "@/types/CardProps";
import HeartButton from "../Icons/HeartButton";

export default function Card(props: ItemCardProp) {
  return (
    <div className="p-10 h-[50rem] flex flex-col gap-2 justify-around shadow-xl shadow-neutral-200 hover:shadow-neutral-400 transition duration-300 ease-in hover:bg-neutral-100">
      <div>
        <Link
          href={`/plants/${props.id}`}
          className="flex flex-col gap-1 hover:cursor-pointer"
        >
          <Image
            src={props.image_url}
            alt={props.name}
            width={200}
            height={200}
            className="object-contain w-[100%] rounded-xl"
          />
          <h1 className="text-2xl font-semibold">{props.name}</h1>
          <p>{props.description}</p>
          <div className="flex flex-row item-center justify-end">
            <span className="text-2xl font-semibold">${props.price}</span>
          </div>
          <hr className="border-1 border-neutral-200" />
        </Link>
      </div>
      <div className="flex flex-row gap-2 items-center justify-end">
        <div onClick={() => props.handleCart(props)} className="flex flex-row items-center justify-center p-5 rounded-full bg-green-100 hover:bg-green-200 transition duration-300 ease-in group hover:cursor-pointer">
          <ShoppingBasket className="w-5 h-5 group-hover:text-green-600 group-hover:scale-110" />
        </div>
        <HeartButton isFavorited={props.isFavorited} onClick={() => props.handleFavorite(props.id)} />
      </div>
    </div>
  );
}
