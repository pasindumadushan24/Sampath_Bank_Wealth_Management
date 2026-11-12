import "./globals.css";
import { Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: {
    default: "Sampath Bank Wealth Management",
    template: "%s | Sampath Wealth",
  },
  description:
    "Sampath Bank Wealth Management — Sri Lanka's premier destination for investment products, portfolio management, and personalised wealth advisory services.",
  keywords: ["wealth management", "investment", "fixed deposits", "unit trusts", "Sri Lanka", "Sampath Bank"],
  authors: [{ name: "Sampath Bank PLC" }],
  openGraph: {
    title: "Sampath Bank Wealth Management",
    description: "Grow, protect, and transfer your wealth with Sri Lanka's trusted financial institution.",
    type: "website",
    locale: "en_LK",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        <Suspense fallback={<div className="h-20" />}>
          <Header />
        </Suspense>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
