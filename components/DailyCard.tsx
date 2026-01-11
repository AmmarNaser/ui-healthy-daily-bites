"use client";

import { DailyTip } from "@/lib/getDailyTip";

interface DailyCardProps {
  title: string;
  content: string;
  date?: string;
  onClick?: () => void;
  tip?: DailyTip;
}

export default function DailyCard({ title, content, date, onClick, tip }: DailyCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-3xl border border-emerald-200/50 bg-white p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-green-100/20 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-50/40 to-transparent rounded-full blur-2xl -z-0"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {date && (
          <div className="mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="text-xs text-emerald-600 font-bold tracking-wider uppercase">
              {date}
            </div>
          </div>
        )}
        
        <h2 className="mb-4 text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 bg-clip-text text-transparent leading-tight">
          {title}
        </h2>

        {/* Health Tip Section */}
        {tip?.healthTip && (
          <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-800 leading-relaxed text-base font-semibold flex-1">
                {tip.healthTip}
              </p>
            </div>
          </div>
        )}

        {/* Quick Tip Section */}
        {tip?.quickTip && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-90">Quick Tip</div>
                <p className="text-white font-semibold leading-relaxed text-sm">
                  {tip.quickTip}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Fallback to simple content if no structured data */}
        {!tip?.healthTip && !tip?.steps && (
          <p className="text-gray-700 leading-relaxed text-lg font-medium">{content}</p>
        )}

        {onClick && (
          <div className="mt-4 pt-4 border-t border-emerald-100">
            <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm hover:text-emerald-700 transition-colors group-hover:gap-3 duration-300">
              <span>View all health tips</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
}

