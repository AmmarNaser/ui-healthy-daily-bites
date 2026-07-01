import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import SaleBanner from "@/components/SaleBanner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Today's Health Tip - Healthy Daily Bites",
  description: "Daily health tips and wellness information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${publicSans.variable} antialiased flex flex-col min-h-screen bg-background`}>
        <div className="flex min-h-screen flex-col bg-background">
          <SaleBanner />
          <SiteHeader />
          <main className="mx-auto w-full max-w-[1120px] flex-1 px-[clamp(18px,4vw,40px)] py-[clamp(26px,4vw,52px)] pb-16">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
