import { Nav } from "@/components/Nav";
import { motion } from "framer-motion";

import moroccoImg from "../assets/images/morocco.png";
import pamirImg from "../assets/images/pamir.png";
import atlasImg from "../assets/images/atlas.png";

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
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground font-sans">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-[100dvh] flex flex-col">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display text-accent mb-16 tracking-widest text-center"
        >
          UPCOMING EXPEDITIONS
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 flex-grow">
          {expeditions.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex flex-col border border-border bg-card group hover:border-accent transition-colors"
            >
              <div className="h-48 md:h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-background/20 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0" />
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-display tracking-widest mb-6 text-foreground">{exp.title}</h2>
                
                <div className="space-y-3 font-mono text-sm opacity-80 uppercase mb-8 flex-grow">
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span>DATE</span>
                    <span className="text-accent">{exp.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span>DURATION</span>
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span>DISTANCE</span>
                    <span>{exp.distance}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span>TERRAIN</span>
                    <span>{exp.terrain}</span>
                  </div>
                </div>

                <button 
                  className="w-full py-3 border border-accent text-accent font-display tracking-widest hover:bg-accent hover:text-background transition-colors uppercase text-sm"
                  data-testid={`btn-interest-${exp.id}`}
                >
                  EXPRESS INTEREST
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center font-serif text-lg md:text-xl text-foreground/80 italic max-w-2xl mx-auto"
        >
          All routes are designed for self-sufficient riders. Minimal support. Maximum experience.
        </motion.div>
      </div>
    </div>
  );
}
