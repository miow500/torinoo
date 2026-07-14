import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TourDetailLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 sm:py-10" dir="rtl">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-4 shadow-md sm:p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row-reverse md:justify-between">
          
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton height={28} width="60%" />
            <Skeleton height={16} width="40%" />
            <Skeleton height={20} width="70%" />
            <Skeleton height={44} width={160} borderRadius={8} />
            <Skeleton height={24} width="30%" />
          </div>

          <div className="h-48 w-full flex-shrink-0 overflow-hidden rounded-xl sm:h-64 md:h-72 md:w-72">
            <Skeleton height="100%" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-y-6 border-t border-zinc-100 pt-6 sm:grid-cols-3 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton circle height={20} width={20} />
              <Skeleton height={12} width={50} />
              <Skeleton height={14} width={60} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}