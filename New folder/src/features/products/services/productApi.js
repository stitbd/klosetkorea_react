import apiClient from "../../../services/apiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import { USE_MOCK }   from "../../../utils/constants";
import { MOCK_DATA }  from "../../../utils/mockData";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

// ─── Product API ──────────────────────────────────────────────────────────────
// Each method checks USE_MOCK and falls back to mock data in development.
// To connect a real API: set REACT_APP_USE_MOCK=false in .env

export const productApi = {
  /** Fetch all homepage data in one call */
  async getHomeSections() {
    if (USE_MOCK) { await delay(); return MOCK_DATA; }
    return apiClient.get(ENDPOINTS.HOME_SECTIONS);
  },

  /** Fetch products for a specific section/category */
  async getSectionProducts(slug, params = {}) {
    if (USE_MOCK) {
      await delay(200);
      return MOCK_DATA.productSections.find((s) => s.slug === slug)?.products ?? [];
    }
    return apiClient.get(ENDPOINTS.PRODUCTS, { params: { category: slug, ...params } });
  },

  /** Fetch a single product by ID */
  async getProduct(id) {
    if (USE_MOCK) {
      await delay(250);
      const all = MOCK_DATA.productSections.flatMap((s) => s.products);
      return all.find((p) => p.id === id) ?? null;
    }
    return apiClient.get(ENDPOINTS.PRODUCT(id));
  },

  /** Search products */
  async search(query, params = {}) {
    if (USE_MOCK) {
      await delay(200);
      const all = MOCK_DATA.productSections.flatMap((s) => s.products);
      return all.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return apiClient.get(ENDPOINTS.SEARCH, { params: { q: query, ...params } });
  },
};
