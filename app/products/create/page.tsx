import { fetchCurrentSellerProfile, fetchProductCategories } from "@/app/lib/data";
import PageHeader from "@/app/ui/components/page-header";
import CreateForm from "@/app/ui/products/create-form";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({ params }: PageProps<"/products/create">) {
    const session = await auth()
    if (!session) { return redirect("/login") }

    const profile = await fetchCurrentSellerProfile()

    if (!profile) return (
        <div className="mx-auto max-w-6xl px-6 py-10">
            <PageHeader heading="Add a new Product" intro="You need a Seller Profile to add Product" />
            <Link className="text-blue-500 underline text-sm mt-3 block" href="/profile/create">Create a Seller Profile</Link>
        </div>
    )

    const categories = await fetchProductCategories()
    return (
        <>
            <PageHeader heading="Add a new Product" intro="Fill in the details about your handcrafted creation." />
            <CreateForm categories={categories} />
        </>
    )
}
