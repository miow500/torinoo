"use client";

import { useState } from "react";
import Link from "next/link";

// دیتای فرضی تراکنش‌ها منطبق بر فیلدهای فیگما
const initialTransactions = [
  {
    id: "۱",
    tourName: "تور کویر مصر",
    date: "۱۴۰۳/۰۴/۱۵",
    transactionId: "TRX-857410",
    amount: "۴,۵۰۰,۰۰۰",
    status: "success", 
  },
  {
    id: "۲",
    tourName: "تور چابهار",
    date: "۱۴۰۳/۰۳/۲۲",
    transactionId: "TRX-963251",
    amount: "۸,۲۰۰,۰۰۰",
    status: "failed", 
  },
];

export default function TransactionsPage() {
  const [transactions] = useState(initialTransactions);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-zinc-800" dir="rtl">
      <div className="flex flex-col gap-6 md:flex-row items-start">
        
        {/* ---------------- سمت راست: منوی کناری پروفایل (Sidebar) ---------------- */}
        {/* ---------------- سمت راست: منوی کناری پروفایل (Sidebar) ---------------- */}
<aside className="w-full md:w-1/4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
  <nav className="flex flex-col gap-1">
    
    {/* اطلاعات حساب کاربری */}
    <Link href="/profile" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
      <img src="/profile.png" alt="پروفایل" className="h-5 w-5 opacity-70" />
      <span>اطلاعات حساب کاربری</span>
    </Link>

    {/* تورهای من - با آیکون جدید خورشید و مه */}
    <Link href="/my-tours" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
      <img src="/sun-fog.png" alt="تورهای من" className="h-5 w-5 opacity-70" />
      <span>تورهای من</span>
    </Link>

    {/* تراکنش‌ها (گزینه فعال) */}
    <Link href="/transactions" className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-600 transition-colors">
      <img src="/convert-card.png" alt="تراکنش‌ها" className="h-5 w-5" />
      <span>تراکنش‌ها</span>
    </Link>

  </nav>
</aside>

        {/* ---------------- سمت چپ: کارت اصلی تاریخچه تراکنش‌ها ---------------- */}
        <main className="w-full md:w-3/4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          
          {/* هدر بخش تراکنش‌ها */}
          <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4">
            <h1 className="text-lg font-black text-zinc-800">تاریخچه تراکنش‌ها</h1>
          </div>

          {/* ساختار جدول تراکنش‌ها */}
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-sm">
              
              <thead className="bg-zinc-50 font-bold text-zinc-500 border-b border-zinc-200">
                <tr>
                  <th className="p-4 rounded-r-xl">نام تور</th>
                  <th className="p-4">تاریخ</th>
                  <th className="p-4">شماره پیگیری</th>
                  <th className="p-4">مبلغ (تومان)</th>
                  <th className="p-4 rounded-l-xl">وضعیت</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                {transactions.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/40 transition-colors">
                    <td className="p-4 font-bold text-zinc-800">{item.tourName}</td>
                    <td className="p-4 text-zinc-500 font-sans">{item.date}</td>
                    <td className="p-4 text-zinc-400 font-sans">{item.transactionId}</td>
                    <td className="p-4 font-bold text-zinc-800 font-sans">{item.amount}</td>
                    <td className="p-4">
                      {item.status === "success" ? (
                        <span className="inline-block rounded-lg bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                          موفقیت‌آمیز
                        </span>
                      ) : (
                        <span className="inline-block rounded-lg bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                          ناموفق
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </main>

      </div>
    </div>
  );
}