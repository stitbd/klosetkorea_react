import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHomeSections,
  selectHeroSlides,
  selectTrustBadges,
  selectProductSections,
  selectProductsStatus,
  selectProductsError,
} from "../productSlice";

/**
 * useProducts — ViewModel hook for the home page product data.
 *
 * Dispatches fetchHomeSections on first mount (or when stale).
 * Returns derived, ready-to-consume state for View components.
 *
 * @example
 *   const { productSections, loading, error, retry } = useProducts();
 */
const useProducts = () => {
  const dispatch = useDispatch();
  const status   = useSelector(selectProductsStatus);

  useEffect(() => {
    // Only fetch once — Redux prevents duplicate requests
    if (status === "idle") dispatch(fetchHomeSections());
  }, [status, dispatch]);

  return {
    heroSlides:      useSelector(selectHeroSlides),
    trustBadges:     useSelector(selectTrustBadges),
    productSections: useSelector(selectProductSections),
    loading:         status === "loading" || status === "idle",
    error:           useSelector(selectProductsError),
    retry:           () => dispatch(fetchHomeSections()),
  };
};

export default useProducts;
