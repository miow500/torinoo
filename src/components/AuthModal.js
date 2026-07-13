"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, verifySchema } from "@/schemas/loginSchema";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import OtpInput from "react18-input-otp";
import Modal from "./Modal";
import { useAuth } from "@/context/AuthContext";

const RESEND_SECONDS = 95;

function toPersianDigits(value) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(value).replace(/[0-9]/g, (digit) => persianDigits[digit]);
}

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return toPersianDigits(`${m}:${s.toString().padStart(2, "0")}`);
}

export default function AuthModal({ isOpen, onClose }) {
  const { setUser } = useAuth();
  const [step, setStep] = useState("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(RESEND_SECONDS);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (step !== "otp") return;
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timeLeft]);

  async function sendOtpRequest(mobileNumber) {
    const response = await api.post("/auth/send-otp", {
      mobile: mobileNumber,
    });
    return response;
  }

  async function onSendOtp(formData) {
    try {
      const response = await sendOtpRequest(formData.mobile);
      toast.success(response.data.message || "کد تأیید ارسال شد");
      setMobile(formData.mobile);
      setOtp("");
      setTimeLeft(RESEND_SECONDS);
      setStep("otp");
    } catch (error) {
      toast.error("خطا در ارسال کد تأیید");
    }
  }

  async function handleResend() {
    if (timeLeft > 0) return;
    try {
      await sendOtpRequest(mobile);
      toast.success("کد جدید ارسال شد");
      setOtp("");
      setTimeLeft(RESEND_SECONDS);
    } catch (error) {
      toast.error("خطا در ارسال مجدد کد");
    }
  }

  async function onVerifyOtp() {
    try {
      const response = await api.post("/auth/check-otp", {
        mobile: mobile,
        code: otp,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userMobile", mobile);
      setUser({ isLoggedIn: true, mobile: mobile });

      toast.success("ورود با موفقیت انجام شد");
      onClose();
    } catch (error) {
      toast.error("کد وارد شده صحیح نیست");
    }
  }

  function handleBackToPhone() {
    setStep("phone");
    setOtp("");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton={step === "otp"}>
      {step === "otp" && (
        <button
          onClick={handleBackToPhone}
          className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-800 transition-colors"
          aria-label="بازگشت"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {step === "phone" ? (
        <>
          <h1 className="mb-6 text-center text-xl font-bold text-zinc-800">
            ورود به تورینو
          </h1>
          <form
            onSubmit={handleSubmit(onSendOtp)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                شماره موبایل خود را وارد کنید
              </label>
              <input
                type="text"
                dir="ltr"
                placeholder="0912 000 0000"
                {...register("mobile")}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-left font-sans text-zinc-900 outline-none focus:border-green-500"
              />
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-green-600 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال کد تأیید"}
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="mb-2 text-center text-xl font-bold text-zinc-800">
            کد تایید را وارد کنید.
          </h1>
          <p className="mb-6 text-center text-sm text-zinc-500">
            کد تایید به شماره <span className="font-sans">{toPersianDigits(mobile)}</span> ارسال شد
          </p>

          <div className="mb-4 flex justify-center" dir="ltr">
            <OtpInput
              value={otp}
              onChange={(value) => setOtp(value)}
              numInputs={6}
              isInputNum
              shouldAutoFocus
              inputStyle={{
                width: "2.3rem",
                height: "2.6rem",
                margin: "0 3px",
                borderRadius: "8px",
                border: "1px solid #d4d4d8",
                fontSize: "1rem",
                color: "#18181b",
              }}
            />
          </div>

          <div className="mb-6 text-center text-xs text-zinc-400">
            {timeLeft > 0 ? (
              <span>{formatTimer(timeLeft)} تا ارسال مجدد کد</span>
            ) : (
              <button
                onClick={handleResend}
                className="font-bold text-green-600 hover:underline"
              >
                ارسال مجدد کد
              </button>
            )}
          </div>

          <button
            onClick={onVerifyOtp}
            className="w-full rounded-lg bg-green-600 py-2 text-white transition-colors hover:bg-green-700"
          >
            ورود به تورینو
          </button>
        </>
      )}
    </Modal>
  );
}