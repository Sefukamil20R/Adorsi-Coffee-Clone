import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import AskBaristaAI from "@/components/common/AskBaristaAI";
import CartProviders from "@/components/cart/CartProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  title: "Adorsi Ethiopia Specialty Coffee",
  description: "Adorsi Specialty Coffee",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        <CartProviders>
          {children}

          <AskBaristaAI />
        </CartProviders>
      </body>
    </html>
  );
}