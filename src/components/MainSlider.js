"use client";

import { useState, useEffect } from "react";

// آرایه تصاویر به ترتیب دلخواه شما (کویر در اسلاید اول)
const slides = [
  {
    id: 1,
    src: "/image_SI3sJmh4_1727080822376_raw.png", // عکس کویر (اصل کاری)
    title: "تجربه رویایی کویر‌گردی با تورینو",
    subtitle: "سفری به اعماق آرامش کویر مصر و شهداد",
  },
  {
    id: 2,
    src: "/why-1.jpg",
    title: "جاده‌های بی‌انتها در انتظار شماست",
    subtitle: "طبیعت‌گردی و کمپینگ در بکرترین نقاط ایران",
  },
  {
    id: 3,
    src: "/why-2.jpg",
    title: "سفرهای گروهی و خاطره‌انگیز",
    subtitle: "با بهترین لیدرهای مجرب و اتوبوس‌های VIP",
  },
  {
    id: 4,
    src: "/why-3.png",
    title: "آرامشِ ناب در دل طبیعت",
    subtitle: "برنامه‌ریزی دقیق سفر از صفر تا صد با ما",
  },
];

export default function MainSlider() {
  const [current, setCurrent] = useState(0);

  // افکت برای تغییر اتوماتیک اسلایدها هر ۵ ثانیه یک‌بار
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[460px] w-full overflow-hidden bg-zinc-900 md:h-[540px]" dir="rtl">
      
      {/* تصاویر اسلایدر با افکت انیمیشن نرم (Fade) */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* تصویر بک‌گراند */}
          <img
            src={slide.src}
            alt={slide.title}
            className="h-full w-full object-cover object-center brightness-[0.65]"
          />
          
          {/* لایه متون روی عکس */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
            <h2 className="text-2xl font-black md:text-5xl leading-tight drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="mt-4 text-sm font-medium md:text-xl text-zinc-200 drop-shadow">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* دکمه‌های ناوبری دایره‌ای پایین اسلایدر (Dots) */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === current ? "bg-green-500 w-7" : "bg-white/50 w-2.5 hover:bg-white"
            }`}
          />
        ))}
      </div>

    </div>
  );
}