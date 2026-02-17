"use client";

import { useMemo, useState } from "react";
import type { SellerProfile } from "@/app/lib/sellers";
import { saveSellerProfile } from "@/app/lib/actions/seller-profile-actions";

export default function SellerEditProfileForm({ initial }: { initial: SellerProfile }) {
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [bio, setBio] = useState(initial.bio);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(initial.avatarUrl);
  const [saved, setSaved] = useState<string | null>(null);

  const preview = useMemo(() => {
    if (!avatarFile) return avatarUrl;
    return URL.createObjectURL(avatarFile);
  }, [avatarFile, avatarUrl]);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setSaved(null);
  }

  return (
    <form
      action={async (formData) => {
        formData.set("displayName", displayName);
        formData.set("bio", bio);
        formData.set("avatarUrl", avatarUrl);

        await saveSellerProfile(formData);
        setSaved("Saved ✅");
      }}
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
    >
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 overflow-hidden rounded-2xl bg-neutral-100">
          <img src={preview} alt="Avatar preview" className="h-full w-full object-cover" />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium">Profile photo</label>
          <input type="file" accept="image/*" onChange={onPick} className="mt-2 block w-full text-sm" />

          <label className="mt-4 block text-sm font-medium">Avatar URL (temporal)</label>
          <input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            placeholder="https://..."
          />

          <p className="mt-2 text-xs text-neutral-500">
            Luego lo conectamos a Supabase Storage.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label className="block text-sm font-medium">Display name</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Your story</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={6}
            className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white">
            Save changes
          </button>

          {saved && <span className="text-sm text-neutral-600">{saved}</span>}
        </div>
      </div>
    </form>
  );
}
