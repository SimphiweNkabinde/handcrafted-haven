import Link from "next/link";

const footerLinks = [
  { href: "/browse", label: "Browse" },
  { href: "/seller", label: "Sell" },
  { href: "/reviews", label: "Reviews" },
];

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-top">
          <Link className="footer-link" href="/privacy">
            Privacy Policy
          </Link>

          <nav className="footer-nav" aria-label="Footer navigation">
            {footerLinks.map((l) => (
              <Link key={l.href} className="footer-link" href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
