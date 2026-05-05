"use client";

import { useEffect } from "react";
import { useLanguage } from "./language-provider";

export function HtmlLang() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
  }, [lang]);

  return null;
}
