import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09464.jpg",
    alt: "Dish 1",
  },
  {
    src: "https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09469.jpg",
    alt: "Dish 2",
  },
  {
    src: "https://res.cloudinary.com/vbi0knds/image/upload/v1788797208/Ravintola_Tandoori_Koti.jpg",
    alt: "Restaurant Ambience",
  },
  {
    src: "https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09463.jpg",
    alt: "Dining Room",
  },
  {
    src: "https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09450.jpg",
    alt: "Dish 3",
  },
  {
    src: "https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09457.jpg",
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
