export const ENDPOINTS = {
  // Products
  PRODUCTS:          '/products',
  PRODUCT_DETAIL:    (slug) => `/products/${slug}`,
  NEW_ARRIVALS:      '/products?tag=new_arrivals&limit=8',
  LATEST_PRODUCTS:   '/products?tag=latest&limit=8',
  FEATURED:          '/products?featured=true&limit=8',

  // Categories
  CATEGORIES:        '/categories',
  CATEGORY_PRODUCTS: (slug) => `/categories/${slug}/products`,

  // Collections
  PANJABI_COLLECTION: '/products?category=panjabi&tag=eid26&limit=8',
  WALLETS:            '/products?category=wallet&limit=8',
  LONG_WALLETS:       '/products?category=long-wallet&limit=8',
  LUXURY_SHIRTS:      '/products?category=luxury-shirt&limit=8',
  BELTS:              '/products?category=belt&limit=8',
  CAPS:               '/products?category=cap&limit=8',

  // Cart & Auth
  CART:              '/cart',
  AUTH_LOGIN:        '/auth/login',
  AUTH_REGISTER:     '/auth/register',
  AUTH_ME:           '/auth/me',
};
