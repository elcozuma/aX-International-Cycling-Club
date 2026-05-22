import { Nav } from "@/components/Nav";
import { motion } from "framer-motion";
import { SiStrava } from "react-icons/si";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };

export default function About() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans" style={{ backgroundImage: "url('/page-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        {/* Block */}
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden">

          {/* Collage image — anchored to bottom-left, hanging slightly outside */}
          <motion.img
            src="/about-collage.png"
            alt="a-X collage"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-0 left-0 w-[52%] object-contain drop-shadow-2xl translate-y-[10%] -translate-x-[6%] pointer-events-none select-none"
          />

          {/* Text content — right half column */}
          <div className="absolute inset-0 flex flex-col justify-center pl-[52%] pr-8 md:pr-12 py-10 overflow-hidden">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-lg md:text-xl lg:text-2xl normal-case text-accent leading-tight mb-6 whitespace-nowrap"
            >
              a-X INTERNATIONAL CYCLING CLUB
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-4 text-foreground/90"
              style={dmSans}
            >
              <p className="text-base md:text-lg text-foreground font-light italic leading-snug">
                a-X (Across) is a cycling club that bridges club ride culture and A-to-B adventure cycling.
              </p>
              <p className="text-base md:text-lg">
                We curate small-group multi-day group rides designed around challenge, autonomy, and shared experience.
              </p>
              <p className="text-base md:text-lg">
                Routes are designed for capable riders who value exploration over luxury and experience over itinerary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-4"
            >
              <span className="text-sm text-foreground/60 uppercase" style={dmSans}>Follow us on:</span>
              <a href="#" className="flex items-center gap-2 group" data-testid="link-strava">
                <span className="text-lg md:text-xl tracking-widest" style={{ color: '#FC4C02', ...rubikOne }}>STRAVA</span>
                <SiStrava className="text-lg md:text-xl transition-transform group-hover:scale-110" style={{ color: '#FC4C02' }} />
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
