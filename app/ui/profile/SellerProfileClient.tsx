import SellerProfileHeader from "@/app/ui/profile/SellerProfileHeader";
import SellerBio from "@/app/ui/profile/SellerBio";
import SellerProductsGrid from "@/app/ui/profile/SellerProductsGrid";
import Button from "@/app/ui/button";
import Link from "next/link";

type SellerUI = {
  id: string;
  username?: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  salesCount: number;
};

type ProductUI = {
  id: string;
  title: string;
  description?: string;
  price: number;
  imageUrl: string;
  status?: string;
};

export default function SellerProfileClient({
  seller,
  products,
  isOwner,
}: {
  seller: SellerUI;
  products: ProductUI[];
  isOwner: boolean;
}) {

  return (
    <div className="mx-auto max-w-6xl px-6 pb-10">
      <section
        className="mt-8 grid gap-10 md:grid-cols-[1.15fr_0.85fr]
            bg-gradient-to-br from-gray-50/80 to-gray-200/60
            py-4 px-5 md:p-10 rounded-3xl shadow-lg backdrop-blur-sm"
      >
        <div>
          <SellerProfileHeader seller={seller as any} />
          <div className="mt-6 max-w-xl">
            <SellerBio bio={seller.bio} />
          </div>

          {isOwner && (
            <div className="mt-6 flex gap-3">
              <Link href="/profile/edit" className="bg-gray-900 text-white rounded-lg px-4 py-1.5 hover:bg-gray-800 cursor-pointer">
                Edit profile
              </Link>

              <a href="/products/create">
                <Button className="primary">
                  Add product
                </Button>
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <div className="h-64 w-64 overflow-hidden rounded-full bg-neutral-100 shadow-md ring-4 ring-white">
            {seller.avatarUrl && (
              <img
                src={seller.avatarUrl}
                alt={seller.displayName}
                className="h-full w-full object-cover object-top "
              />
            )}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-lg font-semibold">Featured Items</h2>
        <div className="mt-6">
          <SellerProductsGrid products={products as any} />
        </div>
      </section>
    </div >
  );
}
