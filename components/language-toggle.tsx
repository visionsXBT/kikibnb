"use client";

import { t } from "../lib/i18n";
import { useLanguage } from "./language-provider";

type Props = { variant?: "home" | "chat" };

export function LanguageToggle({ variant = "home" }: Props) {
  const { lang, toggleLang } = useLanguage();
  const cls =
    variant === "chat" ? "lang-toggle lang-toggle--chat" : "lang-toggle lang-toggle--home";

  return (
    <button
      type="button"
      className={cls}
      onClick={toggleLang}
      aria-label={t(lang, "langToggleAria")}
    >
      {t(lang, "langButton")}
    </button>
  );
}
