import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "جعبه آبی — یکی دوستت داره",
    template: SITE.titleTemplate,
  },
  description: SITE.description,
  openGraph: {
    locale: SITE.locale,
    siteName: SITE.nameFa,
    type: "website",
    // SEO-07 (audit wave 37): تصویر اشتراک‌گذاری — تلگرام/واتساپ بدون این
    // فایل هیچ تصویری نشان نمی‌داد. تولید خودکار: scripts/gen-og-image.mjs
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "جعبه آبی — یکی دوستت داره…",
      },
    ],
  },
  twitter: {
    // SEO-07: کارت بزرگ توییتر با همان تصویر OG
    card: "summary_large_image",
    title: "جعبه آبی — یکی دوستت داره",
    description: SITE.description,
    images: ["/og-default.jpg"],
  },
  // SEO-09 (audit wave 37): آیکون‌های واقعی از طریق file conventions
  // (src/app/favicon.ico + icon.png + apple-icon.png) سرو می‌شوند — Next
  // خودش <link rel="icon"> و apple-touch-icon را تزریق می‌کند؛ دیتا-URI
  // موقتِ ایموجی 🧸 حذف شد.
};

export const viewport: Viewport = {
  themeColor: "#00ABE7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground vazirmatn">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
