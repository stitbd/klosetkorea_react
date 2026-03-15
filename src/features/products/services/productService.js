import apiClient from '../../../services/apiClient';
import { ENDPOINTS } from '../../../services/endpoints';

export const productService = {
  getNewArrivals:      () => apiClient.get(ENDPOINTS.NEW_ARRIVALS),
  getLatestProducts:   () => apiClient.get(ENDPOINTS.LATEST_PRODUCTS),
  getPanjabiCollection:() => apiClient.get(ENDPOINTS.PANJABI_COLLECTION),
  getWallets:          () => apiClient.get(ENDPOINTS.WALLETS),
  getLongWallets:      () => apiClient.get(ENDPOINTS.LONG_WALLETS),
  getLuxuryShirts:     () => apiClient.get(ENDPOINTS.LUXURY_SHIRTS),
  getBelts:            () => apiClient.get(ENDPOINTS.BELTS),
  getCaps:             () => apiClient.get(ENDPOINTS.CAPS),
  getProductBySlug:    (slug) => apiClient.get(ENDPOINTS.PRODUCT_DETAIL(slug)),
};
