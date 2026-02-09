import Button from "@/app/ui/products/button";
// import ReviewCard from "@/app/ui/products/review-card";
import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { fetchProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function page({ params }: PageProps<"/products/[id]">) {
    const { id } = await params;
    const product = await fetchProductById(id);

    if (!product) notFound();

    return (
        <div className="flex flex-col gap-5">
            <div className="flex md:grid md:grid-cols-2 flex-col gap-5 md:flex-row gap-10">
                <Image width={150} height={150} src={product.image_url} alt="product image" className="rounded object-cover w-full" />
                <div className="flex flex-col gap-3 sm:gap-4 md:flex-1">
                    <div className="flex items-start justify-between">
                        <h1 className="text-2xl font-semibold">{product.name}</h1>
                        <Link className="rounded-lg px-4 py-1.5 text-sm cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-100" href={`/products/${id}/edit`}>Edit</Link>
                    </div>
                    <p className="text-gray-400 text-sm">{product.category_name}</p>

                    <p className="text-gray-500">{product.short_description}</p>
                    <p className="text-lg">${product.price}</p>
                    <Button className="primary">Add to cart</Button>
                    <p className="text-gray-600">
                        {product.long_description}
                    </p>
                </div>
            </div>
            <section className="flex flex-col gap-6 mt-10">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Reviews</p>
                    <div className="flex">
                        <StarIcon className="text-yellow-400 w-5" />
                        <span className="mr-2 ml-1 font-bold">3.3</span>
                        <span>29 reviews</span>
                    </div>
                </div>
                {/* <div className="flex flex-col gap-5">
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </div> */}
            </section>
        </div>
    )
}
