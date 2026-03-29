import { CURRENCY } from "./constants";

/**
 * Format a number as Bangladeshi Taka.
 * @param {number} amount
 * @returns {string}  e.g. "৳ 1,200"
 */
export const formatPrice = (amount) =>
  `${CURRENCY} ${Number(amount).toLocaleString("en-BD")}`;

/**
 * Calculate discount percentage between original and sale price.
 * @param {number} original
 * @param {number} current
 * @returns {number} e.g. 25
 */
export const calcDiscount = (original, current) =>
  Math.round(((original - current) / original) * 100);
