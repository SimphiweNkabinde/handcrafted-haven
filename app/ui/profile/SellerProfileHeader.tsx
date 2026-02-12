import type { SellerProfile } from "@/app/lib/sellers"
export default function SellerProfileHeader({ seller }: { seller: SellerProfile }) {
  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tight  ">{seller.displayName}</h2>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
        <span className="font-medium">
          {seller.rating.toFixed(1)} ({seller.reviewsCount})
        </span>
        <span className="text-neutral-300">|</span>
        <span>{seller.salesCount} Sales</span>
        <span  className="text-neutral-300 ">|</span>
      </div>
    </div>
  )
}


//import SellerEditProfileForm from "@/app/ui/profile/SellerEditProfileForm"
//          <SellerEditProfileForm initial={seller} />
