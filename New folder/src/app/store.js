import { configureStore } from "@reduxjs/toolkit";
import cartReducer    from "../features/cart/cartSlice";
import productsReducer from "../features/products/productSlice";

// ─── Redux Store ──────────────────────────────────────────────────────────────
const store = configureStore({
  reducer: {
    cart:     cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // allow Date objects in state if needed
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

/** @typedef {ReturnType<typeof store.getState>} RootState */
/** @typedef {typeof store.dispatch} AppDispatch */
