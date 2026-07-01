"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const isArchive = pathname?.startsWith("/archive");

  const navBase =
    "rounded-[9px] px-4 py-[9px] text-sm font-bold transition-colors";
  const navActive = `${navBase} bg-hdb-accent-light text-hdb-accent`;
  const navIdle = `${navBase} bg-transparent text-hdb-nav-idle hover:bg-hdb-accent-light/60`;

  return (
    <header className="sticky top-0 z-20 border-b border-hdb-border-light bg-white">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-[clamp(18px,4vw,40px)] py-4">
        <Link href="/" className="flex items-center gap-[11px]">
          <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[9px] bg-hdb-accent text-[17px] font-black text-white">
            H
          </span>
          <span className="text-lg font-extrabold tracking-[-0.015em] text-foreground">
            Healthy Daily Bites
          </span>
        </Link>
        <nav className="flex items-center gap-1.5">
          <Link href="/" className={isArchive ? navIdle : navActive}>
            Today
          </Link>
          <Link href="/archive" className={isArchive ? navActive : navIdle}>
            Archive
          </Link>
        </nav>
      </div>
    </header>
  );
}
