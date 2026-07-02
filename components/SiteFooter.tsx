export default function SiteFooter() {
  return (
    <footer className="bg-hdb-dark text-hdb-footer-text">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-[18px] px-[clamp(18px,4vw,40px)] py-[26px]">
        <div className="flex items-center gap-[10px] text-[13.5px]">
          <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-[7px] bg-hdb-accent-strong text-[13px] font-black text-white">
            H
          </span>
          <span className="font-semibold text-[#dbeee4]">
            © {new Date().getFullYear()} — Ammar
          </span>
        </div>
        <div className="flex flex-wrap gap-[22px] text-[13.5px] font-semibold">
          <a
            href="mailto:info@medziel.de"
            className="inline-flex items-center gap-[7px] text-hdb-footer-text no-underline transition-colors hover:text-white"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            info@medziel.de
          </a>
          <a
            href="https://www.linkedin.com/in/ammarelnasser/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[7px] text-hdb-footer-text no-underline transition-colors hover:text-white"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
