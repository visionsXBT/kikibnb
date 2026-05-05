"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "./language-provider";
import { t } from "../lib/i18n";

export function SupportForm() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="legal-page legal-page--support">
      <h1>{t(lang, "supportTitle")}</h1>
      <p className="legal-page-intro">{t(lang, "supportIntro")}</p>

      {submitted ? (
        <p className="support-thanks" role="status">
          {t(lang, "supportThanks")}
        </p>
      ) : (
        <form className="support-form" onSubmit={onSubmit} noValidate>
          <label className="support-field">
            <span className="support-label">{t(lang, "supportNameLabel")}</span>
            <input name="name" type="text" autoComplete="name" required className="support-input" />
          </label>
          <label className="support-field">
            <span className="support-label">{t(lang, "supportEmailLabel")}</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="support-input"
            />
          </label>
          <label className="support-field">
            <span className="support-label">{t(lang, "supportSubjectLabel")}</span>
            <input name="subject" type="text" className="support-input" />
          </label>
          <label className="support-field">
            <span className="support-label">{t(lang, "supportMessageLabel")}</span>
            <textarea name="message" required rows={5} className="support-textarea" />
          </label>
          <button type="submit" className="support-submit">
            {t(lang, "supportSubmit")}
          </button>
        </form>
      )}
    </main>
  );
}
