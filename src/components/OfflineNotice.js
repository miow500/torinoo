"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function OfflineNotice() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    function handleOffline() {
      setIsOffline(true);
    }
    function handleOnline() {
      setIsOffline(false);
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-[999] flex min-h-screen flex-col-reverse items-center justify-center gap-8 bg-white px-4 md:flex-row md:gap-12 lg:gap-20">
      
      {/* متن سمت راست */}
      <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-right">
        <h1 className="text-xl font-bold text-zinc-800 sm:text-2xl">
          اتصال به اینترنت برقرار نیست!
        </h1>

        <p className="text-sm text-zinc-500 sm:text-base">
          لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
        >
          تلاش مجدد
        </button>
      </div>

      {/* عکس سمت چپ */}
      <div className="flex-shrink-0">
        <Image
          src="/images/error/error-lamp-robot.png"
          alt="No Internet Connection"
          width={280}
          height={280}
          priority
          className="h-auto w-48 sm:w-64 md:w-72 lg:w-80"
        />
      </div>

    </div>
  );
}