import { useState, useEffect, useCallback } from "react";
import { productService } from "../services/product.service";

// ─── useHomeSections ViewModel ────────────────────────────────────────────────
// MVVM: This hook IS the ViewModel — it owns state, fetching, & derived data.
// Views (components) consume it but never call services directly.

export const useHomeSections = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await productService.getHomeSections();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSections(); }, [fetchSections]);

  return {
    heroSlides: data?.heroSlides ?? [],
    trustBadges: data?.trustBadges ?? [],
    productSections: data?.productSections ?? [],
    loading,
    error,
    retry: fetchSections,
  };
};

// ─── useCart ViewModel ────────────────────────────────────────────────────────
export const useAddToCart = () => {
  const [adding, setAdding] = useState(null); // productId being added

  const addToCart = useCallback(async (product) => {
    try {
      setAdding(product.id);
      await productService.addToCart(product.id);
      // Also update local Zustand store for instant UI feedback
      const { useCartStore } = await import("../context/store");
      useCartStore.getState().addItem(product);
    } catch (err) {
      console.error("Add to cart failed:", err.message);
    } finally {
      setAdding(null);
    }
  }, []);

  return { addToCart, adding };
};
