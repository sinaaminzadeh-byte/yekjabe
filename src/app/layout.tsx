import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "پیشتم — استودیوی طراحی وب‌اپ هدیه‌ی دوستانه",
  description:
    "تمام صفحه‌های طراحی‌شده‌ی وب‌اپ پیشتم در یک محیط یکپارچه؛ ۳۲ صفحه‌ی موبایل، وب، جزء و چاپ به‌هم‌لینک‌شده.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧸</text></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#04202E",
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
