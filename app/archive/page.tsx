import DailyCard from "@/components/DailyCard";
import { getAllDailyTips } from "@/lib/getDailyTip";

export default async function Archive() {
  const allTips = await getAllDailyTips();

  return (
    <div className="flex h-screen justify-center bg-zinc-50 font-sans">
      <main className="flex h-screen w-full max-w-3xl flex-col bg-white px-6 py-8 sm:px-16 sm:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-black">Archive</h1>
          <a
            href="/"
            className="text-sm font-semibold text-emerald-700 underline underline-offset-4 transition-colors hover:text-emerald-800">
            Back to Today&apos;s Tip
          </a>
        </div>

        <div className="w-full flex-1 overflow-y-auto pr-1">
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
            <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-zinc-700">
                No tips are available in the archive right now.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
