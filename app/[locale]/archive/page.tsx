import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllDailyTips } from "@/lib/getDailyTip";
import ArchiveGrid from "@/components/ArchiveGrid";

export default async function Archive({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Archive");
  const allTips = await getAllDailyTips(locale);

  return (
    <div className="animate-hdb-fade">
      <div className="mb-7">
        <h1 className="mb-2 text-[clamp(26px,4.4vw,38px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-foreground">
          {t("title")}
        </h1>
        <p className="text-[15px] text-hdb-muted">{t("subtitle")}</p>
      </div>

      <ArchiveGrid tips={allTips} />
    </div>
  );
}
