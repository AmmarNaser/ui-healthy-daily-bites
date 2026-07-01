interface BenefitCardProps {
  number: string;
  title: string;
  description: string;
  variant?: "hero" | "modal";
}

export default function BenefitCard({ number, title, description, variant = "hero" }: BenefitCardProps) {
  if (variant === "modal") {
    return (
      <div className="flex items-start gap-[13px] rounded-[13px] border border-hdb-border-light bg-background p-4">
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-[8px] bg-hdb-accent text-[13px] font-extrabold text-white">
          {number}
        </span>
        <div>
          <div className="mb-[3px] text-[14.5px] font-bold text-foreground">{title}</div>
          <div className="text-[13px] leading-[1.5] text-hdb-muted">{description}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-[14px] rounded-[14px] border border-hdb-border bg-white p-5 px-[22px]">
      <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[8px] bg-hdb-accent-light text-sm font-extrabold text-hdb-accent">
        {number}
      </span>
      <div>
        <div className="mb-1 text-[15.5px] font-bold text-foreground">{title}</div>
        <div className="text-sm leading-[1.55] text-hdb-muted">{description}</div>
      </div>
    </div>
  );
}
