import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getDailyTip } from "@/lib/getDailyTip";
import BenefitCard from "@/components/BenefitCard";
import QuickTip from "@/components/QuickTip";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Today");

  let dailyTip = null;
  try {
    dailyTip = await getDailyTip(locale);
  } catch (error) {
    console.error("Error loading tips:", error);
  }

  if (!dailyTip) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-hdb-border bg-white p-8 text-center">
        <p className="text-lg text-hdb-muted">{t("noTip")}</p>
      </div>
    );
  }

  return (
    <div className="animate-hdb-fade">
      <div className="mb-[18px] flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-hdb-accent-light px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-hdb-accent">
          {t("badge")}
        </span>
        <span className="text-[13px] font-semibold text-hdb-muted-2">{dailyTip.date}</span>
      </div>

      <h1 className="mb-4 max-w-[16ch] text-[clamp(30px,5.2vw,48px)] font-extrabold leading-[1.06] tracking-[-0.025em] text-foreground">
        {dailyTip.title}
      </h1>
      <p className="mb-[clamp(28px,4vw,40px)] max-w-[62ch] text-[clamp(15px,2.2vw,18px)] leading-[1.6] text-hdb-text-soft">
        {dailyTip.content}
      </p>

      {dailyTip.steps && dailyTip.steps.length > 0 && (
        <div className="mb-[clamp(20px,3vw,26px)] grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[14px]">
          {dailyTip.steps.map((step) => (
            <BenefitCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      )}

      {dailyTip.quickTip && <QuickTip text={dailyTip.quickTip} />}

      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-hdb-border pt-6">
        <div className="text-sm text-hdb-muted">{t("lookingForMore")}</div>
        <Link
          href="/archive"
          className="inline-flex items-center gap-2 rounded-[10px] bg-foreground px-5 py-3 text-sm font-bold text-white"
        >
          {t("viewArchive")}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
