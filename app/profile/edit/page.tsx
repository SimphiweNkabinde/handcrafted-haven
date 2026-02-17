import { fetchCurrentSellerProfile } from "@/app/lib/data";
import PageHeader from "@/app/ui/components/page-header";
import SellerEditProfileForm from "@/app/ui/profile/SellerEditProfileForm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {

    const profile = await fetchCurrentSellerProfile()
    if (!profile) return redirect("/profile")

    return (
        <>
            <PageHeader heading="Edit your Profile" />
            <section className="mt-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold">Edit profile</h2>
                    <Link href="/profile" className="rounded-lg px-4 py-1.5 cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-100">Cancel</Link>
                </div>
                <div className="mt-6">
                    <SellerEditProfileForm initial={{
                        displayName: profile?.display_name,
                        avatarUrl: profile.avatar_url,
                        bio: profile.bio
                    }} />
                </div>
            </section>
        </>
    )
}
