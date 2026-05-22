import { Nav } from "@/components/Nav";
import { motion } from "framer-motion";

import moroccoImg from "../assets/images/morocco.png";
import pamirImg from "../assets/images/pamir.png";
import atlasImg from "../assets/images/atlas.png";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

const expeditions = [
  {
    id: "anti-atlas",
    title: "ANTI-ATLAS MOROCCO",
    date: "MARCH 2027",
    duration: "7 DAYS",
    distance: "420KM",
    terrain: "GRAVEL",
    image: moroccoImg
  },
  {
    id: "pamir",
    title: "PAMIR HIGHWAY",
    date: "SEPTEMBER 2027",
    duration: "14 DAYS",
    distance: "1,200KM",
    terrain: "MIXED TERRAIN",
    image: pamirImg
  },
  {
    id: "atlas-atlantic",
    title: "ATLAS TO ATLANTIC",
    date: "APRIL 2028",
    duration: "10 DAYS",
    distance: "650KM",
    terrain: "GRAVEL / ROAD",
    image: atlasImg
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

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={rubikOne}
            className="text-base md:text-lg normal-case text-accent leading-tight mb-6"
          >
            UPCOMING EXPEDITIONS
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {expeditions.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1 }}
                className="flex flex-col border border-white/10 bg-white/5 group hover:border-accent transition-colors overflow-hidden rounded-lg"
              >
                <div className="h-32 md:h-40 overflow-hidden relative flex-shrink-0">
                  <div className="absolute inset-0 bg-black/20 z-10 transition-opacity group-hover:opacity-0" />
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <h2
                    className="text-sm md:text-base normal-case mb-4 text-foreground"
                    style={rubikOne}
                  >
                    {exp.title}
                  </h2>

                  <div className="flex-grow space-y-2 mb-4" style={nunito}>
                    {[
                      { label: "DATE", value: exp.date },
                      { label: "DURATION", value: exp.duration },
                      { label: "DISTANCE", value: exp.distance },
                      { label: "TERRAIN", value: exp.terrain }
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between border-b border-white/10 pb-2 text-xs uppercase">
                        <span className="text-foreground/40">{label}</span>
                        <span className="text-foreground/80">{value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="w-full py-2 border border-accent/60 text-accent hover:bg-accent hover:text-background transition-colors uppercase text-xs rounded tracking-widest"
                    style={rubikOne}
                    data-testid={`btn-interest-${exp.id}`}
                  >
                    EXPRESS INTEREST
                  </button>
                </div>
              </motion.div>
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

        </div>
      </div>
    </div>
  );
}
