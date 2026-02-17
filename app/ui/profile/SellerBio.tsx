export default function SellerBio({ bio }: { bio: string }) {
  return (
    <div className="space-y-4 text-sm leading-6 text-neutral-800 ">
      <p>{bio}</p>
    </div>
  )
}
