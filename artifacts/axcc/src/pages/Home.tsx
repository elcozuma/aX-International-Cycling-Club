import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Video Background — desktop only */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
        src="/hero.mp4"
      />

      {/* Static image — mobile only: full width, centred vertically, no horizontal clipping */}
      <div className="md:hidden absolute inset-0 z-0" style={{ backgroundColor: "#2e2b1f" }}>
        <img
          src="/home-mobile.png"
          alt=""
          className="absolute w-full"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full min-h-[100dvh] flex flex-col items-center pt-8">
        <Nav />
      </div>
    </div>
  );
}
