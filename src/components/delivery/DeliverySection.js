"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { motion, useReducedMotion } from "framer-motion";
import { Banknote, CheckCircle2 } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useLanguage } from "@/context/LanguageContext";

import DeliveryMenuPicker, { MAX_PER_DISH } from "./DeliveryMenuPicker";
import DeliveryOrderPanel from "./DeliveryOrderPanel";
import DeliverySuccess from "./DeliverySuccess";
import useMenuDishes from "../menu/UseMenuDishes";
import { useApi } from "@/hooks/useApi";

const EMPTY_FORM = {
  customerName: "",
  customerPhone: "",
  deliveryAddress: "",
  postalCode: "",
  notes: "",
};

// Delivery order section. Mount it on the contact page:  <DeliverySection />
export default function DeliverySection() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const fi = lang === "fi";
  const sectionRef = useRef(null);

  const { dishes, loading, error, refetch } = useMenuDishes();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [quantities, setQuantities] = useState({}); // { [dishId]: number }
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [order, setOrder] = useState(null); // the order returned by the API after success
  const { request, isLoading } = useApi();

  const [deliverySettings, setDeliverySettings] = useState({
    isDeliveryFee: false,
    deliveryFee: 0,
    isEnableDelivery: false,
  });

  const [settingsLoaded, setSettingsLoaded] = useState(false); // CHANGED

  //   useEffect(() => {
  //     if (empty === 0) setIsEmpty((prev) => !prev);
  //     else setIsEmpty(false);
  //   });

  useEffect(() => {
    let cancelled = false;

    const fetchSettings = async () => {
      try {
        const response = await request({ url: "/settings" });

        if (cancelled) return;

        // Adjust this according to your API response structure.
        const settings = response?.data ?? response;

        setDeliverySettings({
          isDeliveryFee: Boolean(settings?.isDeliveryFee),
          isEnableDelivery: Boolean(settings?.isEnableDelivery),

          deliveryFee: Number(settings?.deliveryFee) || 0,
        });
      } catch (err) {
        console.error("Failed to fetch delivery settings:", err);
      } finally {
        // CHANGED
        if (!cancelled) setSettingsLoaded(true); // CHANGED
      }
    };

    fetchSettings();

    return () => {
      cancelled = true;
    };
  }, [request]);

  // Cart lines and the estimated total (the server recalculates the real total)
  const lines = dishes
    .filter((d) => quantities[d.id] > 0)
    .map((dish) => ({ dish, qty: quantities[dish.id] }));
  const total = lines.reduce((sum, l) => sum + Number(l.dish.price) * l.qty, 0);

  const finalTotal = useMemo(
    () =>
      total +
      (deliverySettings?.isDeliveryFee ? deliverySettings?.deliveryFee : 0),
    [total, deliverySettings?.isDeliveryFee, deliverySettings?.deliveryFee],
  );

  const changeQty = (id, delta) => {
    setQuantities((prev) => {
      const next = Math.min(MAX_PER_DISH, Math.max(0, (prev[id] || 0) + delta));
      const copy = { ...prev };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  };

  const removeDish = (id) =>
    setQuantities((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

  const handleField = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Called by the "Use my location" button; keeps what the customer typed if a part was not found
  const handleLocation = ({ deliveryAddress, postalCode }) =>
    setForm((prev) => ({
      ...prev,
      deliveryAddress: deliveryAddress || prev.deliveryAddress,
      postalCode: postalCode || prev.postalCode,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (lines.length === 0) {
      setStatus({
        state: "error",
        message: fi
          ? "Lisää vähintään yksi annos tilaukseen."
          : "Please add at least one dish.",
      });
      return;
    }
    if (!executeRecaptcha) {
      setStatus({
        state: "error",
        message: fi
          ? "Turvatarkistus latautuu vielä. Yritä hetken kuluttua uudelleen."
          : "Security verification is still loading. Please try again.",
      });
      return;
    }

    setStatus({ state: "loading", message: "" });

    try {
      // Same action name as your other forms; change it if your verifyRecaptcha checks a specific action
      const recaptchaToken = await executeRecaptcha("send_message");
      if (!recaptchaToken)
        throw new Error("Unable to generate reCAPTCHA token.");

      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
      const res = await axios.post(`${baseUrl}/delivery`, {
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        deliveryAddress: form.deliveryAddress,
        postalCode: form.postalCode,
        notes: form.notes,
        items: lines.map(({ dish, qty }) => ({ id: dish.id, quantity: qty })),
        recaptchaToken,
      });
      console.log(res);

      if (res.data?.success) {
        setOrder(res.data.data);
        setQuantities({});
        setForm(EMPTY_FORM);
        setStatus({ state: "idle", message: "" });
        // Bring the confirmation into view
        sectionRef.current?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
      }
    } catch (err) {
      const code = err.response?.status;
      let message;
      if (code === 429) {
        message = fi
          ? "Liian monta yritystä. Yritä hetken kuluttua uudelleen."
          : "Too many attempts. Please try again in a moment.";
      } else if (code === 400) {
        message = fi
          ? "Tilauksessa on virhe. Tarkista tiedot. Jokin annos ei ehkä ole enää saatavilla."
          : "There is a problem with the order. Please check your details. A dish may no longer be available.";
      } else {
        message = fi
          ? "Tilauksen lähettäminen epäonnistui. Yritä uudelleen tai soita ravintolaan."
          : "We couldn't send your order. Please try again or call the restaurant.";
      }
      setStatus({ state: "error", message });
    }
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduce ? 0 : 0.8,
      delay: reduce ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  const isClosed = settingsLoaded && !deliverySettings.isEnableDelivery;

  return (
    <section
      id="delivery"
      ref={sectionRef}
      className={`relative w-full scroll-mt-16 overflow-hidden border-y border-[#F2A93B]/15 ${
        isClosed ? "py-10 md:py-14" : "py-20 md:py-28"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(55% 55% at 90% 10%, rgba(200,50,30,.26), transparent 70%), radial-gradient(45% 45% at 5% 95%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #1C0D0A, #2A100D 50%, #170A08)",
      }}
    >
      <style>{`
        @keyframes dlShine { from { transform: translateX(-150%) skewX(-20deg); } to { transform: translateX(450%) skewX(-20deg); } }
        .dl-btn:not(:disabled):hover .dl-shine { animation: dlShine .9s ease; }
        @media (prefers-reduced-motion: reduce) { .dl-btn:hover .dl-shine { animation: none !important; } }
      `}</style>

      {/* Dot pattern, same as the other sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />
      {isClosed && (
        <div role="status" className="relative z-10 mx-auto max-w-xl px-6">
          <div className="rounded-2xl border border-[#F2A93B]/35 bg-[#1C0D0A]/80 px-6 py-8 text-center backdrop-blur-sm sm:px-8">
            <h3 className="font-serif text-xl font-bold text-brand-cream sm:text-3xl">
              {fi
                ? "Emme tällä hetkellä vastaanota kotiinkuljetustilauksia!"
                : "Currently we are not receiving any delivery request!"}
            </h3>
          </div>
        </div>
      )}

      <div
        className={`relative z-10 mx-auto max-w-7xl px-6 lg:px-8 ${
          isClosed ? "hidden" : ""
        }`}
      >
        {/* Heading */}
        <motion.div
          {...fadeUp()}
          className="mx-auto mb-12 max-w-2xl space-y-5 text-center"
        >
          <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
            {fi ? "Tilaa ruoka kotiin" : "Order food to your door"}
          </h2>
          <p className="font-sans text-lg leading-relaxed text-[#D9C6A8]">
            {fi
              ? "Valitse annokset ja jätä yhteystietosi. Ravintola vahvistaa tilauksesi, ja maksat vasta, kun ruoka saapuu."
              : "Pick your dishes and leave your details. The restaurant confirms your order, and you pay when the food arrives."}
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {[
              {
                Icon: Banknote,
                text: fi ? "Maksu toimituksessa" : "Pay on delivery",
              },
              {
                Icon: CheckCircle2,
                text: fi
                  ? "Ravintola vahvistaa tilauksen"
                  : "Restaurant confirms your order",
              },
            ].map(({ Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2 rounded-full border border-[#F2A93B]/35 bg-[#1C0D0A]/60 px-4 py-2 font-sans text-[15px] text-brand-cream backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-[#F2A93B]" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </motion.div>

        {order ? (
          <DeliverySuccess
            deliveryFee={deliverySettings?.deliveryFee}
            order={order}
            onReset={() => setOrder(null)}
          />
        ) : (
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <motion.div {...fadeUp(0.1)} className="lg:col-span-7">
              <DeliveryMenuPicker
                dishes={dishes}
                loading={loading}
                error={error}
                refetch={refetch}
                quantities={quantities}
                onChange={changeQty}
              />
            </motion.div>

            <motion.div
              {...fadeUp(0.2)}
              className="lg:sticky lg:top-24 lg:col-span-5"
            >
              <DeliveryOrderPanel
                lines={lines}
                total={finalTotal}
                onRemove={removeDish}
                form={form}
                onField={handleField}
                onSubmit={handleSubmit}
                status={status}
                onLocation={handleLocation}
              />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
