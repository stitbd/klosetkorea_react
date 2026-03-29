// ─── Mock Data ────────────────────────────────────────────────────────────────
// Simulates the shape your real API should return.
// Switch to real API: set REACT_APP_USE_MOCK=false in .env
//
// ⚠️  Webpack/CRA cannot resolve dynamic import paths like:
//       `../assets/images/${name}.webp`   ← WRONG — bundle won't find it
//
//     Every image MUST be a static import at the top of the file.
//     Webpack resolves imports at BUILD TIME, not runtime.

// ─── Hero slide images ────────────────────────────────────────────────────────
import heroEid    from "../assets/images/banner.jpg";
import heroWallet from "../assets/images/banner.jpg";
import heroShirt  from "../assets/images/banner.jpg";

// ─── Product images ───────────────────────────────────────────────────────────
// Bags (New Arrivals)
import bagImg1 from "../assets/images/products/product.jpg";
import bagImg2 from "../assets/images/products/product.jpg";
import bagImg3 from "../assets/images/products/product.jpg";
import bagImg4 from "../assets/images/products/product.jpg";

// Panjabi (Eid Collection)
import panjabiImg1 from "../assets/images/products/product.jpg";
import panjabiImg2 from "../assets/images/products/product.jpg";
import panjabiImg3 from "../assets/images/products/product.jpg";
import panjabiImg4 from "../assets/images/products/product.jpg";

// Latest Products
import latestImg1 from "../assets/images/products/product.jpg";
import latestImg2 from "../assets/images/products/product.jpg";
import latestImg3 from "../assets/images/products/product.jpg";
import latestImg4 from "../assets/images/products/product.jpg";
import latestImg5 from "../assets/images/products/product.jpg";

// Wallets
import walletImg1 from "../assets/images/products/product.jpg";
import walletImg2 from "../assets/images/products/product.jpg";
import walletImg3 from "../assets/images/products/product.jpg";
import walletImg4 from "../assets/images/products/product.jpg";

// Long Wallets
import longWalletImg1 from "../assets/images/products/product.jpg";
import longWalletImg2 from "../assets/images/products/product.jpg";
import longWalletImg3 from "../assets/images/products/product.jpg";
import longWalletImg4 from "../assets/images/products/product.jpg";

// Luxury Shirts
import shirtImg1 from "../assets/images/products/product.jpg";
import shirtImg2 from "../assets/images/products/product.jpg";
import shirtImg3 from "../assets/images/products/product.jpg";
import shirtImg4 from "../assets/images/products/product.jpg";

// Belts
import beltImg1 from "../assets/images/products/product.jpg";
import beltImg2 from "../assets/images/products/product.jpg";
import beltImg3 from "../assets/images/products/product.jpg";
import beltImg4 from "../assets/images/products/product.jpg";

// Caps
import capImg1 from "../assets/images/products/product.jpg";
import capImg2 from "../assets/images/products/product.jpg";
import capImg3 from "../assets/images/products/product.jpg";
import capImg4 from "../assets/images/products/product.jpg";

// ─── Image lookup map ─────────────────────────────────────────────────────────
// Maps "prefix-index" → imported asset resolved by Webpack.
// To add a new product image: import it above, then add the key here.

const PRODUCT_IMAGES = {
  "bag-1": bagImg1, "bag-2": bagImg2, "bag-3": bagImg3, "bag-4": bagImg4,

  "panjabi-1": panjabiImg1, "panjabi-2": panjabiImg2,
  "panjabi-3": panjabiImg3, "panjabi-4": panjabiImg4,

  "latest-1": latestImg1, "latest-2": latestImg2, "latest-3": latestImg3,
  "latest-4": latestImg4, "latest-5": latestImg5,

  "wallet-1": walletImg1, "wallet-2": walletImg2,
  "wallet-3": walletImg3, "wallet-4": walletImg4,

  "longwallet-1": longWalletImg1, "longwallet-2": longWalletImg2,
  "longwallet-3": longWalletImg3,

  "shirt-1": shirtImg1, "shirt-2": shirtImg2,
  "shirt-3": shirtImg3, "shirt-4": shirtImg4,

  "belt-1": beltImg1, "belt-2": beltImg2,
  "belt-3": beltImg3, "belt-4": beltImg4,

  "cap-1": capImg1, "cap-2": capImg2,
  "cap-3": capImg3, "cap-4": capImg4,
};

/**
 * Resolve a product image from the lookup map.
 * Falls back to a hosted placeholder if the key is missing.
 * @param {string} key  e.g. "bag-1", "shirt-3"
 * @returns {string}    Webpack-resolved asset URL
 */
const getProductImage = (key) =>
  PRODUCT_IMAGES[key] ??
  "https://placehold.co/400x400/f3f4f6/9ca3af?text=Elonis";

// ─── Product factory ──────────────────────────────────────────────────────────
const makeProducts = (prefix, count, category, base = 1200) =>
  Array.from({ length: count }, (_, i) => {
    const image = getProductImage(`${prefix}-${i + 1}`);
    return {
      id:            `${prefix}-${i + 1}`,
      name:          `Elonis ${category} ${["Edition", "Collection", "Premium", "Classic", "Special"][i % 5]} ${i + 1}`,
      sku:           `SKU-${100000 + i * 3721 + base}`,
      price:         base + i * 150,
      originalPrice: i % 3 !== 0 ? base + i * 150 + 350 : null,
      image,
      images:        [image],
      category,
      badge:         i === 0 ? "New" : i === 1 ? "Sale" : i === 2 ? "Hot" : null,
      inStock:       true,
      discount:      i % 3 !== 0 ? Math.round((350 / (base + i * 150 + 350)) * 100) : null,
      description:   `Premium quality ${category} crafted with attention to detail. Perfect for everyday use.`,
      rating:        (3.5 + (i % 3) * 0.5).toFixed(1),
      reviewCount:   (i + 1) * 7,
    };
  });

// ─── MOCK_DATA ────────────────────────────────────────────────────────────────
export const MOCK_DATA = {
  heroSlides: [
    {
      id:       "slide-1",
      image:    heroEid,
      title:    "এই ঈদে পাঞ্জাবি কিনলেই ওয়ালেট ফ্রি",
      subtitle: "Eid Al-Fitr Special Collection 2026 — Limited Time Offer",
      ctaText:  "Shop Panjabi",
      ctaLink:  "/collections/panjabi",
    },
    {
      id:       "slide-2",
      image:    heroWallet,
      title:    "Premium Leather Wallets",
      subtitle: "Handcrafted. Durable. Timeless style for every occasion.",
      ctaText:  "Explore Wallets",
      ctaLink:  "/collections/wallets",
    },
    {
      id:       "slide-3",
      image:    heroShirt,
      title:    "Luxury Shirt Collection",
      subtitle: "Elevate your everyday look with premium fabrics.",
      ctaText:  "View Collection",
      ctaLink:  "/collections/luxury-shirt",
    },
  ],

  trustBadges: [
    { id: "tb1", icon: "🚚", title: "Free Delivery",  subtitle: "On orders above ৳2000"    },
    { id: "tb2", icon: "🔒", title: "Secure Payment", subtitle: "100% safe & encrypted"    },
    { id: "tb3", icon: "↩️", title: "Easy Returns",   subtitle: "7-day hassle-free policy" },
  ],

  productSections: [
    {
      id: "new-arrivals", slug: "new-arrivals", title: "New Arrivals",
      products: makeProducts("bag",        4, "Leather Bag",  3500),
    },
    {
      id: "panjabi", slug: "panjabi", title: "Eid Al-Fitr 26 Panjabi Collection",
      products: makeProducts("panjabi",    4, "Royal Panjabi", 1800),
    },
    {
      id: "latest", slug: "latest", title: "Latest Products",
      products: makeProducts("latest",     5, "Product",       1200),
    },
    {
      id: "wallets", slug: "wallets", title: "Wallets",
      products: makeProducts("wallet",     4, "Fold Wallet",    950),
    },
    {
      id: "long-wallets", slug: "long-wallets", title: "Long Wallets",
      products: makeProducts("longwallet", 3, "Long Wallet",   1100),
    },
    {
      id: "luxury-shirt", slug: "luxury-shirt", title: "Luxury Shirt",
      products: makeProducts("shirt",      4, "Luxury Shirt",  2200),
    },
    {
      id: "belts", slug: "belts", title: "Belts",
      products: makeProducts("belt",       4, "Premium Belt",   750),
    },
    {
      id: "cap", slug: "cap", title: "Cap",
      products: makeProducts("cap",        4, "Elonis Cap",      450),
    },
  ],
};