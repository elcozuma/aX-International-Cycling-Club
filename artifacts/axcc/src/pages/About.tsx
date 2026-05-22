import { Nav } from "@/components/Nav";
import { Link } from "wouter";
import { motion } from "framer-motion";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const dmSans = { fontFamily: "'Nunito', sans-serif" };

export default function About() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans bg-black">
      <div className="hidden md:block absolute inset-0 z-0" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}page-bg-v2.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        {/* Block */}
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden">

          {/* Logo — top-left of block */}
          <img
            src={import.meta.env.BASE_URL + "ax-logo.png"}
            alt="a-X"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-bottom-2 md:right-5 z-0 h-20 md:h-24 w-auto opacity-75 pointer-events-none select-none"
          />

          {/* Collage image — anchored to bottom-left, hanging slightly outside — desktop only */}
          <motion.img
            src={import.meta.env.BASE_URL + "about-collage.png"}
            alt="a-X collage"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block absolute bottom-0 left-0 w-[50%] object-contain drop-shadow-2xl translate-y-[10%] -translate-x-[6%] pointer-events-none select-none"
          />

          {/* Text content — full width on mobile, right half on desktop */}
          <div className="absolute inset-0 overflow-y-auto pl-6 pr-6 md:pl-[52%] md:pr-12">
          <div className="min-h-full flex flex-col justify-center py-8">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={rubikOne}
              className="text-base md:text-lg normal-case text-accent leading-tight mb-6"
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
              <p className="text-sm md:text-base text-foreground font-light italic leading-snug">
                a-X (Across) is a cycling club that bridges club ride culture and A-to-B adventure cycling.
              </p>
              <p className="text-sm md:text-base">
                We curate small-group multi-day group rides designed around challenge, autonomy, and shared experience.
              </p>
              <p className="text-sm md:text-base">
                Routes are designed for capable riders who value exploration over luxury and experience over itinerary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3"
            >
              <Link href="/faq">
                <span className="text-xs md:text-sm text-foreground/50 hover:text-foreground/80 underline underline-offset-4 transition-colors cursor-pointer" style={dmSans}>
                  Have questions about the club? →
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-4"
            >
              <span className="text-sm text-foreground/60 uppercase" style={dmSans}>Follow us on:</span>
              <a href="https://www.strava.com/clubs/a-xcc" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-strava">
                <img src={import.meta.env.BASE_URL + "strava-logo.png"} alt="Strava" className="h-5 md:h-6 opacity-90 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>

          </div>{/* end inner centering wrapper */}
          </div>{/* end scroll container */}
        </div>
      </div>
    </div>
  );
}
