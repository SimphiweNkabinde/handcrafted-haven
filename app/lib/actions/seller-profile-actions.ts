"use server";

import { auth } from "@/auth";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { fetchCurrentSellerProfile, fetchUserByEmail } from "../data";
import z from "zod";
import { redirect } from "next/navigation";

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

const ProfileFormSchema = z.object({
  displayName: z.string().nonempty('Missing display name'),
  bio: z.string().nonempty('Missing bio'),
  avatarUrl: z.url('Invalid avatar url'),
})

export type ProfileState = {
  errors?: {
    bio?: string[];
    displayName?: string[];
    avatarUrl?: string[];
  },
  message?: string | null;
  values?: {
    bio?: string;
    displayName?: string;
    avatarUrl?: string;
  };
}

export async function createSellerProfile(prevState: ProfileState, formData: FormData) {
  const session = await auth()
  if (!session?.user?.email) return { message: 'missing auth session', }

  const user = await fetchUserByEmail(session?.user?.email)
  if (!user) return { message: 'user not found' }

  const validatedFields = ProfileFormSchema.safeParse({
    bio: formData.get('bio'),
    displayName: formData.get('displayName'),
    avatarUrl: formData.get('avatarUrl'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Profile.',
      values: {
        bio: formData.get('bio')?.toString(),
        displayName: formData.get('displayName')?.toString(),
        avatarUrl: formData.get('avatarUrl')?.toString()
      }
    }
  }

  const { bio, displayName, avatarUrl } = validatedFields.data;

  try {
    await sql`
      INSERT INTO seller_profiles (display_name, bio, avatar_url, user_id)
      VALUES (${displayName}, ${bio}, ${avatarUrl}, ${user.id})
    `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Profile.',
    };
  }

  redirect("/profile")
}

export async function updateSellerProfile(prevState: ProfileState, formData: FormData) {
  const existingProfile = await fetchCurrentSellerProfile()
  if (!existingProfile) return { message: 'Profile does not exist for this user account' }

  const validatedFields = ProfileFormSchema.safeParse({
    bio: formData.get('bio'),
    displayName: formData.get('displayName'),
    avatarUrl: formData.get('avatarUrl'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Profile.',
      values: {
        bio: formData.get('bio')?.toString(),
        displayName: formData.get('displayName')?.toString(),
        avatarUrl: formData.get('avatarUrl')?.toString()
      }
    }
  }

  const { bio, displayName, avatarUrl } = validatedFields.data;

  try {
    await sql`
      UPDATE seller_profiles 
      SET display_name = ${displayName},
          bio = ${bio},  
          avatar_url = ${avatarUrl}
      WHERE seller_profiles.id = ${existingProfile?.id}
    `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Profile.',
    };
  }

  redirect("/profile")
}