import Image from "next/image";

type Props = {
    product: {
        title: string,
        imageSrc: string,
        price: number,
        description: string,
        category: string
    }
}

export default function ProductCard({ product }: Props) {
    return (
        <article className="w-full rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition duration-300 ease-in-out">
            <Image width={150} height={150} src={product.imageSrc} alt={`${product.title}`} className="object-cover w-full h-35" />
            <div className="flex flex-col gap-2 px-3 py-2">
                <p className="text-sm font-medium">{product.title}</p>
                <p className="text-xs text-gray-400">{product.category}</p>
                <p>${product.price}</p>
            </div>
        </article>
    )
}
