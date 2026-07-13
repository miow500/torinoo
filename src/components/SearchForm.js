"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "zaman";

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
      className="mx-auto w-full max-w-4xl rounded-full border border-zinc-200 bg-white p-2 shadow-sm flex items-center justify-between" 
      dir="rtl"
    >
      
      {/* فیلد مبدا */}
      <div className="flex w-full items-center justify-start gap-2 px-5 py-2 md:w-1/4">
        <span className="text-zinc-600 text-lg">📍</span>
        <select
          value={originId}
          onChange={(e) => setOriginId(e.target.value)}
          className="w-full bg-transparent text-right text-sm text-zinc-700 outline-none cursor-pointer appearance-none font-medium"
        >
          <option value="">مبدا</option>
          {origins.map((origin) => (
            <option key={origin.id} value={origin.id}>
              {origin.name}
            </option>
          ))}
        </select>
      </div>

      {/* خط جداکننده عمودی اول */}
      <div className="hidden md:block h-8 w-[1px] bg-zinc-200"></div>

      {/* فیلد مقصد */}
      <div className="flex w-full items-center justify-start gap-2 px-5 py-2 md:w-1/4">
        <span className="text-zinc-600 text-lg">🌍</span>
        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
          className="w-full bg-transparent text-right text-sm text-zinc-700 outline-none cursor-pointer appearance-none font-medium"
        >
          <option value="">مقصد</option>
          {destinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {destination.name}
            </option>
          ))}
        </select>
      </div>

      {/* خط جداکننده عمودی دوم */}
      <div className="hidden md:block h-8 w-[1px] bg-zinc-200"></div>

      {/* فیلد تاریخ */}
      <div className="flex w-full items-center justify-start gap-2 px-5 py-2 md:w-1/4">
        <span className="text-zinc-600 text-lg">📅</span>
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

      {/* دکمه جستجو کاملاً کپسولی و کشیده مطابق تصویر */}
      <div className="p-1 md:w-1/4 flex justify-end">
        <button
          onClick={handleSearch}
          className="w-full max-w-[180px] rounded-full bg-[#28a745] py-3 px-8 text-center text-base font-bold text-white shadow-sm transition-all hover:bg-[#218838]"
        >
          جستجو
        </button>
      </div>

    </div>
  );
}