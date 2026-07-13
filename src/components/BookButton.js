"use client";

import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export default function BookButton({
  tourId,
  className = "mt-6 w-full rounded-lg bg-green-600 py-2 text-white transition-colors hover:bg-green-700",
  children = "ثبت و خرید نهایی",
}) {
  const router = useRouter();
  const { user } = useAuth();

  async function handleBook() {
    if (!user) {
      toast.error("ابتدا وارد حساب کاربری خود شوید");
      return;
    }

    try {
      await api.put(`/basket/${tourId}`);
      router.push(`/checkout?tourId=${tourId}`);
    } catch (error) {
      toast.error("خطا در افزودن تور به سبد خرید");
    }
  }

  return (
    <button onClick={handleBook} className={className}>
      {children}
    </button>
  );
}