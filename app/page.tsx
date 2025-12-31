import DailyCard from "@/components/DailyCard";
import { getDailyTip } from "@/lib/getDailyTip";

export default async function Home() {
  const dailyTip = await getDailyTip();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <h1 className="mb-8 text-3xl font-semibold text-black dark:text-zinc-50">
            معلومة اليوم
          </h1>
          {dailyTip ? (
            <DailyCard
              title={dailyTip.title}
              content={dailyTip.content}
              date={dailyTip.date}
            />
          ) : (
            <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-zinc-700 dark:text-zinc-300">
                لا توجد معلومات متاحة حالياً
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
