"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "zaman";
import { MapPin, Globe, CalendarDays } from "lucide-react";
import { translateCity } from "@/lib/cityMap";

export default function SearchForm({ origins = [], destinations = [] }) {
  const router = useRouter();
  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [date, setDate] = useState(null);

  function handleSearch() {
    const params = new URLSearchParams();
    if (originId) params.set("originId", originId);
    if (destinationId) params.set("destinationId", destinationId);
    if (date) params.set("startDate", date);
    router.push(`/?${params.toString()}`);
  }

  return (
    <div 
      className="mx-auto w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0" 
      dir="rtl"
    >
      
      {/* فیلد مبدا */}
      <div className="flex w-full items-center justify-start gap-2 px-5 py-2.5 sm:py-2 sm:w-1/4">
        <MapPin size={18} className="text-zinc-500 flex-shrink-0" />
        <select
          value={originId}
          onChange={(e) => setOriginId(e.target.value)}
          className="w-full bg-transparent text-right text-sm text-zinc-700 outline-none cursor-pointer appearance-none font-medium"
        >
          <option value="">مبدا</option>
          {origins.map((origin) => (
            <option key={origin.id} value={origin.id}>
              {translateCity(origin.name)}
            </option>
          ))}
        </select>
      </div>

      <div className="block h-[1px] w-full bg-zinc-100 sm:hidden"></div>
      <div className="hidden sm:block h-8 w-[1px] bg-zinc-200"></div>

      {/* فیلد مقصد */}
      <div className="flex w-full items-center justify-start gap-2 px-5 py-2.5 sm:py-2 sm:w-1/4">
        <Globe size={18} className="text-zinc-500 flex-shrink-0" />
        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
          className="w-full bg-transparent text-right text-sm text-zinc-700 outline-none cursor-pointer appearance-none font-medium"
        >
          <option value="">مقصد</option>
          {destinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {translateCity(destination.name)}
            </option>
          ))}
        </select>
      </div>

      <div className="block h-[1px] w-full bg-zinc-100 sm:hidden"></div>
      <div className="hidden sm:block h-8 w-[1px] bg-zinc-200"></div>

      {/* فیلد تاریخ */}
      <div className="flex w-full items-center justify-start gap-2 px-5 py-2.5 sm:py-2 sm:w-1/4">
        <CalendarDays size={18} className="text-zinc-500 flex-shrink-0" />
        <div className="w-full text-right">
          <DatePicker
            onChange={(value) => setDate(value.value)}
            inputAttributes={{
              placeholder: "تاریخ",
              className: "w-full bg-transparent text-right outline-none cursor-pointer text-sm text-zinc-700 font-medium",
            }}
          />
        </div>
      </div>

      {/* دکمه جستجو */}
      <div className="w-full p-1 sm:w-1/4 sm:flex sm:justify-end">
        <button
          onClick={handleSearch}
          className="w-full rounded-xl bg-[#28a745] py-3 px-8 text-center text-base font-bold text-white shadow-sm transition-all hover:bg-[#218838] sm:max-w-[180px]"
        >
          جستجو
        </button>
      </div>

    </div>
  );
}