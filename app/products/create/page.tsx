import { fetchProductCategories } from "@/app/lib/data";
import CreateForm from "@/app/ui/products/create-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page({ params }: PageProps<"/products/create">) {
    const session = await auth()
    if (!session) { return redirect("/login") }

    const categories = await fetchProductCategories()
    return (
        <CreateForm categories={categories} />
    )
}
