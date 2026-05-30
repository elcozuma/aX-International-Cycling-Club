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

          {/* Logo — absolute bottom-right */}
          <img
            src={import.meta.env.BASE_URL + "ax-logo.png"}
            alt="a-X"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-[76%] lg:left-auto lg:translate-x-0 lg:-bottom-2 lg:right-5 z-0 h-20 lg:h-24 w-auto opacity-75 pointer-events-none select-none [@media(max-height:600px)]:hidden"
          />

          {/* Collage image — anchored to bottom-left — desktop only */}
          <motion.img
            src={import.meta.env.BASE_URL + "about-collage.png"}
            alt="a-X collage"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block absolute bottom-0 left-0 w-[50%] object-contain drop-shadow-2xl translate-y-[10%] -translate-x-[6%] pointer-events-none select-none z-[1]"
          />

          {/* Text content — full width on mobile, right half on desktop */}
          <div className="absolute inset-0 overflow-y-auto pl-6 pr-6 md:pl-[52%] md:pr-12 z-[2]">
            <div className="min-h-full flex flex-col justify-center py-8">

              {/* Club label */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={rubikOne}
                className="text-base md:text-lg normal-case text-accent leading-tight mb-6"
              >
                a-X INTERNATIONAL CYCLING CLUB
              </motion.h1>

              {/* Mission Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-accent/80 mb-2" style={rubikOne}>
                  Mission
                </p>
                <p className="text-sm md:text-base text-foreground/90 font-light italic leading-relaxed" style={dmSans}>
                  To create a middle ground between fully self-supported adventure riding and expensive, inflexible cycling tours.
                </p>
                <p className="mt-2 text-sm md:text-base text-foreground/80 leading-relaxed" style={dmSans}>
                  a-X exists to bring people together through challenging multi-day rides built around autonomy, shared experience and meaningful terrain — whilst keeping activities as accessible and affordable as possible.
                </p>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-8 h-px bg-accent/40 mb-6"
              />

              {/* About / Story */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="space-y-3"
                style={dmSans}
              >
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-accent/80 mb-2" style={rubikOne}>
                  About
                </p>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  Over the years, I'd become increasingly frustrated by the lack of affordable group adventure cycling opportunities.
                </p>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  It often feels like the only options are: go fully self-supported — managing your own logistics and accepting all the risk — or join an expensive all-inclusive tour with little flexibility.
                </p>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  a-X (Across) is my answer to that middle ground: a cycling club built around small-group adventure riding. Routes will primarily focus on gravel, remote landscapes and A-to-B riding for people who value exploration over luxury and experience over itinerary.
                </p>
              </motion.div>

              {/* FAQ link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-5"
              >
                <Link href="/faq">
                  <span className="text-xs md:text-sm text-foreground/50 hover:text-foreground/80 underline underline-offset-4 transition-colors cursor-pointer" style={dmSans}>
                    Have questions about the club? →
                  </span>
                </Link>
              </motion.div>

              {/* Strava */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 flex items-center gap-4"
              >
                <span className="text-sm text-foreground/60 uppercase" style={dmSans}>Follow us on:</span>
                <a href="https://www.strava.com/clubs/a-xcc" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-strava">
                  <img src={import.meta.env.BASE_URL + "strava-logo.png"} alt="Strava" className="h-5 md:h-6 opacity-90 group-hover:opacity-100 transition-opacity" />
                </a>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
