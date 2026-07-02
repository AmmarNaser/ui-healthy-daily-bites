"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("SiteHeader");
  const isArchive = pathname?.startsWith("/archive");

  const navBase =
    "rounded-[9px] px-4 py-[9px] text-sm font-bold transition-colors";
  const navActive = `${navBase} bg-hdb-accent-light text-hdb-accent`;
  const navIdle = `${navBase} bg-transparent text-hdb-nav-idle hover:bg-hdb-accent-light/60`;

  const langBase = "rounded-[7px] px-2 py-1 text-xs font-bold transition-colors";
  const langActive = `${langBase} bg-hdb-accent-light text-hdb-accent`;
  const langIdle = `${langBase} text-hdb-nav-idle hover:bg-hdb-accent-light/60`;

  return (
    <header className="sticky top-0 z-20 border-b border-hdb-border-light bg-hdb-header transition-colors">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-[clamp(18px,4vw,40px)] py-4">
        <Link href="/" className="flex items-center gap-[11px]">
          <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[9px] bg-hdb-accent-strong text-[17px] font-black text-white">
            H
          </span>
          <span className="text-lg font-extrabold tracking-[-0.015em] text-foreground">
            Healthy Daily Bites
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1.5">
            <Link href="/" className={isArchive ? navIdle : navActive}>
              {t("today")}
            </Link>
            <Link href="/archive" className={isArchive ? navActive : navIdle}>
              {t("archive")}
            </Link>
            <ThemeToggle />
          </nav>
          <div className="flex items-center gap-1 border-l border-hdb-border-light pl-4">
            <Link
              href={pathname}
              locale="en"
              className={locale === "en" ? langActive : langIdle}
            >
              EN
            </Link>
            <Link
              href={pathname}
              locale="de"
              className={locale === "de" ? langActive : langIdle}
            >
              DE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
