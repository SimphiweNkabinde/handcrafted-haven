import { fetchTopReviews } from "@/app/lib/data";
import { StarIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < rating ? "text-yellow-400" : "text-neutral-300"
            }`}
        >
          <StarIcon className="w-4" />
        </span>
      ))}
    </div>
  );
}

export default async function ProductReviews() {

  const reviews = await fetchTopReviews()

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

            <p className="mt-4 font-semibold text-sm leading-relaxed text-neutral-800">
              {review.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              “{review.body}”
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-neutral-900 capitalize">
                {review.username}
              </p>

              <Link href={`/products/${review.product_id}`} className="text-xs text-neutral-500 hover:text-blue-400 underline text-right">
                {review.product_name}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
