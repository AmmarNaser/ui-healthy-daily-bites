"use client";

import { useState } from "react";
import DailyCard from "@/components/DailyCard";
import TipsModal from "@/components/TipsModal";
import { DailyTip } from "@/lib/getDailyTip";

interface TipsPageClientProps {
  dailyTip: DailyTip;
  allTips: DailyTip[];
}

export default function TipsPageClient({ dailyTip, allTips }: TipsPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DailyCard
        title={dailyTip.title}
        content={dailyTip.content}
        date={dailyTip.date}
        onClick={() => setIsModalOpen(true)}
        tip={dailyTip}
      />
      <TipsModal
        tips={allTips}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

