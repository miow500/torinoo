"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white pt-12 pb-4 text-zinc-800" dir="rtl">
      <div className="mx-auto max-w-6xl px-4">
        
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-3 md:gap-8">
          
          <div className="flex flex-col items-center text-center md:items-start md:text-right">
            <h4 className="text-xl font-black text-zinc-800">تورینو</h4>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm font-medium text-zinc-500">
              <li><Link href="#" className="hover:text-zinc-900 transition-colors">درباره ما</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 transition-colors">تماس با ما</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 transition-colors">چرا تورینو</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 transition-colors">بیمه مسافرتی</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-right">
            <h4 className="text-xl font-black text-zinc-800">خدمات مشتریان</h4>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm font-medium text-zinc-500">
              <li><Link href="#" className="hover:text-zinc-900 transition-colors">پشتیبانی آنلاین</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 transition-colors">راهنمای خرید</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 transition-colors">راهنمای استرداد</Link></li>
              <li><Link href="#" className="hover:text-zinc-900 transition-colors">پرسش و پاسخ</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-right">
           <img src="/Torino (4) 1.png" alt="Torino" className="h-9 w-auto object-contain" />
            <p className="mt-5 text-sm font-semibold text-zinc-700">
              تلفن پشتیبانی: <span className="font-sans font-bold text-base text-zinc-800">۰۲۱-۸۵۷۴</span>
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start items-center">
  <img src="/state-airline-f45c55b2 1.png" alt="سازمان هواپیمایی" className="h-10 w-auto object-contain" />
  <img src="/passenger-rights-48368f81 1.png" alt="حقوق مسافر" className="h-8 w-auto object-contain" />
  <img src="/ecunion-35c3c933.png" alt="کسب و کارهای مجازی" className="h-10 w-auto object-contain" />
  <img src="/samandehi-6e2b448a.png" alt="ساماندهی" className="h-10 w-auto object-contain" />
  <img src="/aira-682b7c43.png" alt="دامنه نرخ بلیط" className="h-10 w-auto object-contain" />
</div>
          </div>

        </div>

        <div className="border-t border-zinc-100 pt-5 text-center text-xs font-medium text-zinc-400">
          کلیه حقوق این وب سایت متعلق به تورینو میباشد.
        </div>

      </div>
    </footer>
  );
}