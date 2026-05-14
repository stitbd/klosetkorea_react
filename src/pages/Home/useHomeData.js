// src/pages/Home/useHomeData.js
import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";

let homeDataCache = null;
let homeDataPromise = null;

export const useHomeData = () => {
  const [data, setData] = useState(homeDataCache || {
    featuredCategories: [],
    categories: [],
    banners: [],
    new_arrivals: [],
    key_features: [],
    gallery: [],
    testimonials: [],        // ← ADD
  });
  const [loading, setLoading] = useState(!homeDataCache);

  useEffect(() => {
    if (homeDataCache) {
      setData(homeDataCache);
      setLoading(false);
      return;
    }

    if (!homeDataPromise) {
      // ← CHANGED: fetch both /home and /reviews in parallel
      homeDataPromise = Promise.all([
        apiGet("/home"),
        apiGet("/reviews"),
      ])
        .then(([homeRes, reviewsRes]) => {
          if (!homeRes.data?.success) throw new Error("API returned success=false");

          const responseData = homeRes.data.data || {};
          const normalized = {
            about: responseData.about || {},           // ← ADD
            statistics: responseData.statistics || [], // ← ADD
            featuredCategories: responseData.featuredCategories || [],
            categories: responseData.categories || [],
            banners: responseData.banners || [],
            new_arrivals: responseData.new_arrivals || [],
            key_features: responseData.key_features || [],
            gallery: responseData.gallery || [],
            testimonials: reviewsRes.data?.data || [],
          };

          homeDataCache = normalized;
          return normalized;
        })
        .catch((err) => {
          console.error("Home API error:", err);
          return {
            about: {},        // ← ADD
            statistics: [],   // ← ADD
            featuredCategories: [],
            categories: [],
            banners: [],
            new_arrivals: [],
            key_features: [],
            gallery: [],
            testimonials: [],   // ← ADD
          };
        })
        .finally(() => { homeDataPromise = null; });
    }

    homeDataPromise
      .then((normalized) => setData(normalized))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};