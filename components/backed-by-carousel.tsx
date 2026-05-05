"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import backed1 from "../assets/backed-1.png";
import backed2 from "../assets/backed-2.png";
import backed3 from "../assets/backed-3.png";

const SLIDES: StaticImageData[] = [backed1, backed2, backed3];

const INTERVAL_MS = 4200;

type Props = {
  alts: readonly [string, string, string];
};

export function BackedByCarousel({ alts }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="home-backed-carousel">
      {SLIDES.map((src, i) => (
        <div
          key={i}
          className="home-backed-slide"
          data-active={i === active}
          aria-hidden={i !== active}
        >
          <Image
            src={src}
            alt={alts[i] ?? ""}
            fill
            className="home-backed-slide-img"
            sizes="(max-width: 720px) min(90vw, 24rem), 22rem"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
