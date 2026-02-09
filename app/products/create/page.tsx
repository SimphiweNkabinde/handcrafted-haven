import { fetchProductCategories } from "@/app/lib/data";
import CreateForm from "@/app/ui/products/create-form";

export default async function page({ params }: PageProps<"/products/create">) {

    const categories = await fetchProductCategories()
    return (
        <CreateForm categories={categories} />
    )
}
