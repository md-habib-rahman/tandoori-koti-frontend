"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reverseGeocode } from "@/lib/reverseGeocode";

// Save as: src/hooks/useDeviceAddress.js
//
//   const geo = useDeviceAddress(lang);
//   geo.locate(({ street, postalCode, city, latitude, longitude, accuracy }) => { ...fill the form... });
//
// geo.status: "idle" | "locating" | "done" | "error"
// geo.error:  "UNSUPPORTED" | "DENIED" | "UNAVAILABLE" | "TIMEOUT" | "NO_ADDRESS" | "GEOCODE_FAILED" | null
//
// Call locate() from a button tap only. Browsers expect a clear user action before asking for location,
// and the page must be served over HTTPS (localhost also works).

export default function useDeviceAddress(lang = "fi") {
  const [state, setState] = useState({ status: "idle", error: null });
  const abortRef = useRef(null);

  // Cancel a pending address lookup if the component goes away
  useEffect(() => () => abortRef.current?.abort(), []);

  const locate = useCallback(
    (onFound) => {
      if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
        setState({ status: "error", error: "UNSUPPORTED" });
        return;
      }

      setState({ status: "locating", error: null });

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          abortRef.current?.abort();
          abortRef.current = new AbortController();

          try {
            const address = await reverseGeocode(
              latitude,
              longitude,
              lang,
              abortRef.current.signal,
            );

            if (!address.street && !address.postalCode) {
              setState({ status: "error", error: "NO_ADDRESS" });
              return;
            }

            onFound({ ...address, latitude, longitude, accuracy });
            setState({ status: "done", error: null });
          } catch (err) {
            if (err.name === "AbortError") return;
            setState({ status: "error", error: "GEOCODE_FAILED" });
          }
        },
        (err) => {
          const codes = { 1: "DENIED", 2: "UNAVAILABLE", 3: "TIMEOUT" };
          setState({
            status: "error",
            error: codes[err.code] || "UNAVAILABLE",
          });
        },
        // Fresh, accurate reading, but accept a cached one up to a minute old
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      );
    },
    [lang],
  );

  return { ...state, locate };
}
