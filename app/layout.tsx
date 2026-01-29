import "./globals.css";
import MainHeader from "./ui/components/main-header";
import MainFooter from "./ui/components/main-footer";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        <main>
          {children}
        </main>
        <MainFooter />
      </body>
    </html>
  );
}
