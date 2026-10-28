"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useApi } from "@/hooks/useApi";

// Used until the API responds, or if it fails.
// Same shape as DEFAULT_SETTINGS on the backend.
const DEFAULT_SETTINGS = {
  isDeliveryFee: false,
  isEnableDelivery: false,
  deliveryFee: null,
  isVat: false,
  VatAmount: null,
  isTax: false,
  taxAmount: null,
  isServiceCharge: false,
  serviceChargeAmount: null,
  lunchBuffetPrice: null,
  lunchChildPrice: null,
  luchTakewayPrice: null,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const { request } = useApi();

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const res = await request({ url: "/settings", method: "GET" });
      setSettings({ ...DEFAULT_SETTINGS, ...res.data });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Lets the dashboard form push the saved record in directly,
  // so no second GET is needed after a PUT.
  const updateLocal = useCallback((data) => {
    setSettings({ ...DEFAULT_SETTINGS, ...data });
  }, []);

  const value = useMemo(
    () => ({ settings, loading, error, refresh, updateLocal }),
    [settings, loading, error, refresh, updateLocal],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used inside <SettingsProvider>.");
  }
  return ctx;
}
