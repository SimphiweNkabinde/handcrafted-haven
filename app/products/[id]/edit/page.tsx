
import { fetchProductById, fetchProductCategories } from "@/app/lib/data";
import EditForm from "@/app/ui/products/edit-form";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

export default async function page({ params }: PageProps<"/products/[id]/edit">) {
    const session = await auth()
    if (!session) { return redirect("/login") }

    const { id } = await params;
    const product = await fetchProductById(id).catch(err => { return null })
    const categories = await fetchProductCategories()

    if (!product) notFound();
    return (
        <EditForm categories={categories} product={product} />
    )
}
