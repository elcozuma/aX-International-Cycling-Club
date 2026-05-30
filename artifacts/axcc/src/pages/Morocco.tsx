import { useEffect, useState, useCallback, useRef } from "react";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";

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

const logistics: { q: string; a: string }[] = [
  {
    q: "Who is this event for?",
    a: "This event is for riders who fancy something a bit more out there than a typical sportive. It's a point-to-point adventure through remote terrain with a small group of like-minded people. If you're newer to bikepacking or remote riding, the structured format gives you a solid platform to push your limits. If you're an experienced rider, the appeal is a thoughtfully curated route, plus the option to add logistics support so you can focus on riding rather than logistics."
  },
  {
    q: "What does the base event fee cover?",
    a: "The event fee (€400) covers route planning and reconnaissance, GPX files, hosting and group coordination across all riding days, and administration of any optional logistics arrangements. Flights, accommodation and transfers are not included."
  },
  {
    q: "Why is the full price of Event Fee + Logistical Support (<€950) only a maximum estimated cost?",
    a: "The <€950 figure is calculated using the base event fee (€400) plus the maximum costs of logistical support and accommodation, based on a minimum of 5 people participating. As more riders join, the group benefits from economies of scale — and those savings are passed directly back to participants. The ethos of a-X is to make adventure cycling more accessible and affordable, which means we do not profit from optional services. We also always try to negotiate fixed rates with service providers to help keep costs as low as possible."
  },
  {
    q: "How does the optional logistic support work?",
    a: "The logistics option provides additional services on top of the base event fee. These are arranged separately through a local delivery partner in Morocco and include luggage transfers between overnight stops and in-region rider + bike transfers to and from Marrakech to the remote start point in Anezi and from the final destination (Taznacht). The local partner can also take bookings and payment for hotels along the route, making it straightforward to sort accommodation without having to arrange things independently in advance. Payment for all logistics services is made directly to the local delivery partner on arrival at the event. Full details and pricing for each option will be shared with registered participants ahead of the event once numbers have been confirmed."
  },
  {
    q: "Are transfers to the start and from the finish included, and when will we leave and return to Marrakech?",
    a: "Transfers are included in the optional logistics package only. This covers three legs: a transfer from Marrakech to Southern Morocco on Day 0 (22nd March), a short transfer from a hotel in Southern Morocco to Anezi on Day 1 (23rd March) and a transfer from the finish in Taznacht back to Marrakech on Day 6 (28th March). Luggage transfers between overnight stops throughout are also included. The meeting point on Day 0 (22nd March) is in Marrakech at 12pm, with the outbound transfer to Anezi taking place the following morning. The return from Taznacht on 28th March will not arrive back in Marrakech until very late in the day. Self-supported riders will need to arrange their own transport to and from the route start and end points and carry their own luggage. Regardless of option, it is strongly advisable to allow an extra day either side of the 7-day trip when booking flights."
  },
  {
    q: "Do I book my own accommodation? What options are there?",
    a: "The route passes through areas with a mix of small guesthouses, riads, and basic auberges. Riders can either book independently or, if taking the logistics option, have the local delivery partner arrange and take payment for hotels along the route on their behalf. Camping is also permitted where appropriate. Recommendations and a list of options will be provided in the event briefing."
  },
  {
    q: "Is there a support vehicle during the riding days?",
    a: "There is no trailing support vehicle — the event is designed around self-sufficiency and riders are expected to carry what they need for the day. However, a vehicle will be available on standby throughout the riding days and can be called upon in case of mechanical failure, injury or other issues. Please note that in more remote or off-road sections of the route, the vehicle may not always be immediately reachable, so riders should plan accordingly and not rely on it as a guaranteed safety net."
  },
  {
    q: "Do I need to bring my own bike?",
    a: "Yes — all riders need to come prepared with a suitable bike and equipment for the terrain and conditions. Whilst it may be possible to rent a bicycle locally, it is not advised due to potential issues with fit and quality. Please contact the event host if you require any advice on how to transport your bike."
  },
  {
    q: "What happens if I have a mechanical issue or injury on the route?",
    a: "Riders are expected to be self-reliant and prepared to handle common mechanicals out on the road. That said, one of the benefits of riding as a group is having other riders around who can help — between the group there will generally be a reasonable spread of tools, spare parts and practical knowledge. The event host also has familiarity with the local area and can assist in identifying the nearest towns or resources if something more serious arises. A standby vehicle will also be available throughout the riding days for situations that cannot be resolved on the road."
  },
  {
    q: "What should I expect from the weather and conditions?",
    a: "The Anti-Atlas in late March can be variable. Expect warm, dry conditions at lower elevations during the day, but temperatures can drop significantly in the mountains, particularly after dark. Rain is possible, especially early in the week, and high passes may be cold and exposed. Riders should come prepared for a range of conditions — windproof and waterproof layers, warm kit for mornings and evenings, and sun protection for the middle of the day. Detailed weather guidance and packing recommendations will be included in the event briefing."
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

          {/* Route map + Day-by-day */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-8"
          >
            <h3 className="text-[10px] uppercase tracking-widest text-accent mb-3" style={rubikOne}>The Route</h3>

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
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white/80 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded" style={rubikOne}>
                  Click to enlarge
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
              <h3 className="text-[10px] uppercase tracking-widest text-accent mb-2" style={rubikOne}>Terrain & Conditions</h3>
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
              <div className="rounded-xl border border-accent/70 bg-accent/8 px-6 py-6 relative shadow-[0_0_36px_-4px_rgba(137,152,42,0.45)]">
                <div
                  className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-background bg-accent rounded px-2 py-0.5"
                  style={rubikOne}
                >
                  Recommended
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2" style={rubikOne}>With Logistics</p>
                <p className="text-4xl md:text-5xl font-bold text-white leading-none mb-1" style={rubikOne}>&lt;€950</p>
                <p className="text-xs text-foreground/45 mb-4" style={nunito}>Maximum estimated cost — dependent on participant numbers &amp; accommodation choices</p>
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
                      "Stand-by vehicle*",
                      "Accommodation (optional)",
                    ].map(item => (
                      <li key={item} className="text-xs text-foreground/60 flex gap-2">
                        <span className="text-accent/50 mt-0.5">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[10px] text-foreground/30 mt-3 italic" style={nunito}>
                  *Where terrain and access allow. Full logistics breakdown shared with registered participants.
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
