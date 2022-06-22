import { ApplicationSlice, StoreSlice } from "../types";

const createApplicationSlice: StoreSlice<ApplicationSlice> = (set, get) => ({
  colorScheme: "dark",
  toggleColorScheme: () =>
    set((state) => ({
      colorScheme: state.colorScheme === "dark" ? "light" : "dark",
    })),
  accentColor: "#1971c2",
  status: "saving",
  setStatus: (status) => set(() => ({ status })),
});

export { createApplicationSlice };
