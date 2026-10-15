import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "یک دوست — یه بغل، تو یه جعبه",
    template: SITE.titleTemplate,
  },
  description: SITE.description,
  openGraph: {
    locale: SITE.locale,
    siteName: SITE.nameFa,
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧸</text></svg>",
  },
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
