import type { ProductBySeller  } from "@/app/lib/sellers"

export default function SellerProductsGrid({ products }: { products: ProductBySeller[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <article key={p.id} className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="aspect-[16/10] overflow-hidden rounded-2xl">
            <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-neutral-600">{SLineClamp(p.description)}</p>
            <p className="mt-2 text-sm font-semibold">${p.price.toFixed(2)}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function SLineClamp(text: string) { 
  return <span className="line-clamp-2">{text}</span>
}
