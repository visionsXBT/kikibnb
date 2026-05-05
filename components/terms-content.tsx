"use client";

import { useLanguage } from "./language-provider";
import { t } from "../lib/i18n";

export function TermsContent() {
  const { lang } = useLanguage();

  const blocks = [
    { h: "termsH2Accept" as const, p: "termsPAccept" as const },
    { h: "termsH2Service" as const, p: "termsPService" as const },
    { h: "termsH2NotAdvice" as const, p: "termsPNotAdvice" as const },
    { h: "termsH2Conduct" as const, p: "termsPConduct" as const },
    { h: "termsH2ThirdParty" as const, p: "termsPThirdParty" as const },
    { h: "termsH2Disclaimer" as const, p: "termsPDisclaimer" as const },
    { h: "termsH2Changes" as const, p: "termsPChanges" as const },
  ];

  return (
    <main className="legal-page">
      <h1>{t(lang, "termsTitle")}</h1>
      <p className="legal-page-meta">{t(lang, "termsLastUpdated")}</p>
      <p className="legal-page-intro">{t(lang, "termsIntro")}</p>
      {blocks.map(({ h, p }) => (
        <section key={h} className="legal-section">
          <h2>{t(lang, h)}</h2>
          <p>{t(lang, p)}</p>
        </section>
      ))}
    </main>
  );
}
