"use client";

import Link from "next/link";
import { useLanguage } from "../components/language-provider";
import { t } from "../lib/i18n";

export function LandingActions() {
  const { lang } = useLanguage();

  return (
    <div className="actions">
      <Link href="/chat" className="btn btn--primary">
        {t(lang, "start")}
      </Link>
    </div>
  );
}
