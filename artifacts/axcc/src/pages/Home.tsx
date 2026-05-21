import { Nav } from "@/components/Nav";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        src="/hero.mp4"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full min-h-[100dvh] flex flex-col justify-between p-8">
        
        {/* Top Header Information */}
        <header className="flex justify-between items-start w-full">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col text-xs md:text-sm font-display leading-tight opacity-80"
          >
            <span>a-X</span>
            <span>INTERNATIONAL</span>
            <span>CYCLING CLUB</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col text-xs md:text-sm font-display leading-tight text-right opacity-80"
          >
            <span>MARCH 2027</span>
            <span>ANTI-ATLAS</span>
            <span>MOROCCO</span>
          </motion.div>
        </header>

        <Nav />

        {/* Bottom Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="pb-8 w-full max-w-7xl mx-auto"
        >
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-4 tracking-tight normal-case text-foreground leading-[0.9]">
            Comfort not included
          </h1>
          <p className="font-sans text-lg md:text-xl font-light opacity-90 max-w-xl">
            Multi-day expeditions in remote locations.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
