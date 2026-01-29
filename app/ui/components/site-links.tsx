
'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SiteLinks() {
    const pathname = usePathname()

    const links: { label: string, href: string }[] = [
        { label: "home", href: "/" },
        { label: "login", href: "/login" },
        { label: "register", href: "/register" },
        { label: "products", href: "/products" },
        { label: "create product", href: "/products/create" },
        { label: "product details (863)", href: "/products/863" },
        { label: "profiles", href: "/profiles" },
        { label: "create profile", href: "/profiles/create" },
        { label: "profile details (6353)", href: "/profiles/6353" },
        { label: "inventory", href: "/inventory" }
    ]
    return (
        <ul className='p-5'>
            {links.map((link, index) => (
                <li key={index}>
                    <Link
                        className={
                            clsx(
                                'text-blue-500',
                                { 'text-gray-700': pathname == link.href }
                            )}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
