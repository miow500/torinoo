"use client";
import { toPersianDigits } from "@/lib/toPersianDigits";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "صفحه اصلی", active: true },
  { href: "#", label: "خدمات گردشگری" },
  { href: "#", label: "درباره ما" },
  { href: "#", label: "تماس با ما" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white border-b border-zinc-100 px-4 sm:px-8 md:px-12 py-4" dir="rtl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* سمت راست: لوگو تورینو */}
         <Link href="/" className="flex items-center">
  <img 
    src="/Torino (4) 1.png" 
    alt="Torino" 
    className="h-8 w-auto object-contain md:h-9"
  />
</Link>

          {/* وسط: منوهای ناوبری (فقط در دسکتاپ) */}
          <nav className="hidden items-center gap-6 lg:gap-10 text-sm md:text-base font-medium text-zinc-600 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={link.active ? "text-[#22c55e] font-bold" : "hover:text-[#22c55e] transition-colors"}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* سمت چپ: وضعیت کاربر + دکمه همبرگری موبایل */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
               <Link 
  href="/profile" 
  className="flex items-center gap-1.5 sm:gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer whitespace-nowrap"
>
  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#22c55e]"></span>
  <span className="font-medium font-sans text-[#22c55e]" dir="ltr">
  {user.mobile ? toPersianDigits(user.mobile) : "پنل کاربری"}
</span>
</Link>
                
                <button 
                  onClick={logout} 
                  className="text-[11px] sm:text-xs text-red-500 hover:underline px-1 sm:px-2 py-1 whitespace-nowrap"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-300 bg-white px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 whitespace-nowrap"
              >
                <svg width="16" height="16" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>ورود | ثبت نام</span>
              </button>
            )}

            {/* دکمه همبرگری (فقط زیر md نمایش داده می‌شود) */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 md:hidden"
              aria-label="باز کردن منو"
            >
              {isMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* منوی کشویی موبایل */}
        {isMenuOpen && (
          <nav className="mt-4 flex flex-col gap-1 border-t border-zinc-100 pt-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={
                  link.active
                    ? "rounded-lg bg-green-50 px-4 py-2.5 text-sm font-bold text-[#22c55e]"
                    : "rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}