import { create } from "zustand";
import { ICartStore } from "../types";
import { FindStorage } from "./storage";

export const useStore = create<ICartStore>((set) => ({
  cart: FindStorage("cart") ? JSON.parse(FindStorage("cart")!) : [],
  addCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),
  removeCart: (product) =>
    set((state) => ({
      cart: state.cart.filter((el) => el.desc !== product.desc),
    })),
  clearCart: () => set(() => ({ cart: [] })),
}));
