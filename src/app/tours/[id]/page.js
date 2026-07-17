import api from "@/lib/axios";
import BookButton from "@/components/BookButton";
import {
  ShieldCheck,
  Users,
  Bus,
  CalendarDays,
} from "lucide-react";
import Image from "next/image";
import { translateCity } from "@/lib/cityMap";

async function getTour(id) {
  const response = await api.get(`/tour/${id}`);
  return response.data;
}

function formatDate(dateString) {
  if (!dateString) return "-";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

function getDuration(start, end) {
  if (!start || !end) return null;
  const days = Math.round(
    (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
  );
  if (days <= 0) return null;
  return `${days} روز و ${days - 1} شب`;
}

const vehicleMap = {
  bus: "اتوبوس",
  ship: "کشتی",
  train: "قطار",
  airplane: "هواپیما",
  SUV: "شاسی‌بلند",
};

export default async function TourDetailPage({ params }) {
  const tour = await getTour(params.id);

  const duration = getDuration(tour.startDate, tour.endDate);
  const vehicleLabel = vehicleMap[tour.fleetVehicle] || tour.fleetVehicle;
  const insuranceLabel = tour.insurance ? "دارد" : "ندارد";

  const infoItems = [
    {
      label: "مبدا",
      value: translateCity(tour.origin?.name),
      icon: <Image src="/map.png" alt="مبدا" width={20} height={20} />,
    },
    {
      label: "تاریخ رفت",
      value: formatDate(tour.startDate),
      icon: <CalendarDays size={20} className="text-green-600" />,
    },
    {
      label: "تاریخ برگشت",
      value: formatDate(tour.endDate),
      icon: <CalendarDays size={20} className="text-green-600" />,
    },
    {
      label: "حمل و نقل",
      value: vehicleLabel,
      icon: <Bus size={20} className="text-green-600" />,
    },
    {
      label: "ظرفیت",
      value: tour.availableSeats,
      icon: <Users size={20} className="text-green-600" />,
    },
    {
      label: "بیمه",
      value: insuranceLabel,
      icon: <ShieldCheck size={20} className="text-green-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 sm:py-10" dir="rtl">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-4 shadow-md sm:p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row-reverse md:justify-between">
          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-xl font-black text-zinc-800 sm:text-2xl">
              {tour.title}
            </h1>

            {duration && <p className="text-sm text-zinc-500">{duration}</p>}

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <div className="flex items-center gap-1">
                <Image src="/medal-star.png" alt="تضمین کیفیت" width={18} height={18} />
                <span>تضمین کیفیت</span>
              </div>
              <div className="flex items-center gap-1">
                <Image src="/user-tick.png" alt="برنامه سفر" width={18} height={18} />
                <span>تورلیدر از مبدا</span>
              </div>
            </div>

            <BookButton
              tourId={tour.id}
              className="w-full rounded-lg bg-green-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700 sm:w-fit"
            >
              رزرو و خرید
            </BookButton>

            <p className="text-lg font-black text-green-600">
              {tour.price?.toLocaleString()}{" "}
              <span className="text-sm font-medium text-zinc-500">تومان</span>
            </p>
          </div>

          <div className="h-48 w-full flex-shrink-0 overflow-hidden rounded-xl bg-zinc-200 sm:h-64 md:h-72 md:w-72">
            {tour.image && (
              <img
                src={tour.image}
                alt={tour.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-y-6 border-t border-zinc-100 pt-6 sm:grid-cols-3 md:grid-cols-6">
          {infoItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 text-center">
              {item.icon}
              <span className="text-xs text-zinc-400">{item.label}</span>
              <span className="text-sm font-bold text-zinc-700">
                {item.value ?? "-"}
              </span>
            </div>
          ))}
        </div>

        {tour.options?.length > 0 && (
          <p className="mt-6 border-t border-zinc-100 pt-4 text-sm text-zinc-500">
            امکانات: {tour.options.join("، ")}
          </p>
        )}
      </div>
    </div>
  );
}