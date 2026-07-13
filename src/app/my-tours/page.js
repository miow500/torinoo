"use client";

import { useState } from "react";
import Link from "next/link";

// دیتای تورها همراه با آیکون‌های اورجینال ارسالی شما
const initialMyTours = [
  {
    id: "1",
    title: "تور کویر مصر تا یزد",
    transport: "اتوبوس ۲۵ صندلی VIP",
    transportIcon: "/bus.png",
    startDate: "۲۸ خرداد ۱۴۰۳",
    endDate: "۳۱ خرداد ۱۴۰۳",
    tourNumber: "102458",
    price: "۴,۵۰۰,۰۰۰ تومان",
  },
  {
    id: "2",
    title: "سفر دریایی جزیره هرمز",
    transport: "کشتی تندرو کاتاماران",
    transportIcon: "/ship.png", // آیکون جدید کشتی
    startDate: "۰۵ تیر ۱۴۰۳",
    endDate: "۱۰ تیر ۱۴۰۳",
    tourNumber: "103254",
    price: "۱۲,۰۰۰,۰۰۰ تومان",
  },
  {
    id: "3",
    title: "تور خط ساحلی چابهار",
    transport: "هواپیما (پرواز معراج)",
    transportIcon: "/airplane.png",
    startDate: "۱۲ اردیبهشت ۱۴۰۳",
    endDate: "۱۶ اردیبهشت ۱۴۰۳",
    tourNumber: "101963",
    price: "۸,۲۰۰,۰۰۰ تومان",
  },
];

export default function MyToursPage() {
  const [myTours] = useState(initialMyTours);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-zinc-800" dir="rtl">
      <div className="flex flex-col gap-6 md:flex-row items-start">
        
        {/* ---------------- سمت راست: منوی کناری پروفایل (Sidebar) ---------------- */}
        <aside className="w-full md:w-1/4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <nav className="flex flex-col gap-1">
            
            <Link href="/profile" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
              <img src="/profile.png" alt="پروفایل" className="h-5 w-5 opacity-70" />
              <span>اطلاعات حساب کاربری</span>
            </Link>

            {/* گزینه فعال: تورهای من */}
            <Link href="/my-tours" className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-600 transition-colors">
              <img src="/sun-fog.png" alt="تورهای من" className="h-5 w-5" />
              <span>تورهای من</span>
            </Link>

            <Link href="/transactions" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
              <img src="/convert-card.png" alt="تراکنش‌ها" className="h-5 w-5 opacity-70" />
              <span>تراکنش‌ها</span>
            </Link>

          </nav>
        </aside>

        {/* ---------------- سمت چپ: کارت اصلی لیست تورهای من ---------------- */}
        <main className="w-full md:w-3/4 flex flex-col gap-4">
          
          {myTours.map((tour) => (
            <div 
              key={tour.id} 
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5"
            >
              {/* ردیف اول: عنوان تور و جزییات وسیله نقلیه */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div className="flex min-w-0 items-center gap-3">
                  {/* قرارگیری آیکون اصل کاری خورشید و مه مخصوص کارت‌ها */}
                  <img src="/sun-fog (3).png" alt="وضعیت تور" className="h-5 w-5 flex-shrink-0 object-contain" />
                  <h3 className="truncate text-base font-black text-zinc-800">{tour.title}</h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-600">
                  {/* لود خودکار آیکون‌های اتوبوس، هواپیما یا کشتی بر اساس نوع تور */}
                  <img src={tour.transportIcon} alt={tour.transport} className="h-4 w-auto object-contain" />
                  <span>{tour.transport}</span>
                </div>
              </div>

              {/* ردیف دوم: اطلاعات زمان‌بندی و قیمت */}
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs font-medium text-zinc-500">
                
                {/* تاریخ رفت */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400">تاریخ رفت</span>
                  <span className="text-zinc-700 font-bold">{tour.startDate}</span>
                </div>

                {/* تاریخ برگشت */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400">تاریخ برگشت</span>
                  <span className="text-zinc-700 font-bold">{tour.endDate}</span>
                </div>

                {/* شماره تور */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400">شماره تور</span>
                  <span className="text-zinc-700 font-sans font-bold pt-1">{tour.tourNumber}</span>
                </div>

                {/* مبلغ پرداخت شده */}
                <div className="flex flex-col gap-1.5 sm:items-end">
                  <span className="text-zinc-400">مبلغ پرداخت شده</span>
                  <span className="text-green-600 text-sm font-black font-sans">{tour.price}</span>
                </div>

              </div>

            </div>
          ))}

        </main>

      </div>
    </div>
  );
}