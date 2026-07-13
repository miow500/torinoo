"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-12 px-4 py-16 md:flex-row md:gap-20 bg-white" dir="rtl">
      
      {/* سمت چپ: تصویر تلویزیون در حال سوختن */}
      <div className="w-full max-w-[340px] md:max-w-[420px]">
        <img 
          src="/Error TV.png" 
          alt="صفحه مورد نظر یافت نشد!" 
          className="h-auto w-full object-contain"
        />
      </div>

      {/* سمت راست: پیام متنی و دکمه */}
      <div className="flex flex-col items-center text-center md:items-start md:text-right">
        <h1 className="text-2xl font-black text-zinc-800 md:text-4xl leading-snug">
          صفحه مورد نظر یافت نشد!
        </h1>
        
        <Link 
          href="/"
          className="mt-8 inline-block rounded-xl bg-green-100 px-10 py-3.5 text-base font-bold text-green-600 transition-all hover:bg-green-200"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>

    </div>
  );
}