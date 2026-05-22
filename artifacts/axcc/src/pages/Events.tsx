import { Nav } from "@/components/Nav";
import { motion } from "framer-motion";

const moroccoImg = "/morocco-event.jpeg";

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
    image: moroccoImg,
    formUrl: "https://forms.gle/4M9eEvEsidtxkPbd9"
  }
];

export default function Events() {
  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans"
      style={{ backgroundImage: "url('/page-bg-v2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-y-auto px-8 md:px-12 py-8">

          {/* Logo — bottom-right */}
          <img src="/ax-logo.png" alt="a-X" className="absolute bottom-1 right-5 z-20 h-20 md:h-24 w-auto opacity-75 pointer-events-none select-none" />

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
            <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl" style={nunito}>
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
            {expeditions.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1 }}
                className="relative overflow-hidden rounded-lg border border-white/10 group hover:border-accent/60 transition-colors"
                style={{ minHeight: "280px" }}
              >
                {/* Background image */}
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-[0.2] transition-all duration-700 scale-105 group-hover:scale-100"
                />
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
                      { label: "DATE", value: exp.date },
                      { label: "DURATION", value: exp.duration },
                      { label: "DISTANCE", value: exp.distance },
                      { label: "ELEVATION", value: exp.elevation },
                      { label: "TERRAIN", value: exp.terrain }
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-xs uppercase">
                        <span className="text-white/55">{label}</span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={exp.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full py-2 text-center border border-accent/70 text-accent hover:bg-accent hover:text-background transition-colors uppercase text-xs rounded tracking-widest"
                    style={rubikOne}
                    data-testid={`btn-interest-${exp.id}`}
                  >
                    EXPRESS INTEREST
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex-shrink-0 mt-10 text-xs text-foreground/35 italic text-center"
            style={nunito}
          >
            All routes are designed for self-sufficient riders. Minimal support. Maximum experience.
          </motion.p>

        </div>
      </div>
    </div>
  );
}
