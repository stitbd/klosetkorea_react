import { useEffect, useState } from "react";
import axios from "axios";

export const useHomeData = () => {
  const [data, setData] = useState({
    categories: [],
    banners: [],
    new_arrivals: [],
    key_features: [],
  });
const API = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/home`) // your API URL
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Home API error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};