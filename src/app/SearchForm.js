"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "zaman";
import { MapPin, Globe, CalendarDays, ChevronDown } from "lucide-react";
import { translateCity } from "@/lib/cityMap";

function CustomDropdown({ icon, placeholder, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-start gap-2 px-5 py-2.5 sm:py-2"
      >
        {icon}
        <span className="flex-1 text-right text-sm font-medium text-zinc-700 truncate">
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-zinc-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 max-h-64 w-full min-w-[180px] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="block w-full rounded-lg px-3 py-2 text-right text-sm text-zinc-400 hover:bg-zinc-50"
          >
            {placeholder}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`block w-full rounded-lg px-3 py-2 text-right text-sm transition-colors ${
                opt.value === value
                  ? "bg-green-50 font-bold text-green-600"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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

  const originOptions = origins.map((o) => ({ value: o.id, label: translateCity(o.name) }));
  const destinationOptions = destinations.map((d) => ({ value: d.id, label: translateCity(d.name) }));

  return (
    <div 
      className="mx-auto w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0" 
      dir="rtl"
    >
      
      {/* فیلد مبدا */}
      <div className="w-full sm:w-1/4">
        <CustomDropdown
          icon={<MapPin size={18} className="text-zinc-500 flex-shrink-0" />}
          placeholder="مبدا"
          options={originOptions}
          value={originId}
          onChange={setOriginId}
        />
      </div>

      <div className="block h-[1px] w-full bg-zinc-100 sm:hidden"></div>
      <div className="hidden sm:block h-8 w-[1px] bg-zinc-200"></div>

      {/* فیلد مقصد */}
      <div className="w-full sm:w-1/4">
        <CustomDropdown
          icon={<Globe size={18} className="text-zinc-500 flex-shrink-0" />}
          placeholder="مقصد"
          options={destinationOptions}
          value={destinationId}
          onChange={setDestinationId}
        />
      </div>

      <div className="block h-[1px] w-full bg-zinc-100 sm:hidden"></div>
      <div className="hidden sm:block h-8 w-[1px] bg-zinc-200"></div>

      {/* فیلد تاریخ */}
      <div className="relative flex w-full items-center justify-start gap-2 px-5 py-2.5 sm:py-2 sm:w-1/4">
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