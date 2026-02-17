import SellerProfileClient from "@/app/ui/profile/SellerProfileClient";
import { fetchCurrentSellerProfile, fetchSellerProducts } from "../lib/data";
import { ProductData } from "../lib/definitions";
import Link from "next/link";
import PageHeader from "../ui/components/page-header";

function mapProductsToUI(products: ProductData[]) {
    return products.map((p) => ({
        id: p.id,
        title: p.name,
        description: p.short_description ?? p.long_description ?? "",
        price: typeof p.price === "number" ? p.price : Number(p.price ?? 0),
        imageUrl:
            p.image_url && p.image_url.trim() !== ""
                ? p.image_url
                : "https://placehold.co/600x600/png?text=Item",
        status: "active",
    }));
}

export default async function Page() {
    const sellerProfile = await fetchCurrentSellerProfile()

    if (!sellerProfile) {
        return (
            <>
                <PageHeader
                    heading="You do not have a Seller Profile"
                    intro="Having a Profile allows you to sell on Handcraft Haven"
                />
                <Link className="text-blue-500 underline text-sm mt-3 block" href="/profile/create">Create a Seller Profile</Link>
            </>
        );
    }

    const sellerProducts = await fetchSellerProducts(sellerProfile?.id)
    const products = mapProductsToUI(sellerProducts);

    return (
        <>
            <PageHeader heading="Your Seller Profile" />
            <SellerProfileClient
                seller={{
                    id: sellerProfile.id,
                    displayName: sellerProfile.display_name ?? "Seller",
                    bio: sellerProfile.bio ?? "",
                    avatarUrl: sellerProfile.avatar_url.trim() || "https://placehold.co/600x600/png?text=Item",
                    rating: 0,
                    reviewsCount: 0,
                    salesCount: 0,
                }}
                products={products}
                isOwner={true}
            />
        </>
    );
}
