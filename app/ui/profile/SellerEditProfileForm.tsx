"use client";

import { useActionState, useState } from "react";
import { ProfileState, updateSellerProfile } from "@/app/lib/actions/seller-profile-actions";

type Props = {
  initial: {
    displayName: string,
    avatarUrl: string,
    bio: string
  }
}
export default function SellerEditProfileForm({ initial }: Props) {

  const initialState: ProfileState = {
    message: null,
    errors: {},
    values: {
      displayName: initial.displayName,
      bio: initial.bio,
      avatarUrl: initial.avatarUrl
    }
  };
  const [state, formAction] = useActionState(updateSellerProfile, initialState)

  const [imgPreviewUrl, setImgPreviewUrl] = useState(initial.avatarUrl);

  return (
    <form
      action={formAction}
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
    >
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 overflow-hidden rounded-2xl bg-neutral-100">
          <img
            src={imgPreviewUrl ? imgPreviewUrl : "https://placehold.co/512x512/png?text=Seller"}
            alt="Avatar preview"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="avatarUrl" className="mt-4 block text-sm font-medium">Avatar URL</label>
          <input
            defaultValue={state.values?.avatarUrl}
            onChange={(e) => setImgPreviewUrl(e.target.value)}
            id="avatarUrl"
            name="avatarUrl"
            className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            placeholder="https://..."
          />
          <p className="mt-2 text-xs text-red-500">
            {state.errors?.avatarUrl}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium">Display name</label>
          <input
            defaultValue={state.values?.displayName}
            id="displayName"
            name="displayName"
            className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
          <p className="mt-2 text-xs text-red-500">
            {state.errors?.displayName}
          </p>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium">Your story</label>
          <textarea
            defaultValue={state.values?.bio}
            id="bio"
            name="bio"
            rows={6}
            className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
          <p className="mt-2 text-xs text-red-500">
            {state.errors?.bio}
          </p>
        </div>
        <p className="mt-2 text-xs text-red-500">
          {state.message}
        </p>
        <div className="flex items-center justify-between">
          <button type="submit" className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white">
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
}
