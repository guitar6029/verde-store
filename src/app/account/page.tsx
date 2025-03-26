"use client";

import { useEffect } from "react";
import { useAccountStore } from "@/store/accountStore"; // Import Zustand store
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
export default function AccountClient() {
  const { user, fetchSession } = useAccountStore();
  
  // Ensure session is fetched when the component mounts (or user signs in)
  useEffect(() => {
    fetchSession(); // Fetch session when component mounts, after user login
  }, [fetchSession]); // Dependency array ensures fetchSession is re-run if needed

  if (!user){
    return (
      <div className="p-10 flex flex-col">
        <HeaderWithImgBg title="Account" />
        <h1 className="text-7xl verde mx-auto my-auto">Loading...</h1>
      </div>
    )
  }


  return (
    <div className="p-10">
      <HeaderWithImgBg title="Account" />
      <h1 className="text-7xl verde">Hello, {user?.user_metadata?.email.split("@")[0] || "User"}!</h1>
    </div>
  );
}
