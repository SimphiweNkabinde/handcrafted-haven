import { auth } from "@/auth";
import postgres from "postgres";
import SellerProfileClient from "@/app/ui/profile/SellerProfileClient";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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

function mapSellerToUI(s: SellerProfileDB) {
  const avatar =
    s.avatar_url && s.avatar_url.trim() !== ""
      ? s.avatar_url
      : "https://placehold.co/512x512/png?text=Seller";

  return {
    id: s.id,
    username: s.username ?? "",
    displayName: s.display_name ?? "Seller",
    bio: s.bio ?? "",
    avatarUrl: avatar,

    rating: 0,
    reviewsCount: 0,
    salesCount: 0,
  };
}

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

  // 1) Intentar leer el seller profile
  let sellerRows = await sql<SellerProfileDB[]>`
    SELECT id, username, display_name, bio, avatar_url, created_at
    FROM seller_profiles
    WHERE id = ${id}
    LIMIT 1
  `;

  // 2) Si no existe, lo creamos automáticamente
  if (!sellerRows.length) {
    const fallbackName = (session?.user as any)?.name ?? "Seller";

    await sql`
      INSERT INTO seller_profiles (id, username, display_name, bio, avatar_url)
      VALUES (${id}, NULL, ${fallbackName}, '', '')
      ON CONFLICT (id) DO NOTHING
    `;

    // Volver a leerlo
    sellerRows = await sql<SellerProfileDB[]>`
      SELECT id, username, display_name, bio, avatar_url, created_at
      FROM seller_profiles
      WHERE id = ${id}
      LIMIT 1
    `;
  }

  if (!sellerRows.length) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-xl font-semibold">
          Seller profile could not be created
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Revisa permisos/constraints en la tabla seller_profiles.
        </p>
      </main>
    );
  }

  // 3) Productos del seller
  const productRows = await sql<ProductDB[]>`
    SELECT id, seller_id, name, short_description, long_description, price, image_url
    FROM products
    WHERE seller_id = ${id}
    ORDER BY id DESC
    LIMIT 24
  `;

  const seller = mapSellerToUI(sellerRows[0]);
  const products = mapProductsToUI(productRows ?? []);
  const isOwner = !!viewerId && viewerId === id;

  return (
    <SellerProfileClient
      seller={seller}
      products={products}
      isOwner={isOwner}
    />
  );
}
