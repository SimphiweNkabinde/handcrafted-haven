import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description:
    "A marketplace for artisans to showcase and sell unique handcrafted items.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <div className="app-shell">
          <header>
            <Navbar />
          </header>

          <main id="main" className="app-main">
            {children}
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
