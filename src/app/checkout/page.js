"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const passengerSchema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  nationalCode: yup.string().required("کد ملی الزامی است"),
  gender: yup.string().required("جنسیت الزامی است"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

function getDuration(start, end) {
  if (!start || !end) return null;
  const days = Math.round(
    (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
  );
  if (days <= 0) return null;
  return `${days} روز و ${days - 1} شب`;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tourId = searchParams.get("tourId");
  const [tour, setTour] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(passengerSchema),
  });

  useEffect(() => {
    async function fetchTour() {
      if (!tourId) return;
      const response = await api.get(`/tour/${tourId}`);
      setTour(response.data);
    }
    fetchTour();
  }, [tourId]);

  async function onSubmit(formData) {
    try {
      await api.post("/order", formData);
      toast.success("تور با موفقیت خریداری شد");
      router.push("/my-tours");
    } catch (error) {
      toast.error("خطا در ثبت سفارش");
    }
  }

  const duration = tour ? getDuration(tour.startDate, tour.endDate) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10" dir="rtl">
      <h1 className="mb-6 text-lg font-bold text-zinc-800 sm:text-xl">
        ثبت و خرید نهایی
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
        {/* کارت خلاصه تور - سمت راست */}
        <div className="order-1 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          {tour ? (
            <>
              <h2 className="mb-1 text-lg font-black text-zinc-800">
                {tour.title}
              </h2>
              {duration && (
                <p className="mb-4 text-sm text-zinc-500">{duration}</p>
              )}

              <div className="mb-6 flex items-center justify-between border-t border-zinc-100 pt-4">
                <span className="text-sm text-zinc-400">قیمت نهایی</span>
                <span className="text-xl font-black text-green-600">
                  {tour.price?.toLocaleString()}{" "}
                  <span className="text-xs font-medium text-zinc-500">
                    تومان
                  </span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full rounded-lg bg-green-600 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? "در حال ثبت..." : "ثبت و خرید نهایی"}
              </button>
            </>
          ) : (
            <>
              <Skeleton height={24} width="60%" />
              <div className="mt-2">
                <Skeleton height={14} width="40%" />
              </div>
              <div className="mb-6 mt-4 border-t border-zinc-100 pt-4">
                <Skeleton height={28} width="80%" />
              </div>
              <Skeleton height={48} borderRadius={8} />
            </>
          )}
        </div>

        {/* فرم مشخصات مسافر - سمت چپ */}
        <div className="order-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-zinc-800">مشخصات مسافر</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                {...register("fullName")}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-right text-zinc-900 outline-none focus:border-green-500"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="کد ملی"
                {...register("nationalCode")}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-right text-zinc-900 outline-none focus:border-green-500"
              />
              {errors.nationalCode && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.nationalCode.message}
                </p>
              )}
            </div>

            <div>
              <select
                {...register("gender")}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-right text-zinc-900 outline-none focus:border-green-500"
              >
                <option value="">جنسیت</option>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="date"
                placeholder="تاریخ تولد"
                {...register("birthDate")}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-right text-zinc-900 outline-none focus:border-green-500"
              />
              {errors.birthDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}