// Finnish: "7,00 €"   English: "€7.00"
export function formatPrice(price, lang) {
  const n = Number(price);
  if (!Number.isFinite(n)) return "";
  const s = n.toFixed(2);
  return lang === "fi" ? `${s.replace(".", ",")} €` : `€${s}`;
}
