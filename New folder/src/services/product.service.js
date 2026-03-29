import api from "./api.service";
import { MOCK_SECTIONS } from "../utils/mockData";

// ─── Product Service ─────────────────────────────────────────────────────────
// All methods return Promises, making it trivial to swap mocks → real API.

const USE_MOCK = process.env.REACT_APP_USE_MOCK !== "false";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const productService = {
  /** Fetch homepage sections (hero + product rows) */
  async getHomeSections() {
    if (USE_MOCK) {
      await delay();
      return MOCK_SECTIONS;
    }
    return api.get("/home/sections");
  },

  /** Fetch a single section by slug */
  async getSectionProducts(slug, params = {}) {
    if (USE_MOCK) {
      await delay(200);
      const section = MOCK_SECTIONS.productSections.find((s) => s.slug === slug);
      return section?.products ?? [];
    }
    return api.get(`/products`, { params: { category: slug, ...params } });
  },

  /** Fetch product detail */
  async getProduct(id) {
    if (USE_MOCK) {
      await delay(300);
      const all = MOCK_SECTIONS.productSections.flatMap((s) => s.products);
      return all.find((p) => p.id === id) ?? null;
    }
    return api.get(`/products/${id}`);
  },

  /** Add to cart */
  async addToCart(productId, qty = 1) {
    if (USE_MOCK) { await delay(150); return { success: true }; }
    return api.post("/cart/items", { productId, qty });
  },
};
