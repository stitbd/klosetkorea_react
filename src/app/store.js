import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.id === product.id);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, { ...product, quantity }] }));
        }
      },

      removeFromCart: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQty: (id, quantity) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [] }),

      get totalItems() {
        return get().items.reduce((acc, i) => acc + i.quantity, 0);
      },

      get totalPrice() {
        return get().items.reduce((acc, i) => acc + i.price * i.quantity, 0);
      },
    }),
    { name: 'fimon-cart' },
  ),
);

export default useCartStore;
