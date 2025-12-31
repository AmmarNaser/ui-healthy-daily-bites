interface DailyCardProps {
  title: string;
  content: string;
  date?: string;
}

export default function DailyCard({ title, content, date }: DailyCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {date && (
        <div className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
          {date}
        </div>
      )}
      <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <p className="text-zinc-700 dark:text-zinc-300">{content}</p>
    </div>
  );
}

