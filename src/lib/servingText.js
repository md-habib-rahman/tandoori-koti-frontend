// Save as: src/lib/servingText.js
//
// Turns the serving fields of a dish into one line of text:
//   servingText({ servings: 2, portionLabelEn: "6 pcs" }, "en")  ->  "Serves 2 · 6 pcs"
//   servingText({ servings: 2, portionLabelFi: "6 kpl" }, "fi")  ->  "2 hengelle · 6 kpl"
// Returns "" when the dish has no serving info, so callers can simply hide the badge.

export function servingText(dish, lang = "fi") {
  if (!dish) return "";

  const n = Number(dish.servings);
  const hasServings = Number.isInteger(n) && n > 0;

  // Use the language's own label, and fall back to the other one if only that was filled in
  const label =
    lang === "fi"
      ? dish.portionLabelFi || dish.portionLabelEn
      : dish.portionLabelEn || dish.portionLabelFi;

  return [
    hasServings ? (lang === "fi" ? `${n} hengelle` : `Serves ${n}`) : null,
    label || null,
  ]
    .filter(Boolean)
    .join(" · ");
}
