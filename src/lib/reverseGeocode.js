// Save as: src/lib/reverseGeocode.js
//
// Turns coordinates into a street address and postal code with OpenStreetMap's free Nominatim service.
// Nominatim is meant for light use (about one request per second, no heavy traffic). That is plenty for
// a button that a customer taps once. If the restaurant grows, swap this one function for a paid
// provider (Google, Mapbox, Geoapify...); nothing else in the app needs to change.

export async function reverseGeocode(latitude, longitude, lang = "fi", signal) {
  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(latitude),
    lon: String(longitude),
    zoom: "18",
    addressdetails: "1",
    "accept-language": lang,
  });

  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params}`,
    {
      signal,
      headers: { Accept: "application/json" },
    },
  );
  if (!res.ok) throw new Error("GEOCODE_FAILED");

  const data = await res.json();
  const a = data.address || {};

  const road = a.road || a.pedestrian || a.footway || a.path || "";
  const street = [road, a.house_number].filter(Boolean).join(" ");

  // Finnish postal codes are exactly 5 digits
  const postcode = a.postcode ? String(a.postcode).replace(/\s/g, "") : "";

  return {
    street,
    postalCode: /^\d{5}$/.test(postcode) ? postcode : "",
    city: a.city || a.town || a.village || a.municipality || "",
  };
}
