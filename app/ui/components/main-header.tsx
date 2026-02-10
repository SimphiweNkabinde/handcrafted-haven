import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

const navItems = [
    { href: "/products", label: "Browse" },
    { href: "/seller", label: "Sell" },
    { href: "/profiles", label: "Discover" },
];

export default function MainHeader() {
    return (
        <header >
            <div className="mx-5 md:mx-10 max-w-5xl lg:mx-auto my-5 flex justify-between items-center">
                <Link href="/" className="font-bold text-xl">
                    Handcraft Haven
                </Link>
                <button className="md:hidden">
                    <Bars3Icon className="w-7" />
                </button>
                <nav className="hidden md:flex gap-5 items-center">
                    <ul className="flex gap-10">
                        {navItems.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="hover:bg-gray-100 rounded-lg px-3 py-1.5"
                            >{link.label}</Link>
                        ))}
                    </ul>
                    <Link href="/login" className="bg-gray-900 text-white rounded-lg px-4 py-1.5 hover:bg-gray-800 cursor-pointer">
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    )
}
