import Link from "next/link";

const footerLinks = [
    { href: "/products", label: "Browse" },
    { href: "/profile", label: "Sell" },
    { href: "/profiles", label: "Discover" },
];

export default function MainFooter() {
    return (
        <footer className="border-t border-gray-200">
            <div className="mx-5 md:mx-10 max-w-5xl lg:mx-auto mt-7 mb-7">
                <nav className="flex flex-col md:flex-row gap-4 justify-between mb-3">
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <ul className="flex gap-10">
                        {footerLinks.map((link, item) => (
                            <Link key={item} href={link.href}>{link.label}</Link>
                        ))}
                    </ul>
                </nav>
                <p className="text-sm text-gray-400">&copy; 2026 Handcrafted Haven. All rights reserved.</p>
            </div>
        </footer>
    )
}
