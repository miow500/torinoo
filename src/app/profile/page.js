"use client";
import { toPersianDigits } from "@/lib/toPersianDigits";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
    email: "",
    fullName: "",
    nationalCode: "",
    gender: "",
    birthDate: "",
    shabaNumber: "",
    cardNumber: "",
    bankName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-zinc-800" dir="rtl">
      <div className="flex flex-col gap-6 md:flex-row items-start">

        {/* ---------------- سایدبار ---------------- */}
        <aside className="w-full md:w-1/4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <nav className="flex flex-col gap-1">
            <Link href="/profile" className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-600 transition-colors">
              <img src="/profile.png" alt="پروفایل" className="h-5 w-5" />
              <span>پروفایل</span>
            </Link>

            <Link href="/my-tours" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
              <img src="/sun-fog.png" alt="تورهای من" className="h-5 w-5 opacity-70" />
              <span>تور های من</span>
            </Link>

            <Link href="/transactions" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
              <img src="/convert-card.png" alt="تراکنش‌ها" className="h-5 w-5 opacity-70" />
              <span>تراکنش ها</span>
            </Link>
          </nav>
        </aside>

        {/* ---------------- محتوای اصلی ---------------- */}
        <main className="w-full md:w-3/4 flex flex-col gap-6">

          {/* بخش اول: اطلاعات حساب کاربری (ایمیل + موبایل) */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-base font-black text-zinc-800 border-b border-zinc-100 pb-3">
              اطلاعات حساب کاربری
            </h2>

            <div className="flex flex-col gap-4">
              {/* ردیف ایمیل: اینپوت + دکمه تأیید */}
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  placeholder="آدرس ایمیل"
                  className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 focus:border-green-500 focus:outline-none"
                />
                <button className="flex-shrink-0 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-700">
                  تأیید
                </button>
              </div>

              {/* ردیف شماره موبایل: فقط نمایشی */}
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-medium text-zinc-500">شماره موبایل</span>
                <span className="text-sm font-bold text-zinc-800 font-sans" dir="ltr">
  {user?.mobile ? toPersianDigits(user.mobile) : "-"}
</span>
              </div>
            </div>
          </div>

          {/* بخش دوم: اطلاعات شخصی */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-base font-black text-zinc-800 border-b border-zinc-100 pb-3">
              اطلاعات شخصی
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                placeholder="نام و نام خانوادگی"
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 focus:border-green-500 focus:outline-none"
              />

              <input
                type="text"
                name="nationalCode"
                value={profileData.nationalCode}
                onChange={handleChange}
                placeholder="کد ملی"
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 font-sans focus:border-green-500 focus:outline-none"
              />

              <select
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 focus:border-green-500 focus:outline-none"
              >
                <option value="">جنسیت</option>
                <option value="مرد">مرد</option>
                <option value="زن">زن</option>
              </select>

              <input
                type="text"
                name="birthDate"
                value={profileData.birthDate}
                onChange={handleChange}
                placeholder="تاریخ تولد"
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 font-sans focus:border-green-500 focus:outline-none"
              />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-700">
                تأیید
              </button>
              <button className="rounded-lg border border-zinc-300 bg-white px-6 py-2.5 text-sm font-bold text-zinc-600 transition-colors hover:bg-zinc-50">
                انصراف
              </button>
            </div>
          </div>

          {/* بخش سوم: اطلاعات حساب بانکی */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-base font-black text-zinc-800 border-b border-zinc-100 pb-3">
              اطلاعات حساب بانکی
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <input
                type="text"
                name="shabaNumber"
                value={profileData.shabaNumber}
                onChange={handleChange}
                placeholder="شماره شبا"
                dir="ltr"
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 font-sans text-left focus:border-green-500 focus:outline-none"
              />

              <input
                type="text"
                name="cardNumber"
                value={profileData.cardNumber}
                onChange={handleChange}
                placeholder="شماره کارت"
                dir="ltr"
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 font-sans text-left focus:border-green-500 focus:outline-none"
              />

              <input
                type="text"
                name="bankName"
                value={profileData.bankName}
                onChange={handleChange}
                placeholder="نام بانک"
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 focus:border-green-500 focus:outline-none"
              />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-700">
                تأیید
              </button>
              <button className="rounded-lg border border-zinc-300 bg-white px-6 py-2.5 text-sm font-bold text-zinc-600 transition-colors hover:bg-zinc-50">
                انصراف
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}