import { createSlice } from "@reduxjs/toolkit";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem("fimon_cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items) => {
  try {
    localStorage.setItem("fimon_cart", JSON.stringify(items));
  } catch { /* ignore quota errors */ }
};

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  items: loadFromStorage(), // [{ product, qty }]
  drawerOpen: false,
};

// ─── Slice ────────────────────────────────────────────────────────────────────
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload: product }) {
      const idx = state.items.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        state.items[idx].qty += 1;
      } else {
        state.items.push({ product, qty: 1 });
      }
      saveToStorage(state.items);
    },

    removeItem(state, { payload: productId }) {
      state.items = state.items.filter((i) => i.product.id !== productId);
      saveToStorage(state.items);
    },

    updateQty(state, { payload: { productId, qty } }) {
      if (qty <= 0) {
        state.items = state.items.filter((i) => i.product.id !== productId);
      } else {
        const item = state.items.find((i) => i.product.id === productId);
        if (item) item.qty = qty;
      }
      saveToStorage(state.items);
    },

    clearCart(state) {
      state.items = [];
      saveToStorage([]);
    },

    openDrawer(state)  { state.drawerOpen = true; },
    closeDrawer(state) { state.drawerOpen = false; },
    toggleDrawer(state) { state.drawerOpen = !state.drawerOpen; },
  },
});

export const {
  addItem, removeItem, updateQty, clearCart,
  openDrawer, closeDrawer, toggleDrawer,
} = cartSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectCartItems      = (state) => state.cart.items;
export const selectCartDrawerOpen = (state) => state.cart.drawerOpen;
export const selectCartTotal      = (state) =>
  state.cart.items.reduce((acc, i) => acc + i.product.price * i.qty, 0);
export const selectCartCount      = (state) =>
  state.cart.items.reduce((acc, i) => acc + i.qty, 0);

export default cartSlice.reducer;
