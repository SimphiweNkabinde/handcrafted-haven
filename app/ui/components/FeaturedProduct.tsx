import Link from "next/link";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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
    </div>
  );
}

export default async function FeaturedProduct() {
  // Producto con mayor rating
  const rows = await sql<{
    id: string;
    name: string;
    short_description: string | null;
    price: number | null;
    image_url: string | null;
  }[]>`
    SELECT id, name, short_description, price, image_url
    FROM products
    ORDER BY price DESC
    LIMIT 1
  `;

  if (!rows.length) return null;

  const product = rows[0];

  const featured = {
    slug: product.id,
    name: product.name,
    tagline: "Handcrafted with intention",
    description: product.short_description ?? "",
    price: `€${Number(product.price ?? 0).toFixed(2)}`,

    rating: 5,
    reviewsCount: 0,
    badges: ["Handmade", "Featured"],
    image:
      product.image_url && product.image_url.trim() !== ""
        ? product.image_url
        : "https://placehold.co/600x400/png?text=Product",
  };

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

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/products/${featured.slug}`}
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
            >
              View product →
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
            >
              Browse all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
