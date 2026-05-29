import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Nav } from "@/components/Nav";
import { motion } from "framer-motion";

import mapImg    from "@assets/a-X_Website-5_1780065568271.png";
import hoverImg1 from "@assets/IMG_5732_1780065776415.jpeg";
import hoverImg2 from "@assets/a-X_Website-4_1780065568271.png";
import hoverImg3 from "@assets/a-X_Website-8_1780065568271.png";
import hoverImg4 from "@assets/IMG_5838_1780065776415.jpeg";
import hoverImg5 from "@assets/a-X_Website-9_1780065568271.png";
import hoverImg6 from "@assets/IMG_5852_1780065776415.jpeg";
import hoverImg7 from "@assets/IMG_5808_1780065776415.jpeg";
import hoverImg8 from "@assets/IMG_5814_1780065776415.jpeg";
import hoverImg9 from "@assets/IMG_5721_1780065776415.jpeg";
import hoverImg10 from "@assets/a-X_Website-6_1780065568271.png";
import hoverImg11 from "@assets/IMG_5794_1780065776415.jpeg";
import hoverImg12 from "@assets/a-X_Website-7_1780065568271.png";
import hoverImg13 from "@assets/IMG_5770_1780065776415.jpeg";
import hoverImg14 from "@assets/IMG_5968_1780065776415.jpeg";

const HOVER_IMAGES = [
  hoverImg1, hoverImg2, hoverImg3, hoverImg4, hoverImg5,
  hoverImg6, hoverImg7, hoverImg8, hoverImg9, hoverImg10,
  hoverImg11, hoverImg12, hoverImg13, hoverImg14,
];

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

const expeditions = [
  {
    id: "anti-atlas",
    title: "ANTI-ATLAS MOROCCO",
    date: "MARCH 2027",
    duration: "7 DAYS",
    distance: "440KM",
    elevation: "9,000M",
    terrain: "GRAVEL+",
    cost1: "€400* (Event Fee + Self Supported)",
    cost2: "€600–€1,000* (Event Fee + Logistical support and various accommodation options)**",
    costNote: "*Flights not included",
    costNote2: "**Additional services to be sourced independently or via a local delivery partner",
    costNote3: "Receive 50% discount on Entry Fee for next event when signing up for this event",
    formUrl: "https://forms.gle/4M9eEvEsidtxkPbd9",
    detailPath: "/morocco",
  }
];

function MoroccoCard({ exp }: { exp: typeof expeditions[0] }) {
  const [hovered, setHovered] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (hovered) {
      intervalRef.current = setInterval(() => {
        setSlideIdx(i => (i + 1) % HOVER_IMAGES.length);
      }, 420);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setSlideIdx(0);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [hovered]);

  const displayImage = hovered ? HOVER_IMAGES[slideIdx] : mapImg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="relative overflow-hidden rounded-lg border border-white/10 group hover:border-accent/60 transition-colors"
      style={{ minHeight: "280px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Map image — always rendered below */}
      <img
        src={mapImg}
        alt={exp.title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
        style={{ filter: "grayscale(0.5)" }}
      />

      {/* Hover cycling images — fade in on top */}
      {HOVER_IMAGES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 select-none pointer-events-none"
          style={{
            opacity: hovered && i === slideIdx ? 1 : 0,
            filter: "grayscale(0.2)",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/15" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-5" style={{ minHeight: "280px" }}>
        <h2
          className="text-sm md:text-base normal-case text-white leading-tight mb-auto"
          style={rubikOne}
        >
          {exp.title}
        </h2>

        <div className="mt-4 space-y-1.5 bg-black/30 rounded-md px-3 py-2.5" style={nunito}>
          {[
            { label: "DATE",      value: exp.date },
            { label: "DURATION",  value: exp.duration },
            { label: "DISTANCE",  value: exp.distance },
            { label: "ELEVATION", value: exp.elevation },
            { label: "TERRAIN",   value: exp.terrain }
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-xs uppercase">
              <span className="text-white/55">{label}</span>
              <span className="text-white font-semibold">{value}</span>
            </div>
          ))}
          <div className="pt-1.5 mt-0.5 border-t border-white/15">
            <span className="text-white/55 text-xs uppercase">Expected Cost</span>
            <p className="text-white text-xs font-semibold mt-0.5">{exp.cost1}</p>
            <p className="text-white/40 text-[9px] uppercase tracking-widest my-0.5">or</p>
            <p className="text-white text-xs font-semibold">{exp.cost2}</p>
            <p className="text-white/50 text-[9px] italic mt-1">{exp.costNote}</p>
            <p className="text-white/50 text-[9px] italic mt-0.5">{exp.costNote2}</p>
            <p className="text-white/50 text-[9px] italic mt-0.5">{exp.costNote3}</p>
          </div>
        </div>

        {/* Buttons row */}
        <div className="mt-4 flex gap-2">
          <Link href={exp.detailPath}>
            <span
              className="flex-1 block py-2 text-center bg-accent/15 border border-accent/50 text-accent hover:bg-accent hover:text-background transition-colors uppercase text-xs rounded tracking-widest cursor-pointer"
              style={rubikOne}
            >
              VIEW EXPEDITION
            </span>
          </Link>
          <a
            href={exp.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 block py-2 text-center border border-white/25 text-white/60 hover:border-accent/50 hover:text-accent transition-colors uppercase text-xs rounded tracking-widest"
            style={rubikOne}
            data-testid={`btn-interest-${exp.id}`}
          >
            EXPRESS INTEREST
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Events() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans bg-black">
      <div className="hidden md:block absolute inset-0 z-0" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}page-bg-v2.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col">

          <img
            src={import.meta.env.BASE_URL + "ax-logo.png"}
            alt="a-X"
            className="hidden lg:block absolute lg:-bottom-2 lg:right-5 z-0 h-24 w-auto opacity-75 pointer-events-none select-none [@media(max-height:600px)]:!hidden"
          />

          <div className="relative z-[1] flex-1 overflow-y-auto px-8 md:px-12 pt-5 md:pt-6 pb-12">

            {/* Club Rides */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 pb-8 border-b border-white/10"
            >
              <h2 style={rubikOne} className="text-base md:text-lg normal-case text-accent leading-tight mb-3">
                CLUB RIDES
              </h2>
              <p className="text-sm text-foreground/70 leading-relaxed" style={nunito}>
                a-X club group rides will soon be announced, based in <span className="text-foreground/90">Leeds, UK</span> and <span className="text-foreground/90">Málaga, Spain</span>. Club rides are open to the public and free to attend.{" "}
                <a
                  href="https://www.strava.com/clubs/a-xcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-foreground/50 hover:text-foreground/80 transition-colors"
                >
                  Check Strava for updates.
                </a>
              </p>
            </motion.div>

            {/* Expeditions */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={rubikOne}
              className="text-base md:text-lg normal-case text-accent leading-tight mb-6"
            >
              UPCOMING EXPEDITIONS
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {expeditions.map(exp => (
                <MoroccoCard key={exp.id} exp={exp} />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex-shrink-0 mt-5 text-xs text-foreground/35 italic text-center"
              style={nunito}
            >
              All routes are designed for self-sufficient riders. Minimal support. Maximum experience.
            </motion.p>

            <div className="lg:hidden flex justify-center pt-6 pb-2">
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
