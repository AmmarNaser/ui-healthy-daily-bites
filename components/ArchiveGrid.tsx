"use client";

import { useState } from "react";
import { DailyTip } from "@/lib/getDailyTip";
import TipDetailModal from "@/components/TipDetailModal";

interface ArchiveGridProps {
  tips: DailyTip[];
}

export default function ArchiveGrid({ tips }: ArchiveGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openTip = tips.find((t) => t.id === openId) ?? null;

  if (tips.length === 0) {
    return (
      <div className="rounded-2xl border border-hdb-border-light bg-white p-6">
        <p className="text-hdb-muted">No tips are available in the archive right now.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {tips.map((tip) => (
          <button
            key={tip.id}
            onClick={() => setOpenId(tip.id)}
            className="group flex flex-col gap-3 rounded-2xl border border-hdb-border bg-white px-6 py-[22px] text-left transition-all duration-200 hover:-translate-y-[3px] hover:border-[#cfe6dc] hover:shadow-[0_18px_34px_-20px_rgba(20,50,38,0.35)]"
          >
            <div className="flex items-center gap-[9px]">
              <span className="h-[7px] w-[7px] flex-none rounded-full bg-hdb-accent" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.13em] text-hdb-muted-2">{tip.date}</span>
            </div>
            <div className="text-xl font-extrabold leading-[1.15] tracking-[-0.015em] text-foreground">{tip.title}</div>
            <div className="text-sm leading-[1.55] text-hdb-muted">{tip.content}</div>
            <div className="mt-auto inline-flex items-center gap-[7px] pt-1.5 text-[13.5px] font-bold text-hdb-accent">
              Read tip
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {openTip && <TipDetailModal tip={openTip} onClose={() => setOpenId(null)} />}
    </>
  );
}
