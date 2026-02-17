import Link from "next/link";
import type { ProductBySeller } from "@/app/lib/sellers";

export default function SellerProductsGrid({ products }: { products: ProductBySeller[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => {
        const img =
          (p as any).imageUrl && String((p as any).imageUrl).trim() !== ""
            ? String((p as any).imageUrl)
            : "https://placehold.co/600x600/png?text=Item";

        const priceNum = Number((p as any).price ?? 0);

        return (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 block hover:shadow-md transition"
          >
            <article>
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src={img}
                  alt={p.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {SLineClamp(p.description)}
                </p>
                <p className="mt-2 text-sm font-semibold">
                  ${priceNum.toFixed(2)}
                </p>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}

function SLineClamp(text: string) {
  return <span className="line-clamp-2">{text}</span>;
}
