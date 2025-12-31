import DailyCard from "@/components/DailyCard";
import { getAllDailyTips } from "@/lib/getDailyTip";

export default async function Archive() {
  const allTips = await getAllDailyTips();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <h1 className="mb-8 text-3xl font-semibold text-black dark:text-zinc-50">
            أرشيف
          </h1>
          {allTips.length > 0 ? (
            <div className="flex flex-col gap-4">
              {allTips.map((tip) => (
                <DailyCard
                  key={tip.id}
                  title={tip.title}
                  content={tip.content}
                  date={tip.date}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-zinc-700 dark:text-zinc-300">
                لا توجد معلومات في الأرشيف حالياً
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

