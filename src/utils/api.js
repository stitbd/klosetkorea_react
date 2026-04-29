import axios from 'axios';

const normalizeBaseUrl = (value) => {
  if (!value || typeof value !== 'string') return null;
  return value.trim().replace(/\/+$/, '');
};

const toApiBaseUrl = (value) => {
  const normalized = normalizeBaseUrl(value);
  if (!normalized) return null;
  return /\/api$/i.test(normalized) ? normalized : `${normalized}/api`;
};

const getApiBaseCandidates = () => {
  const candidates = [
    toApiBaseUrl(import.meta.env.VITE_API_URL),
    toApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
  ];

  if (typeof window !== 'undefined') {
    candidates.push(toApiBaseUrl(window.location.origin));
  }

  return [...new Set(candidates.filter(Boolean))];
};

const isRetriableNetworkError = (error) =>
  error?.code === 'ERR_NETWORK' ||
  error?.message === 'Network Error' ||
  (!error?.response && !!error?.request);

export const apiRequest = async (config) => {
  const { url, baseURL, ...rest } = config;

  if (!url) {
    throw new Error('apiRequest requires a url.');
  }

  if (baseURL || /^https?:\/\//i.test(url)) {
    return axios({ ...rest, baseURL, url });
  }

  const endpoint = url.startsWith('/') ? url : `/${url}`;
  const baseCandidates = getApiBaseCandidates();
  let lastError = null;

  for (const candidate of baseCandidates) {
    try {
      return await axios({
        ...rest,
        baseURL: candidate,
        url: endpoint,
      });
    } catch (error) {
      lastError = error;
      if (!isRetriableNetworkError(error)) break;
    }
  }

  throw lastError ?? new Error(`Request failed for ${endpoint}`);
};

export const apiGet = (url, config = {}) =>
  apiRequest({ ...config, method: 'get', url });

export const apiPost = (url, data, config = {}) =>
  apiRequest({ ...config, method: 'post', url, data });

