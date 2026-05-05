"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Covered_By_Your_Grace } from "next/font/google";
import kikiPhoto from "../assets/kiki.png";
import semiHero from "../assets/semi-hero.png";
import { BackedByCarousel } from "../components/backed-by-carousel";
import { useLanguage } from "../components/language-provider";
import { LanguageToggle } from "../components/language-toggle";
import { t } from "../lib/i18n";
import { SiteFooter } from "../components/site-footer";
import { LandingActions } from "./landing-actions";

const kikiTitle = Covered_By_Your_Grace({
  subsets: ["latin"],
  weight: "400",
});

const FEATURE_CARD_KEYS = [
  ["bullet1Head", "bullet1Body"],
  ["bullet2Head", "bullet2Body"],
  ["bullet3Head", "bullet3Body"],
  ["bullet4Head", "bullet4Body"],
] as const;

const ROADMAP_PHASES = [
  { title: "roadmapP1Title" as const, summary: "roadmapP1Summary" as const },
  { title: "roadmapP2Title" as const, summary: "roadmapP2Summary" as const },
  { title: "roadmapP3Title" as const, summary: "roadmapP3Summary" as const },
  { title: "roadmapP4Title" as const, summary: "roadmapP4Summary" as const },
];

const ECOSYSTEM_CARDS = [
  ["ecosystemCard1Title", "ecosystemCard1Body"],
  ["ecosystemCard2Title", "ecosystemCard2Body"],
  ["ecosystemCard3Title", "ecosystemCard3Body"],
] as const;

const FEATURE_CARD_COUNT = FEATURE_CARD_KEYS.length;
const RIBBON_ADVANCE_MS = 5200;

export function HomePage() {
  const { lang } = useLanguage();
  const [ribbonIndex, setRibbonIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const ribbonPauseRef = useRef(false);

  useEffect(() => {
    setRibbonIndex(0);
  }, [lang]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      if (ribbonPauseRef.current) return;
      setRibbonIndex((i) => (i + 1) % FEATURE_CARD_COUNT);
    }, RIBBON_ADVANCE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="home-root">
      <main className="shell shell--hero">
        <div className="home-lang-wrap">
          <LanguageToggle variant="home" />
        </div>
        <video
          className="bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src="/clouds.mp4" type="video/mp4" />
        </video>
        <div className="visual">
          <Image
            className="heroImage"
            src={kikiPhoto}
            alt={t(lang, "heroImageAlt")}
            fill
            priority
            sizes="(max-width: 720px) 100vw, 50vw"
          />
        </div>
        <div className="copy">
          <div>
            <h1 className={`title-kiki ${kikiTitle.className}`}>{t(lang, "heroTitle")}</h1>
            <p className="tagline">{t(lang, "heroTagline")}</p>
          </div>
          <LandingActions />
        </div>
      </main>

      <section className="home-below" aria-labelledby="home-about-heading">
        <div className="home-below-shell">
          <div className="home-below-art">
            <Image
              className="home-below-semihero-img"
              src={semiHero}
              alt={t(lang, "semiHeroAlt")}
              fill
              sizes="(max-width: 720px) 94vw, 56vw"
              style={{ objectFit: "cover", objectPosition: "center 36%" }}
            />
          </div>
          <div className="home-below-copy">
            <h2 id="home-about-heading" className="home-below-title">
              {t(lang, "aboutTitle")}
            </h2>
            <div
              className="home-feature-ribbon"
              role="region"
              aria-labelledby="home-about-heading"
              aria-roledescription="carousel"
              tabIndex={0}
              onMouseEnter={() => {
                ribbonPauseRef.current = true;
              }}
              onMouseLeave={() => {
                ribbonPauseRef.current = false;
              }}
              onFocus={() => {
                ribbonPauseRef.current = true;
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  ribbonPauseRef.current = false;
                }
              }}
            >
              <div className="home-feature-ribbon-viewport">
                <div
                  className="home-feature-ribbon-track"
                  style={
                    {
                      width: `calc(${FEATURE_CARD_COUNT} * 100cqw + ${FEATURE_CARD_COUNT - 1} * var(--ribbon-gap))`,
                      transform: `translateX(calc(-${ribbonIndex} * (100cqw + var(--ribbon-gap))))`,
                    } as React.CSSProperties
                  }
                >
                  {FEATURE_CARD_KEYS.map(([titleKey, bodyKey]) => (
                    <article key={titleKey} className="home-feature-card">
                      <h3 className="home-feature-card-title">{t(lang, titleKey)}</h3>
                      <p className="home-feature-card-body">{t(lang, bodyKey)}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-backed" aria-labelledby="home-trusted-heading">
        <div className="home-backed-inner">
          <h2 id="home-trusted-heading" className="home-backed-title">
            {t(lang, "backedByTitle")}
          </h2>
          <BackedByCarousel
            alts={[t(lang, "backedAlt1"), t(lang, "backedAlt2"), t(lang, "backedAlt3")]}
          />
        </div>
      </section>

      <section className="home-roadmap" aria-labelledby="home-roadmap-heading">
        <div className="home-roadmap-inner">
          <h2 id="home-roadmap-heading" className="home-roadmap-title">
            {t(lang, "roadmapTitle")}
          </h2>
          <div className="home-roadmap-scroller">
            <div className="home-roadmap-track">
              <div className="home-roadmap-line" aria-hidden />
              <ol className="home-roadmap-list">
                {ROADMAP_PHASES.map((phase) => (
                  <li key={phase.title} className="home-roadmap-phase">
                    <div className="home-roadmap-nodeRow" aria-hidden>
                      <span className="home-roadmap-dot" />
                    </div>
                    <div className="home-roadmap-body">
                      <h3 className="home-roadmap-phase-title">{t(lang, phase.title)}</h3>
                      <p className="home-roadmap-summary">{t(lang, phase.summary)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="home-ecosystem" aria-labelledby="home-ecosystem-heading">
        <div className="home-ecosystem-inner">
          <h2 id="home-ecosystem-heading" className="home-ecosystem-title">
            {t(lang, "ecosystemTitle")}
          </h2>
          <p className="home-ecosystem-intro">{t(lang, "ecosystemIntro")}</p>
          <ul className="home-ecosystem-grid">
            {ECOSYSTEM_CARDS.map(([titleKey, bodyKey], index) => (
              <li key={titleKey}>
                <article className="home-ecosystem-card">
                  <h3 className="home-ecosystem-card-title">
                    <span>{t(lang, titleKey)}</span>
                    {index === 2 ? (
                      <span className="home-ecosystem-card-badge">{t(lang, "ecosystemCard3Badge")}</span>
                    ) : null}
                  </h3>
                  <p className="home-ecosystem-card-body">{t(lang, bodyKey)}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
