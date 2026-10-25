"use client";

import { useEffect, useMemo, useState } from "react";
import MenuShowcaseBlock from "./MenuShowcaseBlock.js";
import { SHOWCASE_SECTIONS } from "./data/menuShowcase";

// The three editorial blocks (starters, mains, vegetarian and seafood).
// Every second block is flipped so the photos alternate sides.
export default function MenuShowcase() {
  const [sections, setSections] = useState(SHOWCASE_SECTIONS);
  useEffect(() => {
    const shuffled = [...SHOWCASE_SECTIONS];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setSections(shuffled);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(50% 40% at 90% 15%, rgba(200,50,30,.22), transparent 70%), radial-gradient(45% 40% at 5% 85%, rgba(242,169,59,.12), transparent 70%), linear-gradient(180deg, #1C0D0A, #170A08)",
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

      <div className="relative z-10 mx-auto max-w-6xl space-y-24 px-4 sm:px-6 md:space-y-32 lg:px-8">
        {sections.map((section, index) => (
          <MenuShowcaseBlock
            key={section.id}
            section={section}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
