"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { createClient } from "@/utils/supabase/client"; // Ensure client version
import type { UserType } from "@/types/User";
type UserContextType = {
  user: UserType | null;
};

const UserContext = createContext<UserContextType>({
  user: null,
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchUserAndListen = async () => {
      try {
        // Fetch current user session
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          toast.error("Failed to fetch user data");
        } else {
          setUser(data?.user as UserType);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        toast.error("Something went wrong while fetching user data");
      } finally {
        setLoading(false);
      }

      // Authentication state listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_, session) => {
          setUser(session?.user as UserType); // Update or clear user state
        }
      );

      // Cleanup listener on unmount
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    fetchUserAndListen();
  }, []);

  // Provide user context
  return (
    <UserContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the user context
export const useUserContext = () => useContext(UserContext);
