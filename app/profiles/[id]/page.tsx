import { auth } from "@/auth";
import SellerProfileClient from "@/app/ui/profile/SellerProfileClient";
import { fetchSellerProducts, fetchSellerProfiles } from "@/app/lib/data";
import { notFound } from "next/navigation";
import PageHeader from "@/app/ui/components/page-header";

type SellerProfileDB = {
  id: string;
  username: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string | null;
};

type ProductDB = {
  id: string;
  seller_id: string | null;
  name: string;
  short_description: string | null;
  long_description: string | null;
  price: number | null;
  image_url: string | null;
};

function mapProductsToUI(rows: ProductDB[]) {
  return rows.map((p) => ({
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

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string }> | { id?: string };
}) {
  const session = await auth();
  const viewerId = (session?.user as any)?.id as string | undefined;

  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-xl font-semibold">Missing seller id</h1>
        <p className="mt-2 text-sm text-neutral-500">
          La ruta debe ser /profiles/[id].
        </p>
      </main>
    );
  }

  const isOwner = !!viewerId && viewerId === id;
  const profile = await fetchSellerProfiles(id);

  if (!profile?.length) return notFound()
  const pp = await fetchSellerProducts(profile[0].id)
  const products = mapProductsToUI(pp ?? []);

  return (
    <>
      <PageHeader heading="Artisan Profile" />
      <SellerProfileClient
        seller={{
          id: profile[0].id,
          displayName: profile[0].display_name,
          bio: profile[0].bio,
          avatarUrl: profile[0].avatar_url,
          rating: profile[0].average_rating,
          reviewsCount: profile[0].total_reviews,
          salesCount: 0,
        }}
        products={products}
        isOwner={isOwner}
      />
    </>
  );
}
