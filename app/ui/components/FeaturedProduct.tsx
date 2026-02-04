"use client";

import Link from "next/link";

const featured = {
  slug: "artisan-ceramic-bowl",
  name: "Artisan Ceramic Bowl",
  tagline: "Handcrafted with intention",
  description:
    "A small-batch piece shaped and finished by hand. Durable, functional, and made to be used every day — not just displayed.",
  price: "€48",
  rating: 5,
  reviewsCount: 124,
  badges: ["Small batch", "Handmade", "Limited run"],
  image:
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
} as const;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < rating ? "text-yellow-400" : "text-neutral-300"}`}
          aria-hidden
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-xs text-neutral-500">
        {featured.reviewsCount} reviews
      </span>
    </div>
  );
}

export default function FeaturedProduct() {
  return (
    <section id="featured" className="w-full px-4 py-16 scroll-mt-24">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white shadow-sm">
          <div className="relative aspect-[4/3]">
            <img
              src={featured.image}
              alt={featured.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
          </div>

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {featured.badges.map((b) => (
              <span
                key={b}
                className="rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-medium text-neutral-900 border border-white/60"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            featured piece
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
            {featured.name}
          </h2>
          <p className="mt-2 text-neutral-600">{featured.tagline}</p>

          <div className="mt-4">
            <Stars rating={featured.rating} />
          </div>

          <p className="mt-5 text-sm md:text-base leading-relaxed text-neutral-700 max-w-prose">
            {featured.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-lg font-semibold text-neutral-900">
              {featured.price}
            </span>
            <span className="text-sm text-neutral-500">• Free returns</span>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/products/${featured.slug}`}
              className="
                inline-flex items-center justify-center rounded-md
                bg-neutral-900 px-5 py-3 text-sm font-semibold text-white
                hover:bg-neutral-800 transition
              "
            >
              View product <span className="ml-2" aria-hidden>→</span>
            </Link>

            <Link
              href="/products"
              className="
                inline-flex items-center justify-center rounded-md
                border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900
                hover:bg-neutral-50 transition
              "
            >
              Browse all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
