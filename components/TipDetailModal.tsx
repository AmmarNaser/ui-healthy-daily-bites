"use client";

import { DailyTip } from "@/lib/getDailyTip";
import BenefitCard from "@/components/BenefitCard";
import QuickTip from "@/components/QuickTip";

interface TipDetailModalProps {
  tip: DailyTip;
  onClose: () => void;
}

export default function TipDetailModal({ tip, onClose }: TipDetailModalProps) {
  return (
    <div
      onClick={onClose}
      className="animate-hdb-overlay fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[rgba(10,25,18,0.55)] p-[clamp(12px,4vw,48px)] backdrop-blur-[3px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-hdb-pop w-full max-w-[720px] overflow-hidden rounded-[20px] bg-white shadow-[0_40px_80px_-30px_rgba(10,25,18,0.6)]"
      >
        <div className="relative border-b border-hdb-border bg-background px-[clamp(22px,4vw,34px)] py-[clamp(22px,4vw,32px)]">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-[18px] top-[18px] flex h-9 w-9 items-center justify-center rounded-[9px] border border-hdb-border bg-white text-[#5c6b64]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div className="mb-3 flex items-center gap-[9px]">
            <span className="h-[7px] w-[7px] rounded-full bg-hdb-accent" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-hdb-muted-2">{tip.date}</span>
          </div>
          <h2 className="mb-[10px] max-w-[18ch] text-[clamp(24px,4vw,34px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-foreground">
            {tip.title}
          </h2>
          <p className="text-[15.5px] leading-[1.6] text-hdb-text-soft">{tip.content}</p>
        </div>

        <div className="px-[clamp(22px,4vw,34px)] py-[clamp(22px,4vw,32px)]">
          {tip.steps && tip.steps.length > 0 && (
            <>
              <div className="mb-4 text-xs font-extrabold uppercase tracking-[0.13em] text-hdb-accent">
                Why it matters
              </div>
              <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3">
                {tip.steps.map((step) => (
                  <BenefitCard
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                    variant="modal"
                  />
                ))}
              </div>
            </>
          )}

          {tip.quickTip && <QuickTip text={tip.quickTip} variant="modal" />}
        </div>
      </div>
    </div>
  );
}
