import { create } from "zustand";

type ThemeState = {
  toggleTheme: boolean;
  toggle: () => void;
  getTheme: () => boolean;
};

//create a store to manage the theme state ( light / dark mode )

export const useThemeStore = create<ThemeState>((set, get) => ({
  toggleTheme: false,
  toggle: () => set((state) => ({ toggleTheme: !state.toggleTheme })),
  getTheme: () => {
    return get().toggleTheme;
  },
}));
