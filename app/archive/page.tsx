import { getAllDailyTips } from "@/lib/getDailyTip";
import ArchiveGrid from "@/components/ArchiveGrid";

export default async function Archive() {
  const allTips = await getAllDailyTips();

  return (
    <div className="animate-hdb-fade">
      <div className="mb-7">
        <h1 className="mb-2 text-[clamp(26px,4.4vw,38px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-foreground">
          Tip Archive
        </h1>
        <p className="text-[15px] text-hdb-muted">
          Every health tip we&apos;ve published, newest first. Tap any card to read the full breakdown.
        </p>
      </div>

      <ArchiveGrid tips={allTips} />
    </div>
  );
}
