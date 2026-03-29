import { useState, useEffect } from "react";

/**
 * Debounce a value — useful for search inputs.
 *
 * @param {*}      value
 * @param {number} delay  milliseconds
 * @returns {*} debounced value
 *
 * @example
 *   const debouncedQuery = useDebounce(searchQuery, 400);
 */
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
