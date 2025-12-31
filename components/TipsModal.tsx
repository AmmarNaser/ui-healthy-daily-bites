"use client";

import { DailyTip } from "@/lib/getDailyTip";

interface TipsModalProps {
  tips: DailyTip[];
  isOpen: boolean;
  onClose: () => void;
}

export default function TipsModal({ tips, isOpen, onClose }: TipsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col border-2 border-emerald-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">All Health Tips</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 bg-gradient-to-b from-white to-emerald-50/20">
          {tips.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No health tips available.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {tips.map((tip) => (
              <div
                key={tip.id}
                className="border-2 border-emerald-200 rounded-3xl p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Date */}
                <div className="mb-5 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="text-xs text-emerald-600 font-bold tracking-wider uppercase">
                    {tip.date}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-6 leading-tight">
                  {tip.title}
                </h3>

                {/* Health Tip Section */}
                {tip.healthTip && (
                  <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-lg font-semibold flex-1">
                        {tip.healthTip}
                      </p>
                    </div>
                  </div>
                )}

                {/* Steps Section - Display ALL steps */}
                {tip.steps && tip.steps.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-emerald-700 mb-5 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
                      Key Benefits ({tip.steps.length}):
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tip.steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex gap-4 p-5 rounded-xl bg-gradient-to-br from-white to-emerald-50/50 border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-base shadow-lg">
                            {step.number}
                          </div>
                          <div className="flex-1 pt-1">
                            <h5 className="font-bold text-emerald-700 mb-2 text-base leading-tight">
                              {step.title}
                            </h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Tip Section */}
                {tip.quickTip && (
                  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-90">Quick Tip</div>
                        <p className="text-white font-semibold leading-relaxed">
                          {tip.quickTip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fallback for tips without structured data */}
                {!tip.healthTip && !tip.steps && !tip.quickTip && (
                  <div className="text-gray-700 leading-relaxed text-lg">
                    <p>{tip.content || "No additional information available."}</p>
                  </div>
                )}
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

