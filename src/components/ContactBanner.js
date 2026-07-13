"use client";

export default function ContactBanner() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8" dir="rtl">
      <div className="relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm md:h-60 md:flex-row">
        
        <div className="relative w-full md:w-3/4 h-48 md:h-full overflow-hidden bg-green-600">
          <img 
            src="/contact-banner.png" 
            alt="خرید تلفنی از تورینو" 
            className="h-full w-full object-cover object-right"
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center bg-white py-6 md:w-1/4 md:py-0">
          <div className="flex items-center gap-2 text-xl font-black text-zinc-800 md:text-2xl">
            <span className="text-lg">📞</span>
            <span className="font-sans font-bold">۰۲۱-۱۸۴۰</span>
          </div>
          <button className="mt-4 rounded-xl bg-[#124124] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-900">
            اطلاعات بیشتر
          </button>
        </div>

      </div>
    </div>
  );
}