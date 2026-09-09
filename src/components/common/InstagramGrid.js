import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    alt: "Dish 1",
  },
  {
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    alt: "Dish 2",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    alt: "Restaurant Ambience",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    alt: "Dining Room",
  },
  {
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    alt: "Dish 3",
  },
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
    alt: "Bar & Cocktails",
  },
];

export default function InstagramGrid() {
  return (
    <section className="py-20 bg-brand-dark">
      <div className="text-center mb-10 space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">
          Follow Along
        </p>
        <h3 className="text-2xl md:text-3xl font-serif text-brand-cream">
          @tandoorikoti
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-4 max-w-7xl mx-auto">
        {GALLERY_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="relative aspect-square overflow-hidden group bg-brand-card"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
}
