import Footer from "@/app/_components/footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Header from "./_components/header";
import GoogleAnalytics from "./_components/google-analytics";
import Script from "next/script";
import Clarity from "./_components/microsoft-clarity";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mengqi92.github.io'),
  title: `Mengqi's Blog`,
  description: `Mengqi's blog`,
  keywords: ['图像处理', 'git', '线性代数', '机器学习', '编程', '个人财务']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8258722689100385" crossOrigin="anonymous"></script>
        <GoogleAnalytics />
        <Clarity />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <Script id="vercount-init" strategy="lazyOnload" src="https://vercount.one/js"></Script>
      </head>
      <body className={`${inter.className} light:bg-slate-50 dark:bg-sky-950`}>
        <Header title="Mengqi's blog" />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
