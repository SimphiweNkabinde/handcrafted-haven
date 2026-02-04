"use client";

import Link from "next/link";
{/*Image examples*/}
const items = [
  {
    src: "https://m.media-amazon.com/images/I/916jqCudJ7L._AC_SX679_.jpg",
    title: "Handcrafted with intention",
    tag: "Small batch",
  },
  {
    src: "https://alpha55.ma/cdn/shop/files/alpha-55-panier-carre-en-roseau-ninon-1174307626.jpg?v=1750423992&width=1445",
    title: "Made by artisans, not machines",
    tag: "Artisan made",
  },
  {
    src: "https://www.lifeder.com/wp-content/uploads/2020/07/barro-negro.jpg",
    title: "Slow-made, built to last",
    tag: "Slow made",
  },
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQgvV5OOLOjpJNt7tnHekCCskwk-YWQS16DXkVCTKequ8dIZms0qFwFJ3xBh0lYnIF8uwHiLUww1oBGGkwRGKblL_ybaxZ51ikIVIUbYVeRJr-LNUeup4AZataE7MlUMv24sioyaR3KL2s/s1600/Artesanias1.jpg",
    title: "Craftsmanship you can feel",
    tag: "Detail work",
  },
  {
    src: "https://thumbs.dreamstime.com/b/handmade-pottery-displayed-rustic-shelf-cozy-artisan-studio-handmade-pottery-displayed-rustic-shelf-cozy-artisan-332761112.jpg",
    title: "Pieces with a story",
    tag: "One of a kind",
  },
] as const;

const ctaBase =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition";

const ctaGhost =
  `${ctaBase} border border-neutral-200/70 bg-white/60 backdrop-blur hover:bg-white`;

const card =
  "group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)]";

function ItemCard({ src, title, tag }: { src: string; title: string; tag: string }) {
  return (
    <article className={card}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent opacity-90" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-white/85 backdrop-blur border border-white/60 text-neutral-900">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-900/70" />
          {tag}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold leading-snug text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">Handcrafted • Small batch</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-900">Discover piece</span>
        </div>
      </div>
    </article>
  );
}

export default function SectionHeading() {
  return (
    <section className="w-full px-4 py-8">
      {/* Header */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">the craft</p>
          <h2 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
            Crafted, not manufactured
          </h2>
          <p className="mt-2 max-w-xl text-sm md:text-base text-neutral-600">
            Small-batch pieces made by hand—built to last, with real materials and real intention.
          </p>
        </div>

        <Link href="/products" className={`${ctaGhost} hidden sm:inline-flex`}>
          Explore all products <span aria-hidden>→</span>
        </Link>
      </div>


      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <ItemCard key={i} {...it} />
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-6 sm:hidden">
        <Link
          href="/products"
          className={`${ctaBase} w-full justify-center bg-neutral-900 text-white hover:bg-neutral-800`}
        >
          Explore all
        </Link>
      </div>
    </section>
  );
}


