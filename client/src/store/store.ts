import create from "zustand";
import createCalendarSlice from "./createCalendarSlice";
import { StoreState } from "../types";

const useStore = create<StoreState>((set, get) => ({
  ...createCalendarSlice(set, get),
}));

export default useStore;
