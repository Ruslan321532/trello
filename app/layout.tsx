import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConf } from "@/config/sites";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConf.name,
    template: `%s | ${siteConf.name}`,
  },
  description: siteConf.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
