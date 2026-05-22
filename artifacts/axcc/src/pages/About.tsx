import { Nav } from "@/components/Nav";
import { motion } from "framer-motion";
import { SiStrava } from "react-icons/si";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const dmSans = { fontFamily: "'DM Sans', sans-serif" };

export default function About() {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden text-foreground font-sans" style={{ backgroundImage: "url('/page-bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <Nav />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 min-h-[100dvh] flex flex-col items-center justify-center">
        <div className="w-full bg-black/55 backdrop-blur-sm rounded-xl px-10 py-12 flex flex-col md:flex-row items-center gap-10">

          {/* Collage image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/2 flex-shrink-0 flex items-center justify-center"
          >
            <img src="/about-collage.png" alt="a-X collage" className="w-full object-contain drop-shadow-2xl" />
          </motion.div>

          {/* Text content */}
          <div className="w-full md:w-3/5 flex flex-col">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={rubikOne}
            className="text-3xl md:text-4xl lg:text-5xl normal-case text-accent leading-tight mb-8"
          >
            a-X INTERNATIONAL<br />CYCLING CLUB
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-6 text-lg md:text-xl text-foreground/90 max-w-2xl"
            style={dmSans}
          >
            <p className="text-2xl md:text-3xl text-foreground font-light italic">
              a-X (Across) is a cycling club that bridges club ride culture and A-to-B adventure cycling.
            </p>
            <p>
              We curate small-group multi-day group rides designed around challenge, autonomy, and shared experience.
            </p>
            <p>
              Routes are designed for capable riders who value exploration over luxury and experience over itinerary.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-14 flex items-center gap-4"
          >
            <span className="text-sm text-foreground/60 uppercase" style={dmSans}>Follow us on:</span>
            <a href="#" className="flex items-center gap-2 group" data-testid="link-strava">
              <span className="text-3xl tracking-widest" style={{ color: '#FC4C02', ...rubikOne }}>STRAVA</span>
              <SiStrava className="text-2xl transition-transform group-hover:scale-110" style={{ color: '#FC4C02' }} />
            </a>
          </motion.div>

          </div>{/* end text content */}
        </div>
      </div>
    </div>
  );
}
