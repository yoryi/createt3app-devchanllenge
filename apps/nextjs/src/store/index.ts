import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type MyStoreType = {
  name: String;
  email: String;
};

type Actions = {
  setName: (name: String) => void;
  setEmail: (email: String) => void;
};

export const useMyStore = create(
  immer<MyStoreType & Actions>((set) => ({
    name: "",
    email: "",

    setName: (name: String) =>
      set((state) => {
        state.name = name;
      }),
    setEmail: (email: String) =>
      set((state) => {
        state.email = email;
      }),
  })),
);

export default useMyStore;
