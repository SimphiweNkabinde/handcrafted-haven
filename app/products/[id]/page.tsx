import Button from "@/app/ui/products/button";
import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import {
  fetchProductById,
  fetchReviewsByProductId,
  fetchSellerProfiles,
  isCurrentUserTheProductOwner
} from "@/app/lib/data";

import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import ProductReviewCard from "@/app/ui/products/product-review-card";
import ProductReviewForm from "@/app/ui/products/product-review-form";
import PageHeader from "@/app/ui/components/page-header";

export default async function page({ params }: PageProps<"/products/[id]">) {
    const { id } = await params;
    const product = await fetchProductById(id).catch(err => { return null });
    const reviews = await fetchReviewsByProductId(id)
    const session = await auth()

    if (!product) notFound();

    const isOwner = await isCurrentUserTheProductOwner(id)
    const seller = product?.seller_id ? (await fetchSellerProfiles(product.seller_id))[0] : null;


    return (
        <>
            <PageHeader heading={product.name} />
            <div className="flex flex-col gap-5">
                <div className="flex md:grid md:grid-cols-2 flex-col gap-5 md:flex-row gap-10">
                    <Image width={150} height={150} src={product.image_url} alt="product image" className="rounded object-cover w-full" />
                    <div className="flex flex-col gap-3 sm:gap-4 md:flex-1">
                        <div className="flex items-start justify-between">
                            <p className="text-xl font-semibold">{product.name}</p>
                            {isOwner &&
                                <Link className="rounded-lg px-4 py-1.5 text-sm cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-100" href={`/products/${id}/edit`}>Edit</Link>
                            }
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
                <section className="border border-gray-200 rounded-xl p-5">
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <Image
        width={48}
        height={48}
        alt="Seller avatar"
        src={
          seller?.avatar_url && seller.avatar_url.trim() !== ""
            ? seller.avatar_url
            : "https://placehold.co/96x96/png?text=%F0%9F%A7%B5"
        }
        className="rounded-full object-cover w-12 h-12 border"
      />
      <div className="leading-tight">
        <p className="text-sm text-gray-500">Sold by</p>
        <p className="font-semibold">
          {seller?.display_name || product.seller_name || "Unknown seller"}
        </p>
      </div>
    </div>

  {seller ? (
  <Link
    className="rounded-lg px-4 py-2 text-sm cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-100"
    href={`/profiles/${product.seller_id}`}
  >
    View profile
  </Link>
) : null}

  </div>

  {seller?.bio ? (
    <p className="mt-3 text-sm text-gray-600">{seller.bio}</p>
  ) : (
    <p className="mt-3 text-sm text-gray-500">This seller hasn’t added a bio yet.</p>
  )}

  {(seller?.total_reviews ?? 0) > 0 ? (
    <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
      <StarIcon className="text-yellow-400 w-4" />
      <span className="font-semibold">{seller?.average_rating ?? "—"}</span>
      <span>({seller?.total_reviews} reviews)</span>
      <span className="text-gray-300">•</span>
      <span>{seller?.total_products ?? 0} products</span>
    </div>
  ) : (
    <div className="mt-3 text-sm text-gray-500">No reviews yet.</div>
  )}
</section>

                <section className="flex flex-col gap-6 mt-10">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-semibold">Reviews</p>
                        <div className="flex">
                            <StarIcon className="text-yellow-400 w-5" />
                            {reviews.length ? <span className="mr-2 ml-1 font-bold">
                                {(reviews.map(i => i.rating).reduce((acc, curr) => acc + curr, 0) / reviews.length).toFixed(1)}
                            </span> : ""}
                            <span>{reviews.length} reviews</span>
                        </div>
                    </div>
                    <section className="flex flex-col gap-3 md:grid md:grid-cols-2">
                        <div>
                            {session?.user?.email && <ProductReviewForm productId={id} userEmail={session?.user?.email} />}
                        </div>
                        <div className="flex flex-col gap-3">
                            {reviews.map(review => (
                                <ProductReviewCard key={review.id}
                                    username={review.username}
                                    title={review.title}
                                    body={review.body}
                                    rating={review.rating}
                                    createdAt={review.created_at} />
                            ))}
                        </div>
                    </section>
                </section>
            </div>
        </>
    )
}
