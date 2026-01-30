import Button from "@/app/ui/button";
import ReviewCard from "@/app/ui/products/review-card";
import Tag from "@/app/ui/tag";
import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Carousel from "@/app/ui/products/carousel";

const productData = {
    name: "Product Name",
    shortDescription: "Short Description of product",
    categories: ['category 1', 'category 2', 'category 3'],
    price: 10.99,
    images: ["https://picsum.photos/300", "https://picsum.photos/id/32/300", "https://picsum.photos/id/22/300"],
    longDescription: `Long description Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Non quia provident est porro sit enim illum architecto inventore ut nesciunt.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime earum
                    perferendis nihil unde fuga enim iusto expedita dignissimos ex!`
}

export default async function page() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row gap-10">
                <Carousel imageUrls={productData.images} />
                <div className="flex flex-col gap-4 md:flex-1">
                    <h1 className="text-2xl font-semibold">{productData.name}</h1>
                    <p className="text-gray-600">{productData.shortDescription}</p>
                    <p className="text-lg">${productData.price}</p>
                    <Button>Add to cart</Button>
                    <div className="flex gap-2">
                        {productData.categories.map((category, index) => (
                            <Tag key={index}>{category}</Tag>
                        ))}
                    </div>
                    <p className="text-gray-600">
                        {productData.longDescription}
                    </p>
                </div>
            </div>
            <section className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Reviews</p>
                    <div className="flex">
                        <StarIcon className="text-yellow-400 w-5" />
                        <span className="mr-2 ml-1 font-bold">3.3</span>
                        <span>29 reviews</span>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </section>
        </div>
    )
}
