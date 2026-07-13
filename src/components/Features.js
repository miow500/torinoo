"use client";

const featureList = [
  {
    id: 1,
    title: "تضمین کیفیت",
    description: "ارائه بهترین خدمات و تورهای باکیفیت استاندارد",
    icon: "/Group 16.png",
  },
  {
    id: 2,
    title: "پشتیبانی ۲۴ ساعته",
    description: "همراهی و پاسخگویی به شما در تمام مراحل سفر",
    icon: "/Group 17.png",
  },
  {
    id: 3,
    title: "بهترین قیمت",
    description: "مقرون‌به‌صرفه‌ترین نرخ تورها با بالاترین خدمات",
    icon: "/Group 18.png",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-white py-16 border-b border-zinc-100" dir="rtl">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-12">
          {featureList.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center md:flex-row md:text-right md:items-start gap-4 p-2"
            >
              <div className="flex-shrink-0">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="flex-col gap-1 md:pt-1">
                <h3 className="text-base font-black text-zinc-800 md:text-lg">
                  {feature.title}
                </h3>
                <p className="text-xs font-medium text-zinc-400 md:text-sm max-w-[240px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}