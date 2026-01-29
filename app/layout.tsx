import "./globals.css";
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
    <html lang="en">
      <body>
        <MainHeader />
        <main className="mx-5 md:mx-10 max-w-5xl lg:mx-auto w-full my-10">
          {children}
        </main>
        <MainFooter />
      </body>
    </html>
  );
}
