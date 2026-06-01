import { useEffect, useState, useCallback, useRef } from "react";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { getMoroccoCategories } from "@/i18n/content";
import type { DangerAnswer } from "@/i18n/content";

import routeMap from "@assets/Image-46_1780095838048.png";
import slide02 from "@assets/a-X_Website-4_1780065568271.png";
import slide05 from "@assets/a-X_Website-9_1780065568271.png";
import slide06 from "@assets/IMG_5852_1780065776415.jpeg";
import slide07 from "@assets/IMG_5808_1780065776415.jpeg";
import slide12 from "@assets/a-X_Website-7_1780065568271.png";
import slide08 from "@assets/a-X_Website-8_1780065568271.png";
import slideM1 from "@assets/IMG_5968_1780065776415.jpeg";
import slideM2 from "@assets/IMG_5770_1780065776415.jpeg";

const warmFilter = "sepia(22%) saturate(100%) contrast(110%) brightness(101%) hue-rotate(-6deg)";

type Slide = {
  src: string;
  objectPosition?: string;
  scale?: number;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  filterOverride?: string;
};

const slides: Slide[] = [
  { src: slide02 },
  { src: slide05, scale: 1.08 },
  { src: slide06 },
  { src: slide07, desktopOnly: true },
  { src: slideM1, mobileOnly: true, filterOverride: warmFilter },
  { src: slideM2, mobileOnly: true, filterOverride: warmFilter },
  { src: slide08, objectPosition: "center bottom" },
  { src: slide12 },
];

const SLIDE_INTERVAL = 4500;

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito   = { fontFamily: "'Nunito', sans-serif" };

const FORM_URL = "https://forms.gle/4M9eEvEsidtxkPbd9";


const imgFilter = "sepia(14%) saturate(108%) contrast(108%) brightness(104%) hue-rotate(-4deg)";

const stats = [
  { label: "DATES",     value: "22–28 MAR 2027" },
  { label: "DURATION",  value: "7 DAYS" },
  { label: "DISTANCE",  value: "~440 KM" },
  { label: "ELEVATION", value: "~9,000 M" },
  { label: "TERRAIN",   value: "GRAVEL+" },
  { label: "GROUP",     value: "Target 10 Riders\n(Min 5, Max 15)" },
];

export default function Morocco() {
  const { t, lang } = useLang();
  const logisticCategories = getMoroccoCategories(lang);
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
          style={{ height: "55vh", minHeight: "260px" }}
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
                objectPosition: slide.objectPosition ?? "center center",
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
              Hosted Expedition · Southern Morocco
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
            <p className="text-sm text-foreground/75 leading-relaxed" style={nunito}>
              Treading in the tracks of the Atlas Mountains Race, the a-X Anti-Atlas Expedition takes you into one of cycling's most cinematic and least-ridden landscapes. Nights are spent among palmeraies, ruins and centuries-old kasbahs built from the same red mud as the mountains. Days are spent winding through remote villages where the greetings are genuine and the curiosity mutual.
            </p>
            <p className="text-sm text-foreground/75 leading-relaxed" style={nunito}>
              Long traverses of the Anti-Atlas earn you sweeping views of raw peaks and valleys thick with wild flowers. Life appears at the margins and vanishes just as quietly. The roads are mostly beautiful. Some sections are not. All of it is worth it.
            </p>
          </motion.div>

          {/* Route map + Day-by-day */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-8"
          >
            <h3 className="text-xs uppercase tracking-widest text-accent mb-3" style={rubikOne}>The Route</h3>

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
                  <p className="text-sm text-foreground/70 leading-snug" style={rubikOne}>
                    Marrakech — Meet-up &amp; transfer to Southern Morocco
                  </p>
                  <p className="text-xs text-foreground/40 mt-0.5 italic" style={nunito}>
                    Transfer from Marrakech included with logistics package only
                  </p>
                </div>
                <div className="flex-shrink-0 text-xs text-foreground/35 mt-0.5" style={nunito}>22 Mar</div>
              </div>

              {/* Days 1–6 */}
              {[
                { day: 1, date: "23 Mar", from: "Anezi",    to: "Ammelne",  km: 75,  elev: 2600,  color: "#c0522a", note: "Short transfer from hotel in Southern Morocco to Anezi — included with logistics package only" },
                { day: 2, date: "24 Mar", from: "Ammelne",  to: "Tiouadou", km: 55,  elev: 1000,  color: "#5a7a3a" },
                { day: 3, date: "25 Mar", from: "Tiouadou", to: "Tagmout",  km: 120, elev: 2375,  color: "#3a6080" },
                { day: 4, date: "26 Mar", from: "Tagmout",  to: "Aguinane", km: 110, elev: 1650,  color: "#b8972a" },
                { day: 5, date: "27 Mar", from: null,       to: null,       km: null, elev: null,  color: "#6b6b6b", rest: true },
                { day: 6, date: "28 Mar", from: "Aguinane", to: "Taznacht & Transfer to Marrakech", km: 80,  elev: 1170,  color: "#7a3535", note: "Transfer to Marrakech included with logistics package only" },
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
                      <p className="text-sm text-foreground/70 leading-snug" style={rubikOne}>Rest Day</p>
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
              <h3 className="text-xs uppercase tracking-widest text-accent mb-2" style={rubikOne}>Terrain & Conditions</h3>
              <ul className="space-y-1" style={nunito}>
                {[
                  "~50% road / ~50% gravel & piste",
                  "Technical descents & steep climbing",
                  "Hike-a-bike & river crossings",
                  "Extreme heat / cold nights",
                ].map(item => (
                  <li key={item} className="text-xs text-foreground/65 flex gap-2">
                    <span className="text-accent/60 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3.5">
              <h3 className="text-xs uppercase tracking-widest text-accent mb-2" style={rubikOne}>Recommended Equipment</h3>
              <ul className="space-y-1" style={nunito}>
                {[
                  "Gravel or adventure bike",
                  "Low climbing gears",
                  "Tubeless setup strongly recommended",
                  "GPS navigation device",
                  "Layering for heat and cold",
                  "Helmet & lights mandatory · E-bikes not permitted",
                ].map(item => (
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
                <p className="text-xs text-foreground/45 mb-4" style={nunito}>Event fee</p>
                <ul className="space-y-1.5" style={nunito}>
                  {[
                    "Route planning & reconnaissance",
                    "GPX files",
                    "Host & group coordination",
                    "Event administration",
                  ].map(item => (
                    <li key={item} className="text-xs text-foreground/60 flex gap-2">
                      <span className="text-accent/50 mt-0.5">✓</span>{item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-accent/60 mt-4 italic" style={nunito}>
                  Group discounts available on the Event Fee for 5 or more riders booking together.
                </p>
              </div>

              {/* With logistics */}
              <div className="rounded-xl border border-accent/70 bg-accent/8 px-6 py-6 relative shadow-[0_0_36px_-4px_rgba(137,152,42,0.45)]">
                <div
                  className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-background bg-accent rounded px-2 py-0.5"
                  style={rubikOne}
                >
                  Recommended
                </div>
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2" style={rubikOne}>{t("morocco.pricing.logistics")}</p>
                <p className="text-4xl md:text-5xl font-bold text-white leading-none mb-1" style={rubikOne}>&lt;€950</p>
                <p className="text-xs text-foreground/45 mb-4" style={nunito}>Maximum estimated cost — dependent on participant numbers &amp; accommodation choices</p>
                <ul className="space-y-2" style={nunito}>
                  <li className="text-xs text-foreground/60 flex gap-2">
                    <span className="text-accent/50 mt-0.5">✓</span>
                    <span>{t("morocco.pricing.included")} {t("morocco.pricing.selfSupported")}</span>
                  </li>
                </ul>

                <div className="mt-3 rounded-lg border border-white/10 bg-white/3 px-3 py-2.5">
                  <p className="text-xs uppercase tracking-widest text-white/30 mb-2" style={rubikOne}>{t("morocco.pricing.viaPartner")}</p>
                  <ul className="space-y-1.5" style={nunito}>
                    {[
                      "6-nights Accommodation",
                      "Luggage transfers between stops",
                      "Transfer from Marrakech to start",
                      "Transfer from finish to Marrakech",
                      "Stand-by vehicle*",
                    ].map(item => (
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
            <h3 className="text-xs uppercase tracking-widest text-accent mb-3" style={rubikOne}>Logistics & Practicalities</h3>
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
                        Event Documentation
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
                                <p className="text-xs text-foreground/70 group-hover:text-foreground/90 transition-colors">Terms & Conditions</p>
                                <p className="text-xs text-foreground/35">a-X Event T&Cs — PDF</p>
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
                                <p className="text-xs text-foreground/70 group-hover:text-foreground/90 transition-colors">Rider Waiver & Assumption of Risk</p>
                                <p className="text-xs text-foreground/35">a-X Waiver — PDF</p>
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
            This is not a luxury guided tour. Participants make independent decisions, ride at their own pace and support one another where possible. Self-sufficiency is expected and adventure is the point.
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
              EXPRESS INTEREST
            </a>
            <p className="text-center text-xs text-foreground/60 mt-2" style={nunito}>
              No payment required — we'll be in touch with full details.
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
