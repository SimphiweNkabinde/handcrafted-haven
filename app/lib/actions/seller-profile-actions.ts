"use server";

import { auth } from "@/auth";
import postgres from "postgres";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function saveSellerProfile(formData: FormData) {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) throw new Error("Not authenticated");

  const displayName = String(formData.get("displayName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();

  await sql`
    INSERT INTO seller_profiles (id, display_name, bio, avatar_url)
    VALUES (${userId}, ${displayName || "Seller"}, ${bio}, ${avatarUrl})
    ON CONFLICT (id) DO UPDATE SET
      display_name = EXCLUDED.display_name,
      bio = EXCLUDED.bio,
      avatar_url = EXCLUDED.avatar_url
  `;

  revalidatePath(`/profiles/${userId}`);
}
