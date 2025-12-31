"use client";

interface DailyCardProps {
  title: string;
  content: string;
  date?: string;
  onClick?: () => void;
}

export default function DailyCard({ title, content, date, onClick }: DailyCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/30 p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-transparent to-green-50/0 group-hover:from-emerald-50/50 group-hover:to-green-50/30 transition-all duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {date && (
          <div className="mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            <div className="text-sm text-emerald-600 font-semibold tracking-wide uppercase">
              {date}
            </div>
          </div>
        )}
        <h2 className="mb-5 text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent leading-tight">
          {title}
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-medium">{content}</p>
        {onClick && (
          <div className="mt-4 text-emerald-600 font-semibold text-sm flex items-center gap-2">
            <span>Click to view all tips</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
}

