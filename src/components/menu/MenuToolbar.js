"use client";

import { Search, X } from "lucide-react";

// Search box and category pills. Sticks under the navbar while the list scrolls.
// Note: sticky only works if no parent element has overflow-hidden.
export default function MenuToolbar({
  search,
  onSearchChange,
  categories,
  selected,
  onSelect,
  searchPlaceholder,
  searchLabel,
  clearLabel,
}) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-[#F2A93B]/15 bg-[#1C0D0A]/85 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-4">
        {/* Search */}
        <div className="relative mx-auto max-w-lg">
          <label htmlFor="menu-search" className="sr-only">
            {searchLabel}
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#F2A93B]"
            aria-hidden="true"
          />
          <input
            id="menu-search"
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-[#F2A93B]/30 bg-[#1C0D0A]/80 py-3 pr-11 pl-12 font-sans text-base text-brand-cream placeholder:text-[#D9C6A8]/50 transition-colors duration-300 hover:border-[#F2A93B]/50 focus:border-[#F2A93B] focus:ring-2 focus:ring-[#F2A93B]/30 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label={clearLabel}
              className="absolute top-1/2 right-3 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-[#D9C6A8] transition-colors hover:bg-[#F2A93B]/15 hover:text-[#F2A93B] focus-visible:outline-2 focus-visible:outline-[#F2A93B]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category pills: swipe sideways on mobile, wrap on larger screens */}
        <div
          role="group"
          className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat) => {
            const active = selected === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelect(cat.id)}
                aria-pressed={active}
                className={`shrink-0 snap-start rounded-full border px-5 py-2.5 font-sans text-[15px] font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B] ${
                  active
                    ? "border-[#F2A93B] bg-[#F2A93B] text-[#2A1206] shadow-md shadow-[#F2A93B]/20"
                    : "border-[#F2A93B]/25 bg-[#1C0D0A]/60 text-brand-cream hover:-translate-y-0.5 hover:border-[#F2A93B]/60 hover:text-[#F2A93B]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
