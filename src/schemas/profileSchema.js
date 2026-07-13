import * as yup from "yup";

export const profileSchema = yup.object({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  email: yup
    .string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),
  gender: yup.string().required("جنسیت الزامی است"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
  nationalCode: yup.string().required("کد ملی الزامی است"),
  shaba_code: yup.string().required("شماره شبا الزامی است"),
  debitCard_code: yup.string().required("شماره کارت الزامی است"),
  accountIdentifier: yup.string().required("شماره حساب الزامی است"),
});