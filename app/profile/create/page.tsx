import { fetchCurrentSellerProfile } from "@/app/lib/data";
import PageHeader from "@/app/ui/components/page-header";
import ProfileCreateForm from "@/app/ui/profile/profile-create-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (!session) { return redirect("/login") }

    const profileExists = await fetchCurrentSellerProfile()
    if (profileExists) { return redirect("/profile") }

    return (
        <div>
            <div className="mx-auto max-w-6xl px-6 py-10">
                <PageHeader
                    heading="Create a Seller Profile"
                    intro="With a Seller Profile you can let the world see and appreciate your beautiful handcrafted creations" />
                <ProfileCreateForm />
            </div>
        </div>
    )
}
