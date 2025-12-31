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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
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
        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-6">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="border border-emerald-200 rounded-xl p-6 bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-lg transition-all"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <div className="text-sm text-emerald-600 font-semibold">
                    {tip.date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-emerald-700 mb-3">
                  {tip.title}
                </h3>
                {tip.fullContent && (
                  <div className="prose prose-emerald max-w-none">
                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: tip.fullContent
                          // Headers
                          .replace(/^### (.+)$/gm, "<h3 class='text-xl font-bold text-emerald-700 mt-6 mb-3'>$1</h3>")
                          .replace(/^## (.+)$/gm, "<h2 class='text-2xl font-bold text-emerald-700 mt-6 mb-3'>$1</h2>")
                          .replace(/^# (.+)$/gm, "")
                          // Bold text
                          .replace(/\*\*(.+?)\*\*/g, "<strong class='font-semibold text-gray-800'>$1</strong>")
                          // Numbered list items with bold
                          .replace(/^(\d+)\.\s+\*\*(.+?)\*\*:\s*(.+)$/gm, "<p class='mb-3 text-base'><strong class='text-emerald-700'>$1. $2:</strong> $3</p>")
                          // Regular numbered list items
                          .replace(/^(\d+)\.\s+(.+)$/gm, "<p class='mb-3 text-base'>$1. $2</p>")
                          // Paragraphs (double newlines)
                          .replace(/\n\n+/g, "</p><p class='mb-4 text-base'>")
                          // Single newlines
                          .replace(/\n/g, "<br />")
                          // Wrap in paragraph tags
                          .replace(/^/, "<p class='mb-4 text-base'>")
                          .replace(/$/, "</p>"),
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

