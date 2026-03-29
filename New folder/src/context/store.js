import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Cart Store (Zustand + localStorage persistence) ─────────────────────────

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { product, qty }

      addItem(product, qty = 1) {
        const items = get().items;
        const idx = items.findIndex((i) => i.product.id === product.id);
        if (idx >= 0) {
          const updated = [...items];
          updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
          set({ items: updated });
        } else {
          set({ items: [...items, { product, qty }] });
        }
      },

      removeItem(productId) {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      updateQty(productId, qty) {
        if (qty <= 0) return get().removeItem(productId);
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, qty } : i
          ),
        });
      },

      clearCart() { set({ items: [] }); },

      get totalItems() {
        return get().items.reduce((acc, i) => acc + i.qty, 0);
      },

      get totalPrice() {
        return get().items.reduce((acc, i) => acc + i.product.price * i.qty, 0);
      },
    }),
    { name: "fimon-cart" }
  )
);

// ─── UI Store ────────────────────────────────────────────────────────────────
export const useUIStore = create((set) => ({
  mobileMenuOpen: false,
  cartDrawerOpen: false,
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  toggleCartDrawer: () => set((s) => ({ cartDrawerOpen: !s.cartDrawerOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),
}));
