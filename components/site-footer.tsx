"use client";

import Link from "next/link";
import { useLanguage } from "./language-provider";
import { t } from "../lib/i18n";
import { SITE_LINKS } from "../lib/site-links";

export function SiteFooter() {
  const { lang } = useLanguage();

  const items = [
    { href: SITE_LINKS.privacy, label: t(lang, "footerPrivacy"), external: false },
    { href: SITE_LINKS.terms, label: t(lang, "footerTerms"), external: false },
    { href: SITE_LINKS.support, label: t(lang, "footerSupport"), external: false },
    { href: SITE_LINKS.x, label: t(lang, "footerX"), external: true },
    { href: SITE_LINKS.telegram, label: t(lang, "footerTelegram"), external: true },
  ] as const;

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        <nav className="site-footer-nav" aria-label={t(lang, "footerNavAria")}>
          <ul className="site-footer-links">
            {items.map(({ href, label, external }) => (
              <li key={href}>
                {external ? (
                  <a
                    href={href}
                    className="site-footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                ) : (
                  <Link href={href} className="site-footer-link">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
