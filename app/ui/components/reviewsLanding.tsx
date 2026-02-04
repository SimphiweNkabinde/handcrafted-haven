"use client";

const reviews = [
  {
    name: "Emily R.",
    location: "Dublin, IE",
    rating: 5,
    text: "You can feel the care in every detail. It doesn’t feel mass-produced at all — the craftsmanship really shows.",
    product: "Handcrafted ceramic bowl",
  },
  {
    name: "James L.",
    location: "Cork, IE",
    rating: 5,
    text: "Beautifully made. The materials feel solid and intentional. I’ve been using it daily and it still looks perfect.",
    product: "Small batch textile piece",
  },
  {
    name: "Sofia M.",
    location: "Galway, IE",
    rating: 4,
    text: "I loved knowing how it was made. It feels personal, like owning something with a story behind it.",
    product: "Artisan home object",
  },
  {
    name: "Hannah T.",
    location: "London, UK",
    rating: 5,
    text: "The quality exceeded my expectations. You can tell it was made slowly and with real attention to detail.",
    product: "Handcrafted wooden tray",
  },
  {
    name: "Oliver K.",
    location: "Brighton, UK",
    rating: 4,
    text: "I appreciate that no two pieces are exactly the same. It makes it feel truly unique.",
    product: "One-of-a-kind ceramic piece",
  },
] as const;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm ${
            i < rating ? "text-yellow-400" : "text-neutral-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductReviews() {
  return (
    <section className="w-full px-4 py-16">
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          reviews
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
          Loved by our customers
        </h2>
        <p className="mt-3 text-neutral-600">
          Honest feedback from people who value craftsmanship and handmade work.
        </p>
      </div>

      {/* Grid (máx 4 reviews) */}
      <div className="grid gap-6 sm:grid-cols-2">
        {reviews.slice(0, 4).map((review, i) => (
          <article
            key={i}
            className="
              rounded-2xl border border-neutral-200/70
              bg-white p-6
              shadow-sm
            "
          >
            <Stars rating={review.rating} />

            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              “{review.text}”
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  {review.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {review.location}
                </p>
              </div>

              <span className="text-xs text-neutral-500 text-right">
                {review.product}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
