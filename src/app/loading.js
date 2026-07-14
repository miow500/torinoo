import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HomeLoading() {
  return (
    <div className="w-full bg-[#fbfbfb]" dir="rtl">
      {/* اسکلتون بنر اصلی */}
      <div className="h-48 w-full sm:h-64 md:h-80">
        <Skeleton height="100%" />
      </div>

      {/* اسکلتون عنوان */}
      <div className="mx-auto mt-6 mb-4 max-w-md px-4">
        <Skeleton height={28} />
      </div>

      {/* اسکلتون فرم جستجو */}
      <div className="mx-auto max-w-4xl px-4 py-4">
        <Skeleton height={56} borderRadius={16} />
      </div>

      {/* اسکلتون لیست تورها */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 w-32">
          <Skeleton height={24} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-xl bg-white shadow-md">
              <Skeleton height={128} className="!block" />
              <div className="p-3">
                <Skeleton height={16} width="70%" />
                <div className="mt-2">
                  <Skeleton height={12} width="90%" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <Skeleton height={18} width={80} />
                  <Skeleton height={24} width={50} borderRadius={6} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}