import create from "zustand";

type Store = {
  isOpen: boolean;
  toggleIsOpen: () => void;
};

const useStore = create<Store>((set) => ({
  isOpen: true,
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useStore;
