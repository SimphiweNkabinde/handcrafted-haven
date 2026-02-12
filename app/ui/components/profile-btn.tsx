"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function ProfileBtn({ username }: { username: string | null | undefined }) {

    return (
        <button onClick={(event) => {
            event.currentTarget.nextElementSibling?.classList.toggle('hidden');
        }} className='flex gap-1 text-sm font-thin border border-gray-200 rounded capitalize bg-gray-50 hover:bg-gray-100 px-2 py-1 cursor-pointer'>
            {username}
            <ChevronDownIcon className='w-3 text-gray-500' />
        </button>
    )
}