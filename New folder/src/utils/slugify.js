/**
 * Convert a string to a URL-safe slug.
 * @param {string} str
 * @returns {string}
 */
export const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Truncate a string to `max` characters.
 */
export const truncate = (str = "", max = 60) =>
  str.length > max ? `${str.slice(0, max)}…` : str;

/**
 * Compose class names (tiny clsx alternative).
 */
export const cn = (...classes) => classes.filter(Boolean).join(" ");
