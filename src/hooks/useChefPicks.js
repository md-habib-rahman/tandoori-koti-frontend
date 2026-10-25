"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Save as: src/hooks/useChefPicks.js
// Returns { picks, loading, error }. `picks` is an array of dishes in the order the staff chose.

export default function useChefPicks() {
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
        const res = await axios.get(`${baseUrl}/menu/chef-picks`);

        const items = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        if (!cancelled) setPicks(items);
      } catch (err) {
        console.error(
          "Failed to load chef's picks:",
          err?.response?.data || err.message,
        );
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { picks, loading, error };
}
