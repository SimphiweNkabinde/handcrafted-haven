import SellerEditProfileForm from "@/app/ui/profile/SellerEditProfileForm"
import { mockSeller } from "@/app/lib/mock/seller"

export default function SellerEditPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Edit Seller Profile</h1>
      <p className="mt-1 text-sm text-neutral-600">
        Update your photo and story so buyers can connect with you.
      </p>

      <div className="mt-8">
        <SellerEditProfileForm initial={mockSeller} />
      </div>
    </main>
  )
}
