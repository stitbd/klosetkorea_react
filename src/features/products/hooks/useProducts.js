import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { PLACEHOLDER_IMG } from '../../../utils';

// ─── Mock data for development (replace with real API) ───────────
const mockProducts = (category, count = 4) =>
  Array.from({ length: count }, (_, i) => ({
    id:           `${category}-${i + 1}`,
    name:         `Fimon ${category} #${i + 1}`,
    slug:         `fimon-${category.toLowerCase()}-${i + 1}`,
    sku:          `MU-00${100 + i}`,
    price:        Math.floor(Math.random() * 3000) + 500,
    originalPrice:Math.floor(Math.random() * 5000) + 2000,
    image:        PLACEHOLDER_IMG,
    badge:        i === 0 ? 'New' : i === 1 ? 'Sale' : null,
    category,
    inStock:      true,
  }));

// ─── Generic product section hook ────────────────────────────────
const useProductSection = (fetcher, mockCategory, mockCount = 4) => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetcher()
      .then((res) => {
        if (!cancelled) setProducts(res?.data ?? res ?? []);
      })
      .catch(() => {
        // Fallback to mock in dev
        if (!cancelled) setProducts(mockProducts(mockCategory, mockCount));
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
};

// ─── Named hooks (one per section) ───────────────────────────────
export const useNewArrivals      = () => useProductSection(productService.getNewArrivals,       'Ravenna Leather',  4);
export const useLatestProducts   = () => useProductSection(productService.getLatestProducts,    'Royal Signature',  4);
export const usePanjabiCollection= () => useProductSection(productService.getPanjabiCollection, 'Panjabi',          4);
export const useWallets          = () => useProductSection(productService.getWallets,           'Wallet',           4);
export const useLongWallets      = () => useProductSection(productService.getLongWallets,       'Long Wallet',      3);
export const useLuxuryShirts     = () => useProductSection(productService.getLuxuryShirts,      'Luxury Shirt',     4);
export const useBelts            = () => useProductSection(productService.getBelts,             'Belt',             4);
export const useCaps             = () => useProductSection(productService.getCaps,              'Cap',              4);
