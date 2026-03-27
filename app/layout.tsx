import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import {getCategoryBySlug} from "@/app/shop/[categoryId]/page";


const notoSansSans = Noto_Sans(
    {
        variable: "--font-noto-sans",
    subsets: ["latin"]
    },
);

export const metadata: Metadata = {
  title: "Omni",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${notoSansSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      {children}</body>
    </html>
  );
}
