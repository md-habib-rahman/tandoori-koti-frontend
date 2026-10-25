"use client";

import BuffetIncludes from "./BuffetIncludes";
import BuffetPricing from "./BuffetPricing";

// Two columns: what the buffet includes, and what it costs.
export default function BuffetDetails() {
  return (
    <section
      className="relative w-full overflow-hidden border-y border-[#F2A93B]/15 py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(55% 55% at 15% 20%, rgba(200,50,30,.26), transparent 70%), radial-gradient(40% 40% at 95% 95%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #170A08, #2A100D 50%, #1C0D0A)",
      }}
    >
      {/* Dot pattern, same as the other sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #F2A93B 1.5px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6">
          <BuffetIncludes />
        </div>
        <div className="lg:col-span-6">
          <BuffetPricing />
        </div>
      </div>
    </section>
  );
}
