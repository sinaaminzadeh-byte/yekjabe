'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LayoutGrid, Menu, PawPrint, Command } from 'lucide-react';
import { cn } from '@/lib/utils';

function Logo({ size = 38 }: { size?: number }) {
  return (
    <span
      className="relative grid place-items-center rounded-2xl bg-[#00ABE7] shadow-[0_6px_16px_rgba(0,171,231,0.35)] shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <PawPrint className="size-5 text-white" />
      <span className="absolute -bottom-1 -left-1 size-3.5 rounded-full bg-[#FF9DB8] ring-2 ring-white" />
    </span>
  );
}

interface HeaderProps {
  view: 'gallery' | 'viewer';
  onGallery: () => void;
  sidebarSlot?: React.ReactNode;
  drawerOpen?: boolean;
  onDrawerOpenChange?: (open: boolean) => void;
  onOpenPalette?: () => void;
  className?: string;
}

export function Header({
  view,
  onGallery,
  sidebarSlot,
  drawerOpen,
  onDrawerOpenChange,
  onOpenPalette,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'h-14 shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 border-b border-[#D3E8F0] bg-white/85 backdrop-blur z-20',
        className,
      )}
    >
      {sidebarSlot && (
        <div className="lg:hidden">
          <Sheet open={drawerOpen} onOpenChange={onDrawerOpenChange}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-9 rounded-xl border-[#D3E8F0]" aria-label="فهرست صفحه‌ها">
                <Menu className="size-4" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-[300px] bg-white">
              <SheetTitle className="sr-only">فهرست صفحه‌های طراحی</SheetTitle>
              <SheetDescription className="sr-only">جست‌وجو و باز کردن صفحه‌های دیزاین‌سیستم یک دوست</SheetDescription>
              {sidebarSlot}
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div className="flex items-center gap-2.5 min-w-0">
        <Logo />
        <div className="min-w-0">
          <h1 className="text-[15px] sm:text-base font-black text-[#04202E] leading-5">یک دوست</h1>
          <p className="hidden sm:block text-[10.5px] font-bold text-[#4A6572] leading-4">
            استودیوی صفحات طراحی — وب‌اپ هدیه‌ی دوستانه
          </p>
        </div>
      </div>

      <div className="ms-auto flex items-center gap-2">
        {onOpenPalette && (
          <Button
            variant="outline"
            onClick={onOpenPalette}
            className="hidden md:inline-flex rounded-xl border-[#D3E8F0] h-9 px-3 text-[12px] font-extrabold gap-2 text-[#4A6572] hover:text-[#04202E] hover:border-[#00ABE7]/50 bg-white/70"
            aria-label="جست‌وجوی سریع صفحه‌ها"
          >
            <Command className="size-3.5 text-[#00ABE7]" aria-hidden />
            برو به صفحه…
            <kbd className="rounded-md border border-[#D3E8F0] bg-[#F2FAFD] px-1.5 py-0.5 text-[10px] font-black text-[#4A6572]" dir="ltr">
              Ctrl K
            </kbd>
          </Button>
        )}
        {view === 'viewer' && (
          <Button
            variant="outline"
            onClick={onGallery}
            className="rounded-xl border-[#D3E8F0] h-9 px-3.5 text-[12.5px] font-extrabold gap-1.5"
          >
            <LayoutGrid className="size-4" aria-hidden />
            <span className="hidden sm:inline">گالری همه‌ی صفحه‌ها</span>
            <span className="sm:hidden">گالری</span>
          </Button>
        )}
      </div>
    </header>
  );
}

export { Logo };
