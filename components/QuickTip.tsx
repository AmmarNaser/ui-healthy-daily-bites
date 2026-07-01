interface QuickTipProps {
  text: string;
  variant?: "hero" | "modal";
}

export default function QuickTip({ text, variant = "hero" }: QuickTipProps) {
  if (variant === "modal") {
    return (
      <div className="flex items-center gap-[14px] rounded-[13px] bg-hdb-accent-light px-5 py-[18px]">
        <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[9px] bg-hdb-accent">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L4.5 12.5a7 7 0 1 0 15 0L13 2z" />
          </svg>
        </span>
        <div>
          <div className="mb-[3px] text-[11px] font-extrabold uppercase tracking-[0.14em] text-hdb-accent">Quick tip</div>
          <div className="text-[14.5px] font-semibold leading-[1.5] text-foreground">{text}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-[18px] rounded-2xl bg-hdb-accent px-[clamp(22px,3vw,28px)] py-[clamp(20px,3vw,26px)]">
      <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[11px] bg-white/16">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L4.5 12.5a7 7 0 1 0 15 0L13 2z" />
        </svg>
      </span>
      <div className="min-w-[220px] flex-1">
        <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#c8f5e2]">Quick tip</div>
        <div className="text-[clamp(15px,2.2vw,16.5px)] font-semibold leading-[1.5] text-white">{text}</div>
      </div>
    </div>
  );
}
