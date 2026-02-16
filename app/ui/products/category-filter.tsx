'use client';

import { ProductCategory } from "@/app/lib/definitions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter({ categories }: { categories: ProductCategory[] }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    function handleChange(value: string) {
        const params = new URLSearchParams(searchParams)
        if (value) params.set('categoryId', value);
        else params.delete('categoryId')
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <select onChange={(e) => handleChange(e.target.value)}
            className="block cursor-pointer rounded-2xl border border-gray-500 py-2 px-3 text-sm bg-white"
            defaultValue={searchParams.get('categoryId') || ""}
        >
            <option value="">
                All Categories
            </option>
            {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    )
}
