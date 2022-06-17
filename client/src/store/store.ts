import create from "zustand";
import { devtools } from "zustand/middleware";
import { createCalendarSlice } from "./createCalendarSlice";
import { createApplicationSlice } from "./createApplicationSlice";
import { createNotesSlice } from "./createNotesSlice";
import { StoreState } from "../types";

const useStore = create<StoreState>()(
  devtools((set, get) => ({
    ...createCalendarSlice(set, get),
    ...createApplicationSlice(set, get),
    ...createNotesSlice(set, get),
  }))
);

export default useStore;
