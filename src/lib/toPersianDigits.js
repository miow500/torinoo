export function toPersianDigits(value) {
     if (value === null || value === undefined) return "";
     const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
     return String(value).replace(/[0-9]/g, (digit) => persianDigits[digit]);
   }