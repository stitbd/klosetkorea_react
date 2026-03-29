import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { PLACEHOLDER_IMG } from '../../../utils';

// ─── CORRECT: Static import — Vite resolves at build time ─────────
// require() does NOT work in Vite (ES modules only).
// Use static import instead. If the file is missing, Vite shows a
// build warning but won't crash at runtime — the import resolves to
// undefined which we handle below.
import productImgAsset  from '../../../assets/images/products/product.jpg';
import img01 from '../../../assets/images/products/01.jpg';
import img02 from '../../../assets/images/products/02.jpg';
import img03 from '../../../assets/images/products/03.jpg';
import img04 from '../../../assets/images/products/04.jpg';
import img05 from '../../../assets/images/products/05.jpg';
import img06 from '../../../assets/images/products/06.jpg';
import img07 from '../../../assets/images/products/07.jpg';

// ─── Image pool — all local product images ────────────────────────
const IMG_POOL = [
  productImgAsset, img01, img02, img03, img04, img05, img06, img07,
].filter(Boolean);

const localProductImg = IMG_POOL[0] || PLACEHOLDER_IMG;
const getPoolImg = (i) => IMG_POOL.length ? IMG_POOL[i % IMG_POOL.length] : PLACEHOLDER_IMG;

// ─── Mock data for development ────────────────────────────────────
const mockProducts = (category, count = 4) =>
  Array.from({ length: count }, (_, i) => {
    const orig    = Math.floor(Math.random() * 1500) + 800;
    const discPct = [20, 25, 30, 33][Math.floor(Math.random() * 4)];
    const price   = Math.round(orig * (1 - discPct / 100) / 5) * 5;
    return {
      id:            `${category}-${i + 1}`,
      name:          `Elonis ${category} #${i + 1}`,
      slug:          `elonis-${category.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      sku:           `MU-00${100 + i}`,
      price,
      originalPrice: orig,
      image:         getPoolImg(i),
      badge:         `${discPct}% Off`,
      category,
      inStock:       true,
    };
  });

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
            ? data.map((p, i) => ({
                ...p,
                // API image → pool image → PLACEHOLDER_IMG
                image: p.image || getPoolImg(i),
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

// ─── Generic category hook — used by CatagoryProductPage ─────────
export const useCategoryProducts = (category = 'Products', count = 28) => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    productService.getCategoryProducts?.(category)
      .then((res) => {
        if (!cancelled) {
          const data = res?.data ?? res ?? [];
          const resolved = Array.isArray(data) && data.length > 0
            ? data.map((p, i) => ({ ...p, image: p.image || getPoolImg(i) }))
            : mockProducts(category, count);
          setProducts(resolved);
        }
      })
      .catch(() => {
        if (!cancelled) setProducts(mockProducts(category, count));
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [category]);

  return { products, loading };
};

// ─── Named hooks — one per homepage section ───────────────────────
export const useNewArrivals       = () => useProductSection(productService.getNewArrivals,       'Ravenna Leather', 20);
export const usePanjabiCollection = () => useProductSection(productService.getPanjabiCollection, 'Panjabi',         20);
export const useWallets           = () => useProductSection(productService.getWallets,           'Wallet',          20);
export const useLongWallets       = () => useProductSection(productService.getLongWallets,       'Long Wallet',     20);
export const useLuxuryShirts      = () => useProductSection(productService.getLuxuryShirts,      'Luxury Shirt',    20);
export const useBelts             = () => useProductSection(productService.getBelts,             'Belt',            20);
export const useCaps              = () => useProductSection(productService.getCaps,              'Cap',             20);