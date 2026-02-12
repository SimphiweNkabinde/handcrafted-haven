export default function SellerBio({ bio }: { bio: string }) {
  return (
    <div className="space-y-4 text-sm leading-6 text-neutral-800 ">
      <p className="font-medium">Body text for your whole article or post.</p>
      <p>{bio}</p>
    </div>
  )
}
