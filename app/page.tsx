import { getDailyTip, getAllDailyTips } from "@/lib/getDailyTip";
import TipsPageClient from "@/components/TipsPageClient";

export default async function Home() {
  const dailyTip = await getDailyTip();
  const allTips = await getAllDailyTips();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 text-white shadow-xl backdrop-blur-sm border-b border-emerald-400/20 flex-shrink-0">
        <div className="container mx-auto px-6 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="text-xl font-bold tracking-tight">
                This Domain for Sale: $500
              </div>
            </div>
            <div className="text-sm font-medium">
              <a
                href="mailto:me@ammarhub.com"
                className="hover:text-emerald-100 transition-all duration-300 hover:underline decoration-2 underline-offset-4">
                me@ammarhub.com
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center container mx-auto px-6 max-w-5xl animate-fade-in-up overflow-y-auto">
        <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-emerald-100/50">
          <div className="text-center mb-6">
            <div className="inline-block mb-2">
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
              Today&apos;s Health Tip
            </h1>
            <p className="text-emerald-600/70 text-base font-medium">
              Daily Health Tips
            </p>
          </div>
          {dailyTip ? (
            <TipsPageClient dailyTip={dailyTip} allTips={allTips} />
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center">
              <p className="text-gray-600 text-lg">
                No information available at the moment
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-700 text-white flex-shrink-0 shadow-2xl border-t border-emerald-500/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-base font-semibold tracking-wide">
              © 2025 - Ammar
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
              <a
                href="mailto:me@ammarhub.com"
                className="hover:text-emerald-200 transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                me@ammarhub.com
              </a>
              <a
                href="https://www.linkedin.com/in/ammarelnasser/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-200 transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
