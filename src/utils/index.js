// formatPrice.js
export const formatPrice = (amount, currency = '৳') =>
  `${currency}${Number(amount).toLocaleString('en-US')}`;

// constants.js
export const BASE_IMAGE_URL = "https://admin-klosetkorea.stitbd.app/";
export const BASE_URL = "https://admin-klosetkorea.stitbd.app/";
export const API_BASE_URL = "https://admin-klosetkorea.stitbd.app/api";
export const PLACEHOLDER_IMG = new URL('../assets/images/placehold.jpg', import.meta.url).href;
export const CALCULATE_API = 'https://admin-klosetkorea.stitbd.app/api/cart/calculate';

export const SITE_NAME = 'Kloset Korea';
export const PHONE = '+88 01757-769498';

if (window.location.hostname === "www.admin-klosetkorea.stitbd.app") {
  window.location.replace("https://admin-klosetkorea.stitbd.app" + window.location.pathname);
}