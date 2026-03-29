import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Generic data-fetching hook.
 *
 * @param {Function} fetcher  — async function that returns data
 * @param {Array}    deps     — dependency array (re-fetches when these change)
 * @returns {{ data, loading, error, refetch }}
 *
 * @example
 *   const { data, loading, error } = useFetch(() => productApi.getAll(), []);
 */
const useFetch = (fetcher, deps = []) => {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const abortRef = useRef(null);

  const execute = useCallback(async () => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);
      const result = await fetcher(abortRef.current.signal);
      setData(result);
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    execute();
    return () => abortRef.current?.abort();
  }, [execute]);

  return { data, loading, error, refetch: execute };
};

export default useFetch;
