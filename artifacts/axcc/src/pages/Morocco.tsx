import { useEffect, useState, useCallback, useRef } from "react";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { getMoroccoCategories, getMoroccoPage } from "@/i18n/content";
import type { DangerAnswer } from "@/i18n/content";

import routeMap from "@assets/cb10f663-3f71-470f-9724-40e605425c10_1783950875006.png";
import slide02 from "@assets/a-X_Website-4_1780065568271.png";
import slide05 from "@assets/a-X_Website-9_1780065568271.png";
import slide06 from "@assets/IMG_5852_1780065776415.jpeg";
import slide07 from "@assets/IMG_5808_1780065776415.jpeg";
import slide12 from "@assets/a-X_Website-7_1780065568271.png";
import slide08 from "@assets/a-X_Website-8_1780065568271.png";
import slideM2   from "@assets/IMG_5770_1780065776415.jpeg";
import newVillage from "@assets/jolien-quintyn-IBnddEfHD94-unsplash_1780326540425.jpg";
import newRoad    from "@assets/toa-heftiba-PbxfnMHP4jI-unsplash_1780326540425.jpg";
import newFlags   from "@assets/afker-moiz-wBgbEQBhONQ-unsplash_1780326540425.jpg";
import newMarket  from "@assets/matthew-stephenson-ZkLA1uIyVq0-unsplash_1780326540425.jpg";

const warmFilter = "sepia(22%) saturate(100%) contrast(110%) brightness(101%) hue-rotate(-6deg)";

type Slide = {
  src: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  scale?: number;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  filterOverride?: string;
};

const slides: Slide[] = [
  { src: slide02 },
  { src: slide05, scale: 1.08 },
  { src: newVillage, objectPosition: "center center" },
  { src: slide06 },
  { src: newRoad,    objectPosition: "center top", desktopOnly: true },
  { src: slide07, desktopOnly: true },
  { src: newMarket,  objectPosition: "center center", mobileOnly: true },
  { src: slideM2,    mobileOnly: true, filterOverride: warmFilter },
  { src: slide08, objectPosition: "center bottom" },
  { src: slide12 },
  { src: newFlags,   objectPosition: "center top", mobileOnly: true },
];

const SLIDE_INTERVAL = 4500;

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito   = { fontFamily: "'Nunito', sans-serif" };

const FORM_URL = "https://forms.gle/4M9eEvEsidtxkPbd9";


const imgFilter = "sepia(14%) saturate(108%) contrast(108%) brightness(104%) hue-rotate(-4deg)";


export default function Morocco() {
  const { t, lang } = useLang();
  const logisticCategories = getMoroccoCategories(lang);
  const mp = getMoroccoPage(lang);
  const stats = mp.statsLabels.map((label, i) => ({ label, value: mp.statsValues[i] }));
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());
  const [docsOpen, setDocsOpen] = useState(false);

  function toggleCategory(i: number) {
    setOpenCategories(prev => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else { next.add(i); }
      return next;
    });
  }
  const [mapEnlarged, setMapEnlarged] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const activeSlides = slides.filter(s => isMobile ? !s.desktopOnly : !s.mobileOnly);

  useEffect(() => { setCurrent(0); }, [activeSlides.length]);

  const next = useCallback(() => setCurrent(c => (c + 1) % activeSlides.length), [activeSlides.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + activeSlides.length) % activeSlides.length), [activeSlides.length]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [paused, next]);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); setPaused(true); }
    touchStartX.current = null;
  };

  return (
    <>
    <div className="relative min-h-[100dvh] w-full text-foreground font-sans bg-black">
      <div
        className="hidden md:block fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}page-bg-v2.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Nav />

      <div className="relative z-10 mx-6 md:mx-10 mb-6 md:mb-10 bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden">

        {/* ── SLIDESHOW ── */}
        <div
          className="relative overflow-hidden bg-black"
          style={{ height: isMobile ? "44vh" : "55vh", minHeight: "240px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {activeSlides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 select-none pointer-events-none"
              style={{
                opacity: i === current ? 1 : 0,
                filter: slide.filterOverride ?? imgFilter,
                objectPosition: (isMobile && slide.mobileObjectPosition) ? slide.mobileObjectPosition : (slide.objectPosition ?? "center center"),
                transform: `scale(${slide.scale ?? 1}) translateZ(0)`,
                willChange: "opacity",
              }}
            />
          ))}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(90,40,10,0.10)", mixBlendMode: "overlay" }}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-12 pb-4 px-6 md:px-8">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-xs md:text-xs uppercase tracking-[0.25em] text-accent mb-1 inline-block px-2 py-0.5 rounded"
              style={{ ...rubikOne, background: "rgba(30,18,8,0.55)" }}
            >
              {mp.hostedExpedition}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-xl md:text-3xl lg:text-4xl text-white leading-tight"
              style={rubikOne}
            >
              ANTI-ATLAS
            </motion.h1>
          </div>

          <div className="absolute bottom-3 right-5 flex gap-1.5 items-center">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setPaused(true); }}
                className="cursor-pointer flex items-center justify-center"
                style={{ padding: "6px", margin: "-6px" }}
                aria-label={`Slide ${i + 1}`}
              >
                <span
                  className="rounded-full transition-all duration-300 block"
                  style={{
                    width:  i === current ? "16px" : "5px",
                    height: "5px",
                    background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="relative px-6 md:px-10 pt-5 pb-14">

          {/* Logo desktop */}
          <img
            src={import.meta.env.BASE_URL + "ax-logo.png"}
            alt="a-X"
            className="hidden lg:block absolute bottom-4 right-5 z-0 h-24 w-auto opacity-75 pointer-events-none select-none"
          />

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 md:grid-cols-6 gap-px bg-white/8 rounded-lg overflow-hidden mb-6 border border-white/10"
          >
            {stats.map(({ label, value }) => (
              <div key={label} className="bg-black/40 flex flex-col items-center justify-center py-2.5 px-1 text-center">
                <span className="text-[10px] uppercase tracking-widest text-white/45 mb-0.5" style={nunito}>{label}</span>
                <span className="text-xs md:text-xs font-normal text-white whitespace-pre-line" style={rubikOne}>{value}</span>
              </div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 space-y-3"
          >
            <p className="text-sm text-foreground/75 leading-relaxed" style={nunito}>{mp.bio1}</p>
            <p className="text-sm text-foreground/75 leading-relaxed" style={nunito}>{mp.bio2}</p>
          </motion.div>

          {/* Route map + Day-by-day */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-8"
          >
            <h3 className="text-xs uppercase tracking-widest text-accent mb-3" style={rubikOne}>{mp.theRoute}</h3>

          <div className="md:flex md:gap-4 md:items-stretch">

          {/* Map image */}
          <div className="mb-4 md:mb-0 md:w-1/2 md:flex-shrink-0">
            <button
              onClick={() => setMapEnlarged(true)}
              className="w-full h-full rounded-lg overflow-hidden border border-white/10 block cursor-zoom-in group relative"
            >
              <img
                src={routeMap}
                alt="a-X Anti-Atlas Expedition route map"
                className="w-full h-full object-contain block"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white/80 text-xs uppercase tracking-widest px-3 py-1.5 rounded" style={rubikOne}>
                  {t("morocco.overview.clickEnlarge")}
                </span>
              </div>
            </button>
          </div>

          {/* Day-by-day */}
          <div className="md:flex-1 md:min-w-0 md:flex md:flex-col">
            <div className="rounded-lg border border-white/10 overflow-hidden divide-y divide-white/8 md:flex-1 md:flex md:flex-col">

              {/* Day 0 */}
              <div className="flex items-start gap-3 px-4 py-2 bg-black/20">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border border-white/20 text-white/50"
                  style={rubikOne}
                >
                  D0
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm text-foreground/70 leading-snug" style={rubikOne}>{mp.day0Title}</p>
                  <p className="text-xs text-foreground/40 mt-0.5 italic" style={nunito}>{mp.day0Note}</p>
                </div>
                <div className="flex-shrink-0 text-xs text-foreground/35 mt-0.5" style={nunito}>22 Mar</div>
              </div>

              {/* Days 1–6 */}
              {[
                { day: 1, date: "23 Mar", from: "Anezi",    to: "Ammelne",  km: 75,  elev: 2600,  color: "#00bcd4", note: mp.day1Note },
                { day: 2, date: "24 Mar", from: "Ammelne",  to: "Tiouadou", km: 55,  elev: 1000,  color: "#4caf50" },
                { day: 3, date: "25 Mar", from: "Tiouadou", to: "Tagmout",  km: 120, elev: 2375,  color: "#ff8c00" },
                { day: 4, date: "26 Mar", from: "Tagmout",  to: "Aguinane", km: 110, elev: 1650,  color: "#e53935" },
                { day: 5, date: "27 Mar", from: "Aguinane", to: "Taznacht",  km: 80,  elev: 1170,  color: "#9c27b0" },
                { day: 6, date: "28 Mar", from: "Taznakht", to: mp.day6To,  km: 110, elev: 1200,  color: "#1565c0", note: mp.day6Note },
              ].map(({ day, date, from, to, km, elev, color, rest, note }) => (
                <div key={day} className="flex items-start gap-3 px-4 py-2 hover:bg-white/3 transition-colors">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                    style={{ ...rubikOne, background: color }}
                  >
                    D{day}
                  </div>
                  <div className="flex-1 min-w-0">
                    {rest ? (
                      <p className="text-sm text-foreground/70 leading-snug" style={rubikOne}>{mp.restDay}</p>
                    ) : (
                      <p className="text-sm text-foreground/90 leading-snug" style={rubikOne}>
                        {from} <span className="text-foreground/40 mx-1">→</span> {to}
                      </p>
                    )}
                    {note && (
                      <p className="text-xs text-foreground/40 mt-0.5 italic" style={nunito}>{note}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-1 mt-0.5" style={nunito}>
                    <span className="text-xs text-foreground/35">{date}</span>
                    {!rest && (
                      <div className="flex gap-2">
                        <span className="text-xs text-foreground/60">{km}km</span>
                        <span className="text-xs text-foreground/40">{elev!.toLocaleString()}m ↑</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          </div>{/* end flex row */}
          </motion.div>{/* end route section */}

          {/* Two-col info blocks */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3.5">
              <h3 className="text-xs uppercase tracking-widest text-accent mb-2" style={rubikOne}>{mp.terrainTitle}</h3>
              <ul className="space-y-1" style={nunito}>
                {mp.terrainItems.map(item => (
                  <li key={item} className="text-xs text-foreground/65 flex gap-2">
                    <span className="text-accent/60 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3.5">
              <h3 className="text-xs uppercase tracking-widest text-accent mb-2" style={rubikOne}>{mp.equipTitle}</h3>
              <ul className="space-y-1" style={nunito}>
                {mp.equipItems.map(item => (
                  <li key={item} className="text-xs text-foreground/65 flex gap-2">
                    <span className="text-accent/60 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── PRICING ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
            className="mb-8"
          >
            <h3 className="text-xs uppercase tracking-widest text-accent mb-4" style={rubikOne}>{t("morocco.pricing.title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Self-supported */}
              <div className="rounded-xl border border-white/15 bg-black/40 px-6 py-6">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2" style={rubikOne}>{t("morocco.pricing.selfSupported")}</p>
                <p className="text-4xl md:text-5xl font-bold text-white leading-none mb-1" style={rubikOne}>€400</p>
                <p className="text-xs text-foreground/45 mb-4" style={nunito}>{mp.eventFeeLabel}</p>
                <ul className="space-y-1.5" style={nunito}>
                  {mp.selfSupportedItems.map(item => (
                    <li key={item} className="text-xs text-foreground/60 flex gap-2">
                      <span className="text-accent/50 mt-0.5">✓</span>{item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-accent/60 mt-4 italic" style={nunito}>{mp.groupDiscount}</p>
              </div>

              {/* With logistics */}
              <div className="rounded-xl border border-accent/70 bg-accent/8 px-6 py-6 relative shadow-[0_0_36px_-4px_rgba(137,152,42,0.45)]">
                <div
                  className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-background bg-accent rounded px-2 py-0.5"
                  style={rubikOne}
                >
                  {mp.recommended}
                </div>
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2" style={rubikOne}>{t("morocco.pricing.logistics")}</p>
                <p className="text-4xl md:text-5xl font-bold text-white leading-none mb-1" style={rubikOne}>&lt;€950</p>
                <p className="text-xs text-foreground/45 mb-4" style={nunito}>{mp.maxCostLabel}</p>
                <ul className="space-y-2" style={nunito}>
                  <li className="text-xs text-foreground/60 flex gap-2">
                    <span className="text-accent/50 mt-0.5">✓</span>
                    <span>{t("morocco.pricing.included")} {t("morocco.pricing.selfSupported")}</span>
                  </li>
                </ul>

                <div className="mt-3 rounded-lg border border-white/10 bg-white/3 px-3 py-2.5">
                  <p className="text-xs uppercase tracking-widest text-white/30 mb-2" style={rubikOne}>{t("morocco.pricing.viaPartner")}</p>
                  <ul className="space-y-1.5" style={nunito}>
                    {mp.logisticsItems.map(item => (
                      <li key={item} className="text-xs text-foreground/60 flex gap-2">
                        <span className="text-accent/50 mt-0.5">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-foreground/30 mt-3 italic" style={nunito}>
                  {t("morocco.pricing.standbyNote")}
                </p>
              </div>
            </div>

          </motion.div>

          {/* Logistics accordion */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-xs uppercase tracking-widest text-accent mb-3" style={rubikOne}>{mp.logisticsPractTitle}</h3>
            <div className="rounded-lg border border-white/15 overflow-hidden">
              {logisticCategories.map((category, catIdx) => {
                const isCatOpen = openCategories.has(catIdx);
                return (
                  <div key={catIdx} className={catIdx > 0 ? "border-t border-white/15" : ""}>
                    <button
                      onClick={() => toggleCategory(catIdx)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="text-sm uppercase tracking-widest text-white" style={rubikOne}>
                        {category.label}
                      </span>
                      <motion.span
                        animate={{ rotate: isCatOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 text-lg leading-none text-white/40 transition-colors"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isCatOpen && (
                        <motion.div
                          key="cat-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="divide-y divide-white/10 border-t border-white/10">
                            {category.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="px-4 py-4">
                                                <p className="text-sm text-accent leading-snug mb-3" style={rubikOne}>{item.q}</p>
                                <div className="text-sm text-foreground/60 leading-relaxed" style={nunito}>
                                  {Array.isArray(item.a)
                                    ? <div className="flex flex-col gap-3">{(item.a as string[]).map((para, i) => <p key={i}>{para}</p>)}</div>
                                    : typeof item.a === "string"
                                    ? <p>{item.a}</p>
                                    : <div className="space-y-4">{(item.a as DangerAnswer).sections.map((s, i) => (
                                        <div key={i}>
                                          <p className="text-xs uppercase tracking-widest text-white mb-1" style={rubikOne}>{s.heading}</p>
                                          <p>{s.body}</p>
                                        </div>
                                      ))}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Event Documentation */}
              {(() => {
                const isOpen = docsOpen;
                return (
                  <div className={["border-t border-white/15", isOpen ? "bg-white/5" : ""].join(" ")}>
                    <button
                      onClick={() => setDocsOpen(o => !o)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="text-sm uppercase tracking-widest text-white" style={rubikOne}>
                        {mp.eventDocTitle}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 text-lg leading-none text-white/40"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="docs"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col sm:flex-row gap-3 px-4 pb-4 pt-2">
                            <a
                              href={import.meta.env.BASE_URL + "a-X-Event-TCs.pdf"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 hover:border-white/25 transition-colors group flex-1"
                              style={nunito}
                            >
                              <svg className="w-4 h-4 text-foreground/40 group-hover:text-foreground/70 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                              </svg>
                              <div>
                                <p className="text-xs text-foreground/70 group-hover:text-foreground/90 transition-colors">{mp.termsTitle}</p>
                                <p className="text-xs text-foreground/35">{mp.termsSubtitle}</p>
                              </div>
                            </a>
                            <a
                              href={import.meta.env.BASE_URL + "a-X-Waiver.pdf"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 hover:border-white/25 transition-colors group flex-1"
                              style={nunito}
                            >
                              <svg className="w-4 h-4 text-foreground/40 group-hover:text-foreground/70 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                              </svg>
                              <div>
                                <p className="text-xs text-foreground/70 group-hover:text-foreground/90 transition-colors">{mp.waiverTitle}</p>
                                <p className="text-xs text-foreground/35">{mp.waiverSubtitle}</p>
                              </div>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}
            </div>
          </motion.div>

          {/* Philosophy note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-foreground/40 italic mb-10"
            style={nunito}
          >
            {mp.philosophyNote}
          </motion.p>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mb-8"
          >
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-5 text-center bg-accent text-background hover:bg-accent/85 transition-colors uppercase rounded-xl text-base tracking-widest"
              style={rubikOne}
            >
              {mp.expressInterest}
            </a>
            <p className="text-center text-xs text-foreground/60 mt-2" style={nunito}>
              {mp.noPayment}
            </p>
          </motion.div>

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center pt-4 pb-2">
            <img
              src={import.meta.env.BASE_URL + "ax-logo.png"}
              alt="a-X"
              className="h-16 w-auto opacity-60 pointer-events-none select-none"
            />
          </div>

        </div>
      </div>
    </div>

    {/* Map lightbox */}
    <AnimatePresence>
      {mapEnlarged && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-zoom-out"
          onClick={() => setMapEnlarged(false)}
        >
          <motion.img
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={routeMap}
            alt="a-X Anti-Atlas Expedition route map"
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setMapEnlarged(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white/90 transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
