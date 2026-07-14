import Features from "@/components/Features";
import api from "@/lib/axios";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import WhyTorino from "@/components/WhyTorino";
import ContactBanner from "@/components/ContactBanner";

async function getTours(searchParams) {
  const response = await api.get("/tour", { params: searchParams });
  return response.data;
}

const vehicleMap = {
  bus: "اتوبوس",
  ship: "کشتی",
  train: "قطار",
  airplane: "پرواز",
  SUV: "شاسی‌بلند",
};

function getMonthName(dateString) {
  if (!dateString) return "";
  try {
    return new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(
      new Date(dateString)
    );
  } catch {
    return "";
  }
}

function getDurationDays(start, end) {
  if (!start || !end) return null;
  const days = Math.round(
    (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
  );
  return days > 0 ? days : null;
}

function toPersianDigits(value) {
  if (value === null || value === undefined) return "";
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(value).replace(/[0-9]/g, (digit) => persianDigits[digit]);
}

export default async function Home({ searchParams }) {
  const tours = await getTours(searchParams);
  const allTours = await getTours({});

  const originsMap = new Map();
  const destinationsMap = new Map();

  allTours.forEach((tour) => {
    if (tour.origin) originsMap.set(tour.origin.id, tour.origin);
    if (tour.destination)
      destinationsMap.set(tour.destination.id, tour.destination);
  });
  const origins = Array.from(originsMap.values());
  const destinations = Array.from(destinationsMap.values());

  return (
    <div className="w-full bg-[#fbfbfb]" dir="rtl">
      {/* ۱. بنر اصلی */}
      <section
        className="relative flex h-48 items-end justify-center bg-cover bg-center px-4 pb-6 sm:h-64 md:h-80"
        style={{
          backgroundImage: "url('/hero-banner.png')",
        }}
      />

      {/* ۲. نوشته‌ی هدر */}
      <div className="text-center mt-6 mb-4">
        <h1 className="text-xl font-normal tracking-wide text-zinc-800 sm:text-2xl">
  <span className="text-green-600 font-normal">تورینو</span> برگزار کننده بهترین تورهای داخلی و خارجی
</h1>
      </div>

      {/* ۳. فرم جستجو */}
      <SearchForm origins={origins} destinations={destinations} />

      {/* ۴. لیست تورها */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-lg font-bold text-zinc-800">همه تور ها</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tours.map((tour) => {
            const month = getMonthName(tour.startDate);
            const days = getDurationDays(tour.startDate, tour.endDate);
            const vehicle = vehicleMap[tour.fleetVehicle] || tour.fleetVehicle;

            const subtitleParts = [];
            if (month) subtitleParts.push(`${month} ماه`);
            if (days) subtitleParts.push(`${toPersianDigits(days)} روزه`);
            if (vehicle) subtitleParts.push(vehicle);

            return (
              <Link
                key={tour.id}
                href={`/tours/${tour.id}`}
                className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg flex flex-col justify-between"
              >
                <div className="h-32 w-full overflow-hidden bg-zinc-200 relative">
                  <img
                    src={tour.image || "https://images.unsplash.com/photo-1686965472911-b745c10e48f4?fm=jpg&q=80&w=600"}
                    alt={tour.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-zinc-800 text-sm line-clamp-1">
                    {tour.title}
                  </h3>

                  {subtitleParts.length > 0 && (
                    <p className="mt-1 text-xs text-zinc-400">
                      {subtitleParts.join(" . ")}
                    </p>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-green-600 font-bold">
                      {tour.price?.toLocaleString()} تومان
                    </p>
                    <span className="rounded-md bg-green-600 px-3 py-1 text-xs text-white">
                      بلیط
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <ContactBanner />
      <WhyTorino />
      <Features />
    </div>
  );
}