import create from "zustand";
import { devtools } from "zustand/middleware";
import createCalendarSlice from "./createCalendarSlice";
import { StoreState } from "../types";

const useStore = create<StoreState>()(
  devtools((set, get) => ({
    ...createCalendarSlice(set, get),
  }))
);

export default useStore;
