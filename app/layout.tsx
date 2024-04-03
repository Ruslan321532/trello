import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Layout from '@/components/loader';
import { siteConf } from '@/config/sites';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConf.name,
    template: `%s | ${siteConf.name}`,
  },
  description: siteConf.description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
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
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
