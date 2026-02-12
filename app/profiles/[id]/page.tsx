"use client"

import { useState } from "react"
import { mockSeller, mockProducts } from "@/app/lib/mock/seller"
import SellerProfileHeader from "@/app/ui/profile/SellerProfileHeader"
import SellerBio from "@/app/ui/profile/SellerBio"
import SellerProductsGrid from "@/app/ui/profile/SellerProductsGrid"
import Button from "@/app/ui/button"
import SellerEditProfileForm from "@/app/ui/profile/SellerEditProfileForm"

export default function Page() {
  const SellerProfile = mockSeller
  const ProductBySeller = mockProducts

  const [isEditing, setIsEditing] = useState(false)

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-sm text-neutral-400">Artisan Profile</h1>

      {/* Si está en modo edición, SOLO se ve el form */}
      {isEditing ? (
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Edit profile</h2>
            <Button onClick={() => setIsEditing(false)}>Back</Button>
          </div>

          <div className="mt-6">
            <SellerEditProfileForm initial={SellerProfile} />
          </div>
        </section>
      ) : (
        <>
          <section
            className="mt-8 grid gap-10 md:grid-cols-[1.15fr_0.85fr]
            bg-gradient-to-br from-gray-50/80 to-gray-200/60
            p-10 rounded-3xl shadow-lg backdrop-blur-sm"
          >
            {/* Left column */}
            <div>
              <SellerProfileHeader seller={SellerProfile} />
              <div className="mt-6 max-w-xl">
                <SellerBio bio={SellerProfile.bio} />
              </div>

              <div className="mt-6">
                <Button onClick={() => setIsEditing(true)}>Edit profile</Button>
              </div>
            </div>

            {/* Right column – Avatar */}
            <div className="flex items-center justify-center md:justify-end">
              <div className="h-64 w-64 overflow-hidden rounded-full bg-neutral-100 shadow-md ring-4 ring-white">
                <img
                  src={SellerProfile.avatarUrl}
                  alt={SellerProfile.displayName}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-lg font-semibold">Featured Items</h2>
            <div className="mt-6">
              <SellerProductsGrid products={ProductBySeller} />
            </div>
          </section>
        </>
      )}
    </main>
  )
}
