import { fetchUserCartItemCount } from '@/app/lib/data'
import { auth } from '@/auth'
import { ShoppingCartIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

export default async function NavbarShoppingCart() {
    const session = await auth()
    if (!session) return <></>

    const totalCartItems = await fetchUserCartItemCount()
    return (
        <Link href="/cart" className='relative '>
            <ShoppingCartIcon className="w-5 text-gray-800" />
            <span
                className='flex items-center justify-center bg-red-600 absolute -top-2 -end-2 rounded-full text-xs text-white w-4 h-4'>
                {totalCartItems}
            </span>
        </Link>
    )
}