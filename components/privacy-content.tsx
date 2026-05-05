"use client";

import { useLanguage } from "./language-provider";
import { t } from "../lib/i18n";

export function PrivacyContent() {
  const { lang } = useLanguage();

  const blocks = [
    { h: "privacyH2Collect" as const, p: "privacyPCollect" as const },
    { h: "privacyH2Use" as const, p: "privacyPUse" as const },
    { h: "privacyH2Share" as const, p: "privacyPShare" as const },
    { h: "privacyH2Retention" as const, p: "privacyPRetention" as const },
    { h: "privacyH2Security" as const, p: "privacyPSecurity" as const },
    { h: "privacyH2Rights" as const, p: "privacyPRights" as const },
    { h: "privacyH2Changes" as const, p: "privacyPChanges" as const },
  ];

  return (
    <main className="legal-page">
      <h1>{t(lang, "privacyTitle")}</h1>
      <p className="legal-page-meta">{t(lang, "privacyLastUpdated")}</p>
      <p className="legal-page-intro">{t(lang, "privacyIntro")}</p>
      {blocks.map(({ h, p }) => (
        <section key={h} className="legal-section">
          <h2>{t(lang, h)}</h2>
          <p>{t(lang, p)}</p>
        </section>
      ))}
    </main>
  );
}
