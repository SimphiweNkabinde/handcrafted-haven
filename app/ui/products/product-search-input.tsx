'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProductSearchInput() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        if (term) params.set('query', term);
        else params.delete('query')
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <input
            type="search"
            placeholder="search"
            onChange={(e) => {
                handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get('query') || ''}
            className="block cursor-pointer rounded-2xl border border-gray-500 py-2 px-3 text-sm bg-white" />
    )
}