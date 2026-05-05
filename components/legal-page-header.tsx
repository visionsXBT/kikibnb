"use client";

import Link from "next/link";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "./language-provider";
import { t } from "../lib/i18n";

export function LegalPageHeader() {
  const { lang } = useLanguage();

  return (
    <header className="legal-page-header">
      <Link href="/" className="legal-page-home">
        {t(lang, "chatHome")}
      </Link>
      <LanguageToggle variant="chat" />
    </header>
  );
}
