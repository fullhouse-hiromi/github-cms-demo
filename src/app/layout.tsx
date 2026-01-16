import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Blog",
  description: "技術的なことや日常のことを書くブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <header className="border-b border-gray-200">
          <nav className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold hover:text-gray-600">
              My Blog
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-gray-600">
                ホーム
              </Link>
              <Link href="/blog" className="hover:text-gray-600">
                記事一覧
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-12">
          <div className="max-w-3xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            &copy; 2025 My Blog
          </div>
        </footer>
      </body>
    </html>
  );
}
