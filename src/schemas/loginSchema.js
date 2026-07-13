import * as yup from "yup";

export const loginSchema = yup.object({
  mobile: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

export const verifySchema = yup.object({
  code: yup
    .string()
    .required("کد تأیید الزامی است")
    .matches(/^\d{6}$/, "کد تأیید باید ۶ رقم باشد"),
});