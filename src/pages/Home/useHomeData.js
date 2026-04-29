// src/pages/Home/useHomeData.js
import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";

let homeDataCache = null;
let homeDataPromise = null;

export const useHomeData = () => {
  const [data, setData] = useState(homeDataCache || {
    featuredCategories: [],  // ← ADD
    categories: [],
    banners: [],
    new_arrivals: [],
    key_features: [],
  });
  const [loading, setLoading] = useState(!homeDataCache);

  useEffect(() => {
    if (homeDataCache) {
      setData(homeDataCache);
      setLoading(false);
      return;
    }

    if (!homeDataPromise) {
      homeDataPromise = apiGet("/home")
        .then((res) => {
          if (!res.data?.success) {
            throw new Error("API returned success=false");
          }

          const responseData = res.data.data || {};
          const normalized = {
            featuredCategories: responseData.featuredCategories || [],  // ← ADD
            categories: responseData.categories || [],
            banners: responseData.banners || [],
            new_arrivals: responseData.new_arrivals || [],
            key_features: responseData.key_features || [],
          };

          homeDataCache = normalized;
          return normalized;
        })
        .catch((err) => {
          console.error("Home API error:", err);
          return {
            featuredCategories: [],  // ← ADD
            categories: [],
            banners: [],
            new_arrivals: [],
            key_features: [],
          };
        })
        .finally(() => {
          homeDataPromise = null;
        });
    }

    homeDataPromise
      .then((normalized) => {
        setData(normalized);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};