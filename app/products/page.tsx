import Link from "next/link"
import { fetchProductCategories, fetchProducts, fetchProductsPages } from "../lib/data"
import ProductCard from "../ui/products/product-card"
import CategoryFilter from "../ui/products/category-filter"
import ProductSearchInput from "../ui/products/product-search-input"
import Pagination from "../ui/products/pagination"

export default async function Page({ params, searchParams }: PageProps<'/products'>) {
    const filterParams = await searchParams
    const categoryId = typeof filterParams.categoryId == 'string' ? filterParams.categoryId : undefined
    const query = typeof filterParams.query == 'string' ? filterParams.query : undefined
    const page = typeof filterParams.page == 'string' ? filterParams.page : undefined
    const products = await fetchProducts({ categoryId, query, page })
    const categories = await fetchProductCategories()
    const totalPages = await fetchProductsPages({ categoryId, query })

    return (
        <>
            <div className="py-10 flex flex-col sm:flex-row gap-3">
                <ProductSearchInput />
                <CategoryFilter categories={categories} />
            </div>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-10">
                {products.length ? products.map((product) => (
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
                )) :
                    <div>
                        No products found
                    </div>
                }
            </section>
            <div className="flex justify-center my-10">
                <Pagination totalPages={totalPages} />
            </div>
        </>
    )
}
