"use client";

import Image from "next/image";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-[70vh] flex-col-reverse items-center justify-center gap-8 px-4 md:flex-row md:gap-12 lg:gap-20">
      
      {/* متن سمت راست */}
      <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-right">
        <h1 className="text-xl font-bold text-zinc-800 sm:text-2xl">
          اتصال با سرور برقرار نیست!
        </h1>

        <p className="text-sm text-zinc-500 sm:text-base">
          لطفا بعدا دوباره امتحان کنید.
        </p>

        <button
          onClick={() => reset()}
          className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
        >
          تلاش مجدد
        </button>
      </div>

      {/* عکس سمت چپ */}
      <div className="flex-shrink-0">
        <Image
          src="/images/error/error-lamp-robot.png"
          alt="Server Error"
          width={280}
          height={280}
          priority
          className="h-auto w-48 sm:w-64 md:w-72 lg:w-80"
        />
      </div>

    </div>
  );
}