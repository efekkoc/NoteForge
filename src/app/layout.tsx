import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoteForge AI - Akıllı Ders Notu Kütüphanesi & Özetleyici",
  description:
    "Tahta ve el yazısı fotoğraflarını yapay zeka ile metne dönüştürün, özetleyin ve ders bazında düzenleyin.",
  manifest: "/manifest.json",
  themeColor: "#090d16",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NoteForge AI",
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <head>
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
