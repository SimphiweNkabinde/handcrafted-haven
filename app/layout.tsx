import "./globals.css";
import { Roboto } from "next/font/google";
import MainHeader from "./ui/components/main-header";
import MainFooter from "./ui/components/main-footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description:
    "A marketplace for artisans to showcase and sell unique handcrafted items.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <MainHeader />

        <main className="w-full max-w-5xl mx-auto px-5 md:px-10 my-10">
          {children}
        </main>
        <MainFooter />
      </body>
    </html>
  );
}
