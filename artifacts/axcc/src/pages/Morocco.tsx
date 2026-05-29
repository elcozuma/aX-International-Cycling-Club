import { useEffect, useState, useCallback } from "react";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";

import slide02 from "@assets/a-X_Website-4_1780065568271.png";
import slide05 from "@assets/a-X_Website-9_1780065568271.png";
import slide06 from "@assets/IMG_5852_1780065776415.jpeg";
import slide07 from "@assets/IMG_5808_1780065776415.jpeg";
import slide12 from "@assets/a-X_Website-7_1780065568271.png";

const slides: { src: string; objectPosition?: string }[] = [
  { src: slide02 },
  { src: slide05 },
  { src: slide06 },
  { src: slide07 },
  { src: slide12 },
];

const SLIDE_INTERVAL = 4500;

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito   = { fontFamily: "'Nunito', sans-serif" };

const FORM_URL = "https://forms.gle/4M9eEvEsidtxkPbd9";

const logistics: { q: string; a: string }[] = [
  {
    q: "What does the base event fee cover?",
    a: "The event fee (€400) covers route planning and reconnaissance, GPX files, hosting and group coordination across all riding days, and administration of any optional logistics arrangements. Flights, accommodation and transfers are not included unless explicitly stated."
  },
  {
    q: "How does the optional logistic support work?",
    a: "The logistics option (€200–€400) layers additional services on top of the base event fee. These are arranged through a local delivery partner in Morocco and include luggage transfers between overnight stops and in-region rider and bike transfers to and from Marrakech to the remote start or from the final destination. Full details and pricing for each option will be shared with registered participants ahead of the event."
  },
  {
    q: "What accommodation options are there?",
    a: "The route passes through areas with a mix of small guesthouses, riads, and basic auberges. Riders are required to book independently or camp where permitted. Recommendations and a list of options along the route will be provided in the event briefing."
  },
  {
    q: "Are transfers to the start and from the finish included?",
    a: "See 'How does the optional logistic support work?' above. Self-supported riders will need to arrange their own."
  },
  {
    q: "Is there a support vehicle during the riding days?",
    a: "No. The event is designed around self-sufficiency and there is no trailing support vehicle. Riders are expected to carry what they need for the day or plan resupply around towns and villages along the route."
  },
  {
    q: "How does resupply work?",
    a: "The route passes through a number of villages and small towns where food and water can typically be sourced. Specific resupply points, recommended carry capacities and any sections requiring extra preparation will be detailed in the full event briefing sent to all registered participants."
  },
  {
    q: "What if I need to leave the event early?",
    a: "Participants are responsible for arranging their own alternative transport, accommodation and onward travel if they choose or need to exit early. The event briefing will include information on the nearest accessible towns and transport links at various points along the route."
  },
  {
    q: "Do I need travel insurance?",
    a: "Yes — travel insurance is compulsory for this event. It should include appropriate medical cover, emergency evacuation and repatriation. Riders are entering remote terrain in a foreign country and should be adequately covered before departing."
  },
];

const imgFilter = "sepia(14%) saturate(108%) contrast(108%) brightness(104%) hue-rotate(-4deg)";

const stats = [
  { label: "DATES",     value: "22–28 MAR 2027" },
  { label: "DURATION",  value: "7 DAYS" },
  { label: "DISTANCE",  value: "~440 KM" },
  { label: "ELEVATION", value: "~9,000 M" },
  { label: "TERRAIN",   value: "GRAVEL+" },
  { label: "GROUP",     value: "MAX 15 RIDERS" },
];

export default function Morocco() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openLogistic, setOpenLogistic] = useState<number | null>(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans bg-black">
      <div
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}page-bg-v2.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col">

          {/* ── SLIDESHOW ── */}
          <div
            className="relative flex-shrink-0 overflow-hidden"
            style={{ height: "48%" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 select-none pointer-events-none"
                style={{
                  opacity: i === current ? 1 : 0,
                  filter: imgFilter,
                  objectPosition: slide.objectPosition ?? "center center",
                }}
              />
            ))}

            {/* Warm tone overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(90,40,10,0.10)", mixBlendMode: "overlay" }}
            />

            {/* Bottom gradient + title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-12 pb-4 px-6 md:px-8">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent mb-1 inline-block px-2 py-0.5 rounded"
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

            {/* Slide dots */}
            <div className="absolute bottom-3 right-5 flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setPaused(true); }}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width:  i === current ? "16px" : "5px",
                    height: "5px",
                    background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── DETAILS ── */}
          <div className="relative z-[1] flex-1 overflow-y-auto px-6 md:px-10 pt-5 pb-10">

            {/* Logo desktop */}
            <img
              src={import.meta.env.BASE_URL + "ax-logo.png"}
              alt="a-X"
              className="hidden lg:block absolute -bottom-2 right-5 z-0 h-24 w-auto opacity-75 pointer-events-none select-none"
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
                  <span className="text-[9px] uppercase tracking-widest text-white/45 mb-0.5" style={nunito}>{label}</span>
                  <span className="text-[11px] md:text-xs font-semibold text-white" style={rubikOne}>{value}</span>
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
              <p className="text-sm text-foreground/80 leading-relaxed" style={nunito}>
                Treading in the tracks of the Atlas Mountains Race, the a-X Anti-Atlas Expedition takes you into one of cycling's most cinematic and least-ridden landscapes. The Anti-Atlas is ancient, eroded and indifferent. Nights are spent among palmeraies, ruins and centuries-old kasbahs built from the same red mud as the mountains. Days are spent on roads that exist largely for locals — winding through villages where the greetings are genuine and the curiosity mutual.
              </p>
              <p className="text-sm text-foreground/60 leading-relaxed" style={nunito}>
                The riding doesn't hand you anything. Long traverses of the Anti-Atlas earn you sweeping views of raw peaks and valleys thick with wild flowers. Life appears at the margins and vanishes just as quietly. The roads are mostly beautiful. Some sections are not. All of it is worth it.
              </p>
            </motion.div>

            {/* Two-col info blocks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3.5">
                <h3 className="text-[10px] uppercase tracking-widest text-accent mb-2" style={rubikOne}>Terrain & Conditions</h3>
                <ul className="space-y-1" style={nunito}>
                  {[
                    "~50% road / ~50% gravel & piste",
                    "Technical descents & steep climbing",
                    "Hike-a-bike & river crossings",
                    "Extreme heat / cold nights at altitude",
                  ].map(item => (
                    <li key={item} className="text-xs text-foreground/65 flex gap-2">
                      <span className="text-accent/60 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3.5">
                <h3 className="text-[10px] uppercase tracking-widest text-accent mb-2" style={rubikOne}>Recommended Equipment</h3>
                <ul className="space-y-1" style={nunito}>
                  {[
                    "Gravel or adventure bike",
                    "Low climbing gears",
                    "Tubeless setup strongly recommended",
                    "GPS navigation device",
                    "Layering for heat and cold",
                    "Helmet mandatory · E-bikes not permitted",
                  ].map(item => (
                    <li key={item} className="text-xs text-foreground/65 flex gap-2">
                      <span className="text-accent/60 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Cost */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="rounded-lg border border-white/10 bg-black/30 px-4 py-3.5 mb-6"
            >
              <h3 className="text-[10px] uppercase tracking-widest text-accent mb-2" style={rubikOne}>Entry & Costs</h3>
              <div className="flex flex-col sm:flex-row gap-3" style={nunito}>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">€400 — Event Fee (self-supported)</p>
                  <p className="text-[10px] text-foreground/45 mt-0.5">Flights not included</p>
                </div>
                <div className="hidden sm:block w-px bg-white/10" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">€600–€1,000 — Event Fee + Logistics</p>
                  <p className="text-[10px] text-foreground/45 mt-0.5">Optional accommodation &amp; transfer packages via local partner</p>
                </div>
              </div>
              <p className="text-[10px] text-accent/70 mt-2 italic" style={nunito}>Sign up for this event and receive 50% off the entry fee for the next a-X expedition.</p>
            </motion.div>

            {/* Logistics accordion */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-[10px] uppercase tracking-widest text-accent mb-3" style={rubikOne}>Logistics & Practicalities</h3>
              <div className="rounded-lg border border-white/10 overflow-hidden divide-y divide-white/8">
                {logistics.map((item, i) => {
                  const isOpen = openLogistic === i;
                  return (
                    <div key={i}>
                      <button
                        onClick={() => setOpenLogistic(isOpen ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/5"
                      >
                        <span className="text-xs text-foreground/75 leading-snug pr-4" style={nunito}>{item.q}</span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0 text-foreground/35 text-base leading-none"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 pt-1 text-xs text-foreground/55 leading-relaxed" style={nunito}>
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Philosophy note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-foreground/40 leading-relaxed italic mb-6"
              style={nunito}
            >
              This is not a luxury guided tour. Participants make independent decisions, ride at their own pace and support one another where possible. Self-sufficiency is expected and adventure is the point.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2.5 px-8 border border-accent/70 text-accent hover:bg-accent hover:text-background transition-colors uppercase text-xs rounded tracking-widest"
                style={rubikOne}
              >
                EXPRESS INTEREST
              </a>
            </motion.div>

            {/* Mobile logo */}
            <div className="lg:hidden flex justify-center pt-8 pb-2">
              <img
                src={import.meta.env.BASE_URL + "ax-logo.png"}
                alt="a-X"
                className="h-16 w-auto opacity-60 pointer-events-none select-none"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
