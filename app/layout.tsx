import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import CartProviders from "@/components/cart/CartProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Adorsi Ethiopia Specialty Coffee",
  description: "Adorsi Specialty Coffee",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1D2636" },
    { media: "(prefers-color-scheme: dark)", color: "#1D2636" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${cormorant.variable}`}
      >
        <CartProviders>{children}</CartProviders>
      </body>
    </html>
  );
}