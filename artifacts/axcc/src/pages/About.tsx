import { Nav } from "@/components/Nav";
import { motion } from "framer-motion";
import { SiStrava } from "react-icons/si";

import polaroid1 from "../assets/images/polaroid-1.png";
import polaroid2 from "../assets/images/polaroid-2.png";
import polaroid3 from "../assets/images/polaroid-3.png";
import polaroid4 from "../assets/images/polaroid-4.png";

export default function About() {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden text-foreground font-sans" style={{ backgroundImage: "url('/page-bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <Nav />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 min-h-[100dvh] flex flex-col items-center justify-center">
      <div className="w-full flex flex-col md:flex-row items-center gap-12 lg:gap-24 bg-black/55 backdrop-blur-sm rounded-xl px-10 py-12">
        
        {/* Left Side: Photo Collage */}
        <div className="w-full md:w-5/12 relative h-[500px] lg:h-[700px] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ delay: 0.2 }}
            className="absolute top-10 right-10 md:top-20 md:right-20 w-48 lg:w-64 bg-white p-3 pb-10 shadow-xl z-10"
          >
            <img src={polaroid1} alt="Gravel road" className="w-full h-auto aspect-square object-cover grayscale opacity-90 mix-blend-multiply" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-20 left-10 md:bottom-32 md:left-10 w-52 lg:w-72 bg-white p-3 pb-12 shadow-xl z-20"
          >
            <img src={polaroid2} alt="Muddy gear" className="w-full h-auto aspect-square object-cover grayscale opacity-90 mix-blend-multiply" />
            <div className="absolute bottom-3 left-0 w-full text-center font-display text-background text-sm opacity-60">GEAR</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ delay: 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 lg:w-80 bg-white p-3 pb-14 shadow-2xl z-30"
          >
            <img src={polaroid3} alt="Desert rider" className="w-full h-auto aspect-square object-cover sepia-[0.3] contrast-125" />
            <div className="absolute bottom-4 left-0 w-full text-center font-display text-background text-xl font-bold tracking-widest">a-X</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-0 right-0 w-44 lg:w-56 bg-white p-3 pb-10 shadow-xl z-10"
          >
            <img src={polaroid4} alt="Camp setup" className="w-full h-auto aspect-square object-cover grayscale opacity-80 mix-blend-multiply" />
          </motion.div>
        </div>

        {/* Right Side: Copy */}
        <div className="w-full md:w-7/12 flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display text-accent leading-none mb-10 tracking-widest break-words"
          >
            A-X INTERNATIONAL<br/>CYCLING CLUB
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 text-lg md:text-xl font-light text-foreground/90 max-w-2xl"
          >
            <p className="font-serif text-2xl md:text-3xl text-foreground mb-8 italic">
              a-X (Across) is a cycling club that bridges club ride culture and A-to-B adventure cycling.
            </p>
            <p>
              Not a race, not a tour, we curate small-group expeditions designed around challenge, autonomy, and shared experience.
            </p>
            <p>
              Routes are designed for capable riders who value exploration over luxury and experience over itinerary.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex items-center gap-4"
          >
            <span className="text-sm font-display text-foreground/60 uppercase">Follow us on:</span>
            <a href="#" className="flex items-center gap-2 group" data-testid="link-strava">
              <span className="text-3xl font-display tracking-widest" style={{ color: '#FC4C02' }}>STRAVA</span>
              <SiStrava className="text-2xl transition-transform group-hover:scale-110" style={{ color: '#FC4C02' }} />
            </a>
          </motion.div>
        </div>

      </div>
      </div>
    </div>
  );
}
