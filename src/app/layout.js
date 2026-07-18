import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import OfflineNotice from "@/components/OfflineNotice";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "تورینو",
  description: "سایت رزرو تور",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-white`}
      >
        <AuthProvider>
          <OfflineNotice />
          <Header />
          {children}
          <Footer />
          <ToastContainer position="top-center" rtl />
        </AuthProvider>
      </body>
    </html>
  );
}