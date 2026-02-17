'use client';

import { createSellerProfile, ProfileState } from "@/app/lib/actions/seller-profile-actions";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function ProfileCreateForm() {

    const initialState: ProfileState = {
        message: null,
        errors: {},
        values: {}
    };
    const [state, formAction] = useActionState(createSellerProfile, initialState);

    const [imgPreviewUrl, setImgPreviewUrl] = useState('');

    return (
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">Create Artisan Profile</h2>
                <Link href="/profile" className="bg-gray-900 text-white rounded-lg px-4 py-1.5 hover:bg-gray-800 cursor-pointer">Cancel</Link>
            </div>

            <div className="mt-6">
                <form action={formAction} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
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
                                id="avatarUrl"
                                name="avatarUrl"
                                onChange={(e) => setImgPreviewUrl(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                placeholder="https://..."
                            />
                            <p className="mt-2 text-xs text-red-500">
                                {state?.errors?.avatarUrl}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-5">
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium">Display name</label>
                            <input defaultValue={state.values?.displayName} id="displayName" name="displayName" className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10" />
                            <p className="mt-2 text-xs text-red-500">
                                {state?.errors?.displayName}
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
                                {state?.errors?.bio}
                            </p>
                        </div>
                        <p className="mt-2 text-xs text-red-500">
                            {state?.message}
                        </p>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm font-medium text-white">
                                Create Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
