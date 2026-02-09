
import { fetchProductById, fetchProductCategories } from "@/app/lib/data";
import EditForm from "@/app/ui/products/edit-form";

export default async function page({ params }: PageProps<"/products/[id]/edit">) {

    const { id } = await params;
    const product = await fetchProductById(id)
    const categories = await fetchProductCategories()
    return (
        <EditForm categories={categories} product={product} />
    )
}
