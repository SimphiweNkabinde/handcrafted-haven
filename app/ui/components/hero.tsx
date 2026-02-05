import Link from "next/link";
import Button from "../button";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-50 to-white" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 py-12 md:min-h-[78vh] md:grid-cols-2 md:py-0">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Small batches • Crafted by hand
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl leading-tight">
              Handmade <span className="text-zinc-900/70">with intention</span>
            </h1>

            <p className="max-w-md text-base leading-relaxed text-zinc-600 sm:text-lg">
              Thoughtfully crafted pieces made to last. No mass production—just
              quality you can feel.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/products" className="w-full sm:w-auto">
                <Button>Explore Products</Button>
              </Link>

              <Link
                href="#the-craft"
                className=" inline-flex w-full items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 sm:w-auto"
              >
                How it’s made →
              </Link>
            </div>
          </div>

          <div className="relative md:justify-self-end">
            <div className="absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-tr from-zinc-200/50 via-white to-zinc-200/30 blur-2xl md:-inset-4" />

            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] md:shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
              <img
                src="/hero.webp"
                alt="Hero Image"
                className="w-full h-[42vh] sm:h-[46vh] md:h-[60vh] lg:h-[70vh] object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
