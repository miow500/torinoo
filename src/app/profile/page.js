"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toPersianDigits } from "@/lib/toPersianDigits";

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

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  function handleSavePersonal() {
    setIsEditingPersonal(false);
  }
  function handleSaveBank() {
    setIsEditingBank(false);
  }
  function handleSaveEmail() {
    setIsEditingEmail(false);
  }

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

          {/* بخش اول: اطلاعات حساب کاربری */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h2 className="mb-5 text-base font-black text-zinc-800 border-b border-zinc-100 pb-3">
              اطلاعات حساب کاربری
            </h2>

            <div className="flex flex-col gap-4">
              {/* ردیف ایمیل */}
              <div className="flex items-center justify-between rounded-xl bg-zinc-50/50 px-4 py-3">
                <span className="text-sm font-medium text-zinc-500">ایمیل</span>

                {isEditingEmail ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      placeholder="آدرس ایمیل"
                      autoFocus
                      className="w-56 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                    />
                    <button
                      onClick={handleSaveEmail}
                      className="rounded-md px-2 py-1 text-xs font-bold text-green-600 transition-colors hover:bg-green-50"
                    >
                      تأیید
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-zinc-800">
                      {profileData.email || "—"}
                    </span>
                    <button
                      onClick={() => setIsEditingEmail(true)}
                      className="rounded-md px-2 py-1 text-xs font-bold text-blue-500 transition-colors hover:bg-blue-50"
                    >
                      {profileData.email ? "ویرایش" : "افزودن"}
                    </button>
                  </div>
                )}
              </div>

              {/* ردیف شماره موبایل (فقط نمایشی) */}
              <div className="flex items-center justify-between rounded-xl bg-zinc-50/50 px-4 py-3">
                <span className="text-sm font-medium text-zinc-500">شماره موبایل</span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-zinc-800 font-sans" dir="ltr">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {user?.mobile ? toPersianDigits(user.mobile) : "-"}
                </span>
              </div>
            </div>
          </div>

          {/* بخش دوم: اطلاعات شخصی */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-5 flex items-center justify-between border-b border-zinc-100 pb-3">
              <h2 className="text-base font-black text-zinc-800">اطلاعات شخصی</h2>
              <button
                onClick={() =>
                  isEditingPersonal ? handleSavePersonal() : setIsEditingPersonal(true)
                }
                className="rounded-md px-2.5 py-1 text-xs font-bold text-blue-500 transition-colors hover:bg-blue-50"
              >
                {isEditingPersonal ? "تأیید" : "ویرایش اطلاعات"}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* نام و نام خانوادگی */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400">نام و نام خانوادگی</span>
                {isEditingPersonal ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    placeholder="نام و نام خانوادگی"
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                ) : (
                  <div className={`rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-sm font-bold ${profileData.fullName ? "text-zinc-700" : "text-zinc-300 font-normal"}`}>
                    {profileData.fullName || "وارد نشده"}
                  </div>
                )}
              </div>

              {/* کد ملی */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400">کد ملی</span>
                {isEditingPersonal ? (
                  <input
                    type="text"
                    name="nationalCode"
                    value={profileData.nationalCode}
                    onChange={handleChange}
                    placeholder="کد ملی"
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-sans text-zinc-700 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                ) : (
                  <div className={`rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-sm font-bold font-sans ${profileData.nationalCode ? "text-zinc-700" : "text-zinc-300 font-normal"}`}>
                    {profileData.nationalCode || "وارد نشده"}
                  </div>
                )}
              </div>

              {/* جنسیت */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400">جنسیت</span>
                {isEditingPersonal ? (
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="مرد">مرد</option>
                    <option value="زن">زن</option>
                  </select>
                ) : (
                  <div className={`rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-sm font-bold ${profileData.gender ? "text-zinc-700" : "text-zinc-300 font-normal"}`}>
                    {profileData.gender || "وارد نشده"}
                  </div>
                )}
              </div>

              {/* تاریخ تولد */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400">تاریخ تولد</span>
                {isEditingPersonal ? (
                  <input
                    type="text"
                    name="birthDate"
                    value={profileData.birthDate}
                    onChange={handleChange}
                    placeholder="۱۳۷۰/۰۱/۰۱"
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-sans text-zinc-700 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                ) : (
                  <div className={`rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-sm font-bold font-sans ${profileData.birthDate ? "text-zinc-700" : "text-zinc-300 font-normal"}`}>
                    {profileData.birthDate || "وارد نشده"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* بخش سوم: اطلاعات حساب بانکی */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-5 flex items-center justify-between border-b border-zinc-100 pb-3">
              <h2 className="text-base font-black text-zinc-800">اطلاعات حساب بانکی</h2>
              <button
                onClick={() =>
                  isEditingBank ? handleSaveBank() : setIsEditingBank(true)
                }
                className="rounded-md px-2.5 py-1 text-xs font-bold text-blue-500 transition-colors hover:bg-blue-50"
              >
                {isEditingBank ? "تأیید" : "ویرایش اطلاعات"}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* شماره کارت */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400">شماره کارت</span>
                {isEditingBank ? (
                  <input
                    type="text"
                    name="cardNumber"
                    value={profileData.cardNumber}
                    onChange={handleChange}
                    placeholder="۶۰۳۷۹۹۱۸۲۷۳۶۴۵۵۴"
                    dir="ltr"
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-sans text-left text-zinc-700 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                ) : (
                  <div className={`rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-sm font-bold font-sans text-left ${profileData.cardNumber ? "text-zinc-700 tracking-widest" : "text-zinc-300 font-normal"}`} dir={profileData.cardNumber ? "ltr" : "rtl"}>
                    {profileData.cardNumber
                      ? profileData.cardNumber.match(/.{1,4}/g)?.join(" - ")
                      : "—"}
                  </div>
                )}
              </div>

              {/* شماره شبا */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400">شماره شبا</span>
                {isEditingBank ? (
                  <input
                    type="text"
                    name="shabaNumber"
                    value={profileData.shabaNumber}
                    onChange={handleChange}
                    placeholder="IR000000000000000000000000"
                    dir="ltr"
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-sans text-left text-zinc-700 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                ) : (
                  <div className={`rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-sm font-bold font-sans text-left ${profileData.shabaNumber ? "text-zinc-700" : "text-zinc-300 font-normal"}`} dir={profileData.shabaNumber ? "ltr" : "rtl"}>
                    {profileData.shabaNumber || "—"}
                  </div>
                )}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}