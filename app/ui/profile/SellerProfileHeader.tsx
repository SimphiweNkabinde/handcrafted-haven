import type { SellerProfile } from "@/app/lib/sellers"
import { StarIcon } from "@heroicons/react/16/solid"
export default function SellerProfileHeader({ seller }: { seller: SellerProfile }) {
  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tight  ">{seller.displayName}</h2>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
        <span className="font-medium flex gap-2">
          <StarIcon className="text-yellow-400 w-4" />
          {Number(seller.rating ?? 0).toFixed(1)} ({seller.reviewsCount ?? 0})
        </span>
        <span className="text-neutral-300">|</span>
        <span>{seller.salesCount ?? 0} Sales</span>

        <span className="text-neutral-300 ">|</span>
      </div>
    </div>
  )
}


//import SellerEditProfileForm from "@/app/ui/profile/SellerEditProfileForm"
//          <SellerEditProfileForm initial={seller} />
