import Link from "next/link";
import { auth } from "@/auth";
import NavbarUserOptions from "./navbar-user-options";
import MobileMenu from "@/app/ui/mobile-menu";

const navItems = [
  { href: "/products", label: "Browse" },
  { href: "/profile", label: "My Profile" },
  { href: "/profiles", label: "Discover" },
];

export default async function MainHeader() {
  const session = await auth();

  return (
    <header>
      <div className="mx-5 md:mx-10 max-w-5xl lg:mx-auto my-5 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Handcraft Haven
        </Link>

        {/* ✅ Mobile */}
        <div className="md:hidden">
          <MobileMenu
            navItems={navItems}
            userOptions={<NavbarUserOptions user={session?.user || null} />}
          />
        </div>

        {/* ✅ Desktop */}
        <nav className="hidden md:flex gap-5 items-center">
          <ul className="flex gap-10">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:bg-gray-100 rounded-lg px-3 py-1.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <NavbarUserOptions user={session?.user || null} />

        </nav>
      </div>
    </header>
  );
}
