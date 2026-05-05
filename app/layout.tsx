import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { HtmlLang } from "../components/html-lang";
import { LanguageProvider } from "../components/language-provider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Kiki",
  description:
    "Kiki is an AI agent that analyzes the market and helps you act with clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>
        <LanguageProvider>
          <HtmlLang />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
