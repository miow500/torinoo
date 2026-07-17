export const cityMap = {
  Tehran: "تهران",
  Sananndaj: "سنندج",
  Madrid: "مادرید",
  Isfahan: "اصفهان",
  Sulaymaniyah: "سلیمانیه",
  Hewler: "هولیر",
  Mazandaran: "مازندران",
  Gilan: "گیلان",
  Italy: "ایتالیا",
};

export function translateCity(name) {
  if (!name) return "-";
  return cityMap[name] || name;
}