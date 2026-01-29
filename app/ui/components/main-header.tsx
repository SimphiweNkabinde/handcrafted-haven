import Link from "next/link";

export default function MainHeader() {
    return (
        <header className="px-15 py-5 flex justify-between">
            <Link href="/">
                Site Name
            </Link>
            <nav className="flex gap-5">
                <ul className="flex gap-10">
                    <li>Page</li>
                    <li>Page</li>
                    <li>Page</li>
                </ul>
                <button>Button</button>
            </nav>
        </header>
    )
}
