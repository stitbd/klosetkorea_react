/**
 * Format a number as Bangladeshi Taka.
 * @param {number} amount
 * @returns {string}  e.g. "৳ 1,200"
 */
export const formatCurrency = (amount) =>
  `৳ ${Number(amount).toLocaleString("en-BD")}`;

/**
 * Calculate discount percentage.
 */
export const calcDiscount = (original, current) =>
  Math.round(((original - current) / original) * 100);

/**
 * Truncate a string to `max` characters.
 */
export const truncate = (str = "", max = 60) =>
  str.length > max ? str.slice(0, max) + "…" : str;

/**
 * Class name composer (tiny clsx alternative).
 */
export const cn = (...classes) => classes.filter(Boolean).join(" ");
