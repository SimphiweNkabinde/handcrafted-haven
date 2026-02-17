import Link from "next/link"
import moment from "moment"
import { fetchSellerProfiles } from "../lib/data"
import { StarIcon } from "@heroicons/react/16/solid"
import PageHeader from "../ui/components/page-header"

export default async function page() {

    const profiles = await fetchSellerProfiles()
    return (
        <>
            <PageHeader
                heading="Discover our Artisans"
                intro="Discover talented artisans who put their heart into their creations. Get to know their stories and what inspires their craft"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {profiles?.map(profile => (
                    <Link href={`/profiles/${profile.id}`} key={profile.id} className="flex flex-col justify-center gap-2 items-center p-1">
                        <img className="object-cover rounded-full w-25 h-25 shadow-md hover:shadow-xl" width={150} height={150} src={profile.avatar_url || "https://placehold.co/600x600/png?text=Item"} alt={`${profile.display_name}'s profile avatar`} />
                        <p className="text-sm">{profile.display_name}</p>
                        <div className="flex gap-5 text-xs text-gray-600 items-center">
                            <span className="flex flex-col items-center gap-1">
                                <StarIcon className="w-4 text-yellow-400" />
                                <span>
                                    {profile.average_rating ? profile.average_rating : 0}
                                    {`(${profile.total_reviews})`}
                                </span>
                            </span>
                            <span className="flex flex-col items-center gap-1">{profile.total_products} <span>products</span></span>
                            <span className="flex flex-col items-center gap-1"><span>Joined</span>  {moment(profile.created_at).fromNow()}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
