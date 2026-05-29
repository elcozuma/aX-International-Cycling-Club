import { useEffect, useState, useCallback } from "react";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";

import routeMap from "@assets/Image-40_1780078098554.png";
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
          className="relative overflow-hidden"
          style={{ height: "55vh", minHeight: "260px" }}
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

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(90,40,10,0.10)", mixBlendMode: "overlay" }}
          />

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
            <p className="text-sm text-foreground/75 leading-relaxed" style={nunito}>
              Treading in the tracks of the Atlas Mountains Race, the a-X Anti-Atlas Expedition takes you into one of cycling's most cinematic and least-ridden landscapes. The Anti-Atlas is ancient, eroded and indifferent. Nights are spent among palmeraies, ruins and centuries-old kasbahs built from the same red mud as the mountains. Days are spent on roads that exist largely for locals — winding through villages where the greetings are genuine and the curiosity mutual.
            </p>
            <p className="text-sm text-foreground/75 leading-relaxed" style={nunito}>
              The riding doesn't hand you anything. Long traverses of the Anti-Atlas earn you sweeping views of raw peaks and valleys thick with wild flowers. Life appears at the margins and vanishes just as quietly. The roads are mostly beautiful. Some sections are not. All of it is worth it.
            </p>
          </motion.div>

          {/* Route map */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-4"
          >
            <h3 className="text-[10px] uppercase tracking-widest text-accent mb-3" style={rubikOne}>The Route</h3>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <img
                src={routeMap}
                alt="a-X Anti-Atlas Expedition route map"
                className="w-full h-auto block"
              />
            </div>
          </motion.div>

          {/* Day-by-day */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
            className="mb-8"
          >
            <div className="rounded-lg border border-white/10 overflow-hidden divide-y divide-white/8">

              {/* Day 0 */}
              <div className="flex items-start gap-3 px-4 py-3 bg-black/20">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold border border-white/20 text-white/50"
                  style={rubikOne}
                >
                  D0
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm text-foreground/70 leading-snug" style={rubikOne}>
                    Marrakech — Meet-up &amp; transfer to Southern Morocco
                  </p>
                  <p className="text-[10px] text-foreground/40 mt-0.5 italic" style={nunito}>
                    Transport to start included with logistics package only
                  </p>
                </div>
                <div className="flex-shrink-0 text-xs text-foreground/35 mt-0.5" style={nunito}>22 Mar</div>
              </div>

              {/* Days 1–6 */}
              {[
                { day: 1, date: "23 Mar", from: "Anezi",    to: "Ammelne",  km: 75,  elev: 2600,  color: "#c0522a", note: "Drop off in Anezi" },
                { day: 2, date: "24 Mar", from: "Ammelne",  to: "Tiouadou", km: 55,  elev: 1000,  color: "#5a7a3a" },
                { day: 3, date: "25 Mar", from: "Tiouadou", to: "Tagmout",  km: 120, elev: 2375,  color: "#3a6080" },
                { day: 4, date: "26 Mar", from: "Tagmout",  to: "Aguinane", km: 110, elev: 1650,  color: "#b8972a" },
                { day: 5, date: "27 Mar", from: null,       to: null,       km: null, elev: null,  color: "#6b6b6b", rest: true },
                { day: 6, date: "28 Mar", from: "Aguinane", to: "Taznacht & Transfer to Marrakech", km: 80,  elev: 1170,  color: "#7a3535" },
              ].map(({ day, date, from, to, km, elev, color, rest, note }) => (
                <div key={day} className="flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
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
                      <p className="text-[10px] text-foreground/40 mt-0.5 italic" style={nunito}>{note}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-1 mt-0.5" style={nunito}>
                    <span className="text-[10px] text-foreground/35">{date}</span>
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
          </motion.div>

          {/* Two-col info blocks */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
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
            <h3 className="text-[10px] uppercase tracking-widest text-accent mb-4" style={rubikOne}>Entry & Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Self-supported */}
              <div className="rounded-xl border border-white/15 bg-black/40 px-6 py-6">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2" style={rubikOne}>Self-Supported</p>
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
              </div>

              {/* With logistics */}
              <div className="rounded-xl border border-accent/40 bg-black/40 px-6 py-6 relative">
                <div
                  className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-accent border border-accent/40 rounded px-2 py-0.5"
                  style={rubikOne}
                >
                  Popular
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2" style={rubikOne}>With Logistics</p>
                <p className="text-4xl md:text-5xl font-bold text-white leading-none mb-1" style={rubikOne}>€600–€1,000</p>
                <p className="text-xs text-foreground/45 mb-4" style={nunito}>Maximum estimated cost — based on participant numbers &amp; accommodation choices</p>
                <ul className="space-y-2" style={nunito}>
                  <li className="text-xs text-foreground/60 flex gap-2">
                    <span className="text-accent/50 mt-0.5">✓</span>
                    <span>Everything included in Self Supported option</span>
                  </li>
                </ul>

                <div className="mt-3 rounded-lg border border-white/10 bg-white/3 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2" style={rubikOne}>Via local delivery partner</p>
                  <ul className="space-y-1.5" style={nunito}>
                    {[
                      "Luggage transfers between stops",
                      "Transfer from Marrakech to start",
                      "Transfer from finish to Marrakech",
                    ].map(item => (
                      <li key={item} className="text-xs text-foreground/60 flex gap-2">
                        <span className="text-accent/50 mt-0.5">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <li className="text-xs text-foreground/60 flex gap-2 mt-2" style={nunito}>
                  <span className="text-accent/50 mt-0.5">✓</span>€200 accommodation allowance (to be organised separately)
                </li>

                <p className="text-[10px] text-foreground/30 mt-3 italic" style={nunito}>
                  Full logistics breakdown shared with registered participants.
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
            <h3 className="text-[10px] uppercase tracking-widest text-accent mb-3" style={rubikOne}>Logistics & Practicalities</h3>
            <div className="rounded-lg border border-white/15 overflow-hidden divide-y divide-white/10">
              {logistics.map((item, i) => {
                const isOpen = openLogistic === i;
                return (
                  <div key={i} className={isOpen ? "bg-white/5" : ""}>
                    <button
                      onClick={() => setOpenLogistic(isOpen ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-white/5"
                    >
                      <span
                        className={[
                          "text-sm leading-snug pr-4 transition-colors",
                          isOpen ? "text-accent" : "text-foreground/90"
                        ].join(" ")}
                        style={rubikOne}
                      >
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={["flex-shrink-0 text-lg leading-none transition-colors", isOpen ? "text-accent" : "text-foreground/40"].join(" ")}
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
                          <p className="px-4 pb-4 pt-1 text-sm text-foreground/65 leading-relaxed" style={nunito}>
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Event Documentation */}
              {(() => {
                const docsIndex = logistics.length;
                const isOpen = openLogistic === docsIndex;
                return (
                  <div className={isOpen ? "bg-white/5" : ""}>
                    <button
                      onClick={() => setOpenLogistic(isOpen ? null : docsIndex)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-white/5"
                    >
                      <span
                        className={["text-sm leading-snug pr-4 transition-colors", isOpen ? "text-accent" : "text-foreground/90"].join(" ")}
                        style={rubikOne}
                      >
                        Event Documentation
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={["flex-shrink-0 text-lg leading-none transition-colors", isOpen ? "text-accent" : "text-foreground/40"].join(" ")}
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
                                <p className="text-[10px] text-foreground/35">a-X Event T&Cs — PDF</p>
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
                                <p className="text-[10px] text-foreground/35">a-X Waiver — PDF</p>
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
            <p className="text-center text-[10px] text-foreground/60 mt-2" style={nunito}>
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
  );
}
