import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "پیشتم — یه بغل، تو یه جعبه",
  description:
    "وب‌اپ هدیه‌ی دوستانه‌ی پیشتم: یه دوست پشمالو با کارت پستال رمزدار انتخاب کن، قلب و پنجه اضافه کن و بفرست. نسخه‌ی موبایل و دسکتاپ، کاملاً تعاملی.",
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
