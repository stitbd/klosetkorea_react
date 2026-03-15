import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { PLACEHOLDER_IMG } from '../../../utils';

// ─── CORRECT: Static import — Vite resolves at build time ─────────
// require() does NOT work in Vite (ES modules only).
// Use static import instead. If the file is missing, Vite shows a
// build warning but won't crash at runtime — the import resolves to
// undefined which we handle below.
import productImgAsset from '../../../assets/images/products/product.jpg';

// Resolved fallback: local asset if it loaded, else PLACEHOLDER_IMG
const localProductImg = productImgAsset || PLACEHOLDER_IMG;

// ─── Mock data for development ────────────────────────────────────
const mockProducts = (category, count = 4) =>
  Array.from({ length: count }, (_, i) => ({
    id:            `${category}-${i + 1}`,
    name:          `Elonis ${category} #${i + 1}`,
    slug:          `elonis-${category.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
    sku:           `MU-00${100 + i}`,
    price:         Math.floor(Math.random() * 3000) + 500,
    originalPrice: Math.floor(Math.random() * 5000) + 2000,
    image:         localProductImg,
    badge:         i === 0 ? 'New' : i === 1 ? 'Sale' : null,
    category,
    inStock:       true,
  }));

// ─── Generic product section hook ─────────────────────────────────
const useProductSection = (fetcher, mockCategory, mockCount = 4) => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((res) => {
        if (!cancelled) {
          const data = res?.data ?? res ?? [];
          const resolved = Array.isArray(data)
            ? data.map((p) => ({
                ...p,
                // API image → local asset → PLACEHOLDER_IMG
                image: p.image || localProductImg,
              }))
            : [];
          setProducts(resolved);
        }
      })
      .catch(() => {
        if (!cancelled) setProducts(mockProducts(mockCategory, mockCount));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
};

// ─── Named hooks — one per homepage section ───────────────────────
export const useNewArrivals       = () => useProductSection(productService.getNewArrivals,       'Ravenna Leather', 4);
export const useLatestProducts    = () => useProductSection(productService.getLatestProducts,    'Royal Signature', 4);
export const usePanjabiCollection = () => useProductSection(productService.getPanjabiCollection, 'Panjabi',         4);
export const useWallets           = () => useProductSection(productService.getWallets,           'Wallet',          4);
export const useLongWallets       = () => useProductSection(productService.getLongWallets,       'Long Wallet',     3);
export const useLuxuryShirts      = () => useProductSection(productService.getLuxuryShirts,      'Luxury Shirt',    4);
export const useBelts             = () => useProductSection(productService.getBelts,             'Belt',            4);
export const useCaps              = () => useProductSection(productService.getCaps,              'Cap',             4);