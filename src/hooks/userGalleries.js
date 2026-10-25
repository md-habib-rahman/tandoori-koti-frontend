"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Save as: src/hooks/useReviews.js
// Returns { reviews, summary, loading, error }
//   reviews  the latest published reviews (at most 6), newest first
//   summary  { googleRating, googleReviewCount, googleReviewsUrl } or null

export default function useReviews() {
  const [state, setState] = useState({
    reviews: [],
    summary: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
        const res = await axios.get(`${baseUrl}/instagram`);
        if (cancelled) return;

        setState({
          reviews: Array.isArray(res.data?.data) ? res.data.data : [],
          summary: res.data?.summary || null,
          loading: false,
          error: false,
        });
      } catch (err) {
        console.error(
          "Failed to load Instagram Photos:",
          err?.response?.data || err.message,
        );
        if (!cancelled)
          setState({ reviews: [], summary: null, loading: false, error: true });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
