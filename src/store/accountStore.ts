import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import type { UserType } from "@/types/User";

type AccountState = {
  user: UserType | null;
  session: string | null;
  fetchSession: () => Promise<void>;
  updateUser: (user: UserType) => void;
  logout: () => Promise<void>;
};

export const useAccountStore = create<AccountState>((set) => ({
  user: null,
  session: null,

  fetchSession: async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error fetching session:", error);
      return;
    }

    if (data.session) {
      set({
        user: data.session.user as UserType,
        session: data.session.access_token,
      });
    } 
  },

  updateUser: (user: UserType) => {
    set({ user });
  },

  logout: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
}));
