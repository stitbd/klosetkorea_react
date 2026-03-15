// formatPrice.js
export const formatPrice = (amount, currency = '৳') =>
  `${currency}${Number(amount).toLocaleString('bn-BD')}`;

// constants.js
export const PLACEHOLDER_IMG = 'https://placehold.co/400x400/f0f0f0/aaa?text=Elonis';
export const SITE_NAME       = 'Elonis';
export const PHONE           = '+88 01886 899103';

// slugify.js
export const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
