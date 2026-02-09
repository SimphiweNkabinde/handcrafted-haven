import Link from "next/link"
import { fetchProducts } from "../lib/data"
import ProductCard from "../ui/products/product-card"

export default async function Page({ params }: PageProps<'/products'>) {
    const products = await fetchProducts()
    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-10">
            {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                    <ProductCard
                        product={{
                            title: product.name,
                            price: product.price,
                            description: product.short_description,
                            imageSrc: product.image_url,
                            category: product.category_name
                        }} />
                </Link>
            ))}
        </section>
    )
}
