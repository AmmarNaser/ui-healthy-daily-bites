"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SaleBanner() {
  const t = useTranslations("SaleBanner");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const raw = await response.text();
      let data: { error?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as { error?: string }) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        setErrorMessage(
          typeof data?.error === "string" && data.error.length > 0
            ? data.error
            : t("genericError"),
        );
        setIsSubmitting(false);
        return;
      }

      setOfferSent(true);
      setIsSubmitting(false);
    } catch {
      setErrorMessage(t("networkError"));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-hdb-dark text-[#eafff4]">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-[clamp(18px,4vw,40px)] py-3">
        <div className="flex items-center gap-[11px] text-sm font-semibold">
          <span className="h-2 w-2 flex-none rounded-full bg-hdb-success-dot shadow-[0_0_0_4px_rgba(74,222,156,0.22)]" />
          <span>
            {t("forSale")} <b className="font-extrabold text-hdb-success">$500</b>
          </span>
        </div>

        {offerSent ? (
          <div className="flex items-center gap-[9px] text-[13.5px] font-semibold text-hdb-success">
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-hdb-accent-strong">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12l5 5L20 6" />
              </svg>
            </span>
            {t("offerSent")}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-wrap items-start gap-2">
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="h-[38px] w-[210px] max-w-[52vw] rounded-[9px] border border-hdb-dark-border bg-hdb-dark-2 px-[13px] text-[13px] text-hdb-dark-text outline-none transition-shadow"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[38px] whitespace-nowrap rounded-[9px] bg-hdb-accent-strong px-[18px] text-[13px] font-bold text-white disabled:opacity-60"
              >
                {isSubmitting ? t("sending") : t("makeOffer")}
              </button>
            </div>
            {errorMessage && (
              <p className="w-full text-right text-xs font-medium text-red-300">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
