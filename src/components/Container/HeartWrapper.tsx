// "use client";
// import {Heart, HeartOff } from "lucide-react";
// import type { Plant } from "@/types/CardProps";
// import { createClient } from "@/utils/supabase/server"; 
// export default function HeartIconContainer({item}: {item: Plant}) {

//   // use server for the supabase auth get user
//   const getUser = async () => {
//     const supabase = await createClient();
//     const { data: { user } } = await supabase.auth.getUser();
//   }



//   const handleFavorite = () => {

//   }

//     return (
//         <div
//           onClick={handleFavorite}
//           className={`flex flex-row items-center justify-center p-5 rounded-full ${
//             props.isFavorited ? "bg-red-200" : "bg-red-100"
//           } hover:bg-red-200 transition duration-300 ease-in group hover:cursor-pointer`}
//         >
//           {props.isFavorited && (
//             <HeartOff className="w-5 h-5 text-red-600 group-hover:scale-110" />
//           )}
//           {!props.isFavorited && (
//             <Heart className="w-5 h-5 group-hover:text-red-600 group-hover:scale-110" />
//           )}
//         </div>
//     )
// }