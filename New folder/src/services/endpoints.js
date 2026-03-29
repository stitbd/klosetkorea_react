// ─── API Endpoint Definitions ─────────────────────────────────────────────────
// Centralising endpoints makes it trivial to update base paths or versioning.

export const ENDPOINTS = {
  // Home
  HOME_SECTIONS: "/home/sections",

  // Products
  PRODUCTS:      "/products",
  PRODUCT:       (id) => `/products/${id}`,

  // Categories
  CATEGORIES:    "/categories",
  CATEGORY:      (slug) => `/categories/${slug}`,

  // Cart
  CART:          "/cart",
  CART_ITEM:     (id) => `/cart/items/${id}`,

  // Auth
  LOGIN:         "/auth/login",
  REGISTER:      "/auth/register",
  LOGOUT:        "/auth/logout",
  ME:            "/auth/me",

  // Search
  SEARCH:        "/search",
};
