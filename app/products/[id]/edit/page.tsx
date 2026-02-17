
import { fetchProductById, fetchProductCategories, isCurrentUserTheProductOwner } from "@/app/lib/data";
import PageHeader from "@/app/ui/components/page-header";
import EditForm from "@/app/ui/products/edit-form";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

export default async function page({ params }: PageProps<"/products/[id]/edit">) {
    const session = await auth()
    if (!session) { return redirect("/login") }

    const isOwner = await isCurrentUserTheProductOwner((await params).id)
    if (!isOwner) return (
        <div>
            <PageHeader heading={`Update Product`} intro="You are not authorized to edit this product" />
        </div>
    )

    const { id } = await params;
    const product = await fetchProductById(id).catch(err => { return null })
    const categories = await fetchProductCategories()

    if (!product) notFound();
    return (
        <>
            <PageHeader heading={`Update Product: ${product.name}`} />
            <EditForm categories={categories} product={product} />
        </>
    )
}
