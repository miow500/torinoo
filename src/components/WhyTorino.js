"use client";

import { useState } from "react";

const images = [
  { src: "/why-1.png", alt: "چرا تورینو ۱" },
  { src: "/why-2.png", alt: "چرا تورینو ۲" },
  { src: "/why-3.png", alt: "چرا تورینو ۳" },
  { src: "/why-4.png", alt: "چرا تورینو ۴" },
];

function toPersianDigits(num) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/[0-9]/g, (digit) => persianDigits[digit]);
}

export default function WhyTorino() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFading, setIsFading] = useState(false);

  function changeSlide(direction) {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => {
        if (direction === "next") {
          return prev === images.length ? 1 : prev + 1;
        }
        return prev === 1 ? images.length : prev - 1;
      });
      setIsFading(false);
    }, 200);
  }

  const activeIndex = currentSlide - 1;
  const behindIndex1 = (activeIndex + 1) % images.length;
  const behindIndex2 = (activeIndex + 2) % images.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12" dir="rtl">
      <div className="flex flex-col items-center gap-12 md:flex-row-reverse md:items-start">
        
        {/* استک عکس‌ها - حالا سمت چپ */}
        <div className="relative flex h-[260px] w-full items-center justify-center sm:h-[320px] md:h-[380px] md:w-1/2 md:justify-end">
          {/* لایه‌ی عقب دوم */}
          <div className="absolute left-0 top-4 h-56 w-40 overflow-hidden rounded-3xl border border-zinc-100 bg-white opacity-30 transition-opacity duration-500 ease-in-out sm:h-64 sm:w-48 md:left-0 md:top-6 md:h-72 md:w-56">
            <img
              src={images[behindIndex2].src}
              alt={images[behindIndex2].alt}
              className={`h-full w-full object-cover transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
            />
          </div>
          {/* لایه‌ی عقب اول */}
          <div className="absolute left-8 top-2 h-60 w-44 overflow-hidden rounded-3xl border border-zinc-100 bg-white opacity-60 shadow-md transition-opacity duration-500 ease-in-out sm:h-72 sm:w-52 md:left-10 md:top-3 md:h-80 md:w-60">
            <img
              src={images[behindIndex1].src}
              alt={images[behindIndex1].alt}
              className={`h-full w-full object-cover transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
            />
          </div>
          {/* عکس اصلی جلو */}
          <div className="absolute left-16 top-0 z-10 h-[240px] w-[190px] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl transition-opacity duration-500 ease-in-out sm:h-[300px] sm:w-[230px] md:left-20 md:h-[340px] md:w-[260px]">
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className={`h-full w-full object-cover transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
            />
          </div>
        </div>

        {/* متن - حالا سمت راست */}
        <div className="w-full md:w-1/2 md:pt-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-zinc-800 md:text-3xl">چرا <span className="text-green-600">تورینو</span> ؟</h2>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white font-bold text-sm">؟</span>
          </div>

          <h3 className="mt-6 text-lg font-bold text-zinc-700">تور طبیعت گردی و تاریخی</h3>
          
          <p className="mt-4 text-sm font-medium leading-7 text-zinc-500 text-justify">
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.
          </p>

          <div className="mt-10 flex items-center gap-4 text-zinc-400">
            <button 
              onClick={() => changeSlide("prev")}
              className="text-xl font-bold transition-colors hover:text-zinc-700"
            >
              ⬅
            </button>
            <span className="text-sm font-bold text-zinc-600 font-sans">{toPersianDigits(currentSlide)} / ۴</span>
            <button 
              onClick={() => changeSlide("next")}
              className="text-xl font-bold transition-colors hover:text-zinc-700"
            >
              ➔
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}