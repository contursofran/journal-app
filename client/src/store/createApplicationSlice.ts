import { ApplicationSlice, StoreSlice } from "../types";

const createApplicationSlice: StoreSlice<ApplicationSlice> = (set, get) => ({
  colorScheme: "dark",
  toggleColorScheme: () =>
    set((state) => ({
      colorScheme: state.colorScheme === "dark" ? "light" : "dark",
    })),
  accentColor: "blue",
  setAccentColor: (color) => set(() => ({ accentColor: color })),
});

export { createApplicationSlice };
