"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";
import Link from "next/link";
import { toPersianDigits } from "@/lib/toPersianDigits";

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
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  function handleLogout() {
    setIsAccountMenuOpen(false);
    logout();
  }

  return (
    <>
      <header className="w-full bg-white border-b border-zinc-100 px-4 sm:px-8 md:px-12 py-4" dir="rtl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* سمت راست: دکمه همبرگری (موبایل) + لوگو */}
          <div className="flex items-center gap-3">
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

            <Link href="/" className="flex items-center">
              <img 
                src="/Torino (4) 1.png" 
                alt="Torino" 
                className="h-8 w-auto object-contain md:h-9"
              />
            </Link>
          </div>

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

          {/* سمت چپ: وضعیت کاربر */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-200 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-green-600 transition-transform ${isAccountMenuOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <span className="font-medium font-sans text-green-600">
  {user.mobile ? toPersianDigits(user.mobile) : "پنل کاربری"}
</span>
                </button>

                {isAccountMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsAccountMenuOpen(false)}
                    />
                    <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-2xl border border-zinc-100 bg-white p-2 shadow-lg">
                      <div className="px-3 py-2.5 text-sm font-bold text-zinc-800 font-sans">
                        {user.mobile ? toPersianDigits(user.mobile) : "-"}
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 flex-shrink-0">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>اطلاعات حساب کاربری</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>خروج از حساب کاربری</span>
                      </button>
                    </div>
                  </>
                )}
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
          </div>

        </div>

        {/* منوی کشویی موبایل (ناوبری) */}
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