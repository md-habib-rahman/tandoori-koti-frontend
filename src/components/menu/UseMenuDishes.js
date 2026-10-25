"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Loads the full à la carte catalog. Returns { dishes, loading, error, refetch }.
export default function useMenuDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
      const response = await axios.get(`${baseUrl}/menu/regular`);

      let items = [];
      if (Array.isArray(response.data)) {
        items = response.data;
      } else if (Array.isArray(response.data?.data)) {
        items = response.data.data;
      } else if (Array.isArray(response.data?.dishes)) {
        items = response.data.dishes;
      }

      setDishes(items);
    } catch (err) {
      console.error(
        "Failed to fetch menu items with Axios:",
        err?.response?.data || err.message,
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return { dishes, loading, error, refetch: fetchDishes };
}
