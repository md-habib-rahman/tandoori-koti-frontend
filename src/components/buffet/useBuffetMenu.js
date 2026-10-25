"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Save as: src/hooks/useBuffetMenu.js
// Returns { days, loading, error, isWeekend, refetch }.
// Each day: { id, key, fi, en, formattedDate, iso, isToday, dishes }.

const TZ = "Europe/Helsinki";

const DAY_NAMES = {
  0: { fi: "Sunnuntai", en: "Sunday", key: "sun" },
  1: { fi: "Maanantai", en: "Monday", key: "mon" },
  2: { fi: "Tiistai", en: "Tuesday", key: "tue" },
  3: { fi: "Keskiviikko", en: "Wednesday", key: "wed" },
  4: { fi: "Torstai", en: "Thursday", key: "thu" },
  5: { fi: "Perjantai", en: "Friday", key: "fri" },
  6: { fi: "Lauantai", en: "Saturday", key: "sat" },
};

// "YYYY-MM-DD" in Finnish time
const toFinnishIso = (date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(date);

// Accepts "2026-10-02", "2026-10-02T00:00:00Z" or any Date-parsable value
function toIso(value) {
  if (!value) return null;
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return `${match[1]}-${match[2]}-${match[3]}`;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : toFinnishIso(d);
}

function getFinnishWeekday(date) {
  const short = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
  }).format(date);
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[short];
}

export default function useBuffetMenu() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isWeekend, setIsWeekend] = useState(false);

  const fetchBuffet = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const now = new Date();
      const todayIso = toFinnishIso(now);
      const weekday = getFinnishWeekday(now);
      setIsWeekend(weekday === 0 || weekday === 6);

      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
      const res = await axios.get(`${baseUrl}/menu/buffet`);
      const rawData = res.data?.data || res.data || {};

      const entries = Array.isArray(rawData)
        ? rawData
        : Object.entries(rawData).map(([key, val]) => ({
            dateKey: key,
            ...(typeof val === "object" ? val : { dishes: val }),
          }));

      const normalized = entries.map((item, index) => {
        const iso = toIso(item.date || item.dateKey);
        const dayIndex = iso
          ? new Date(`${iso}T12:00:00Z`).getUTCDay()
          : item.dayIndex !== undefined
            ? item.dayIndex
            : index + 1;

        const dayInfo = DAY_NAMES[dayIndex] || {
          fi: `Päivä ${index + 1}`,
          en: `Day ${index + 1}`,
          key: `day-${index}`,
        };

        const formattedDate = iso
          ? `${iso.slice(8, 10)}.${iso.slice(5, 7)}.`
          : "";

        return {
          id: item.id || item._id || iso || `day-${index}`,
          key: dayInfo.key,
          fi: dayInfo.fi,
          en: dayInfo.en,
          formattedDate,
          iso,
          isToday: iso === todayIso,
          dishes: Array.isArray(item.dishes) ? item.dishes : [],
        };
      });

      // Chronological order; entries without a date keep their original order at the end
      normalized.sort((a, b) => {
        if (a.iso && b.iso) return a.iso.localeCompare(b.iso);
        if (a.iso) return -1;
        if (b.iso) return 1;
        return 0;
      });

      setDays(normalized);
    } catch (err) {
      console.error("Error loading buffet menu:", err);
      setError(true);
      setDays([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBuffet();
  }, [fetchBuffet]);

  return { days, loading, error, isWeekend, refetch: fetchBuffet };
}
