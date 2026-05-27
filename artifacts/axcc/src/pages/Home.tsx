import { useEffect, useRef } from "react";
import { Nav } from "@/components/Nav";

export default function Home() {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    [desktopRef.current, mobileRef.current].forEach((vid) => {
      if (!vid) return;
      vid.muted = true;
      vid.play().catch(() => {});
    });
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Video Background — desktop only */}
      <video
        ref={desktopRef}
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
        src={import.meta.env.BASE_URL + "hero.mp4"}
      />

      {/* Video Background — mobile only */}
      <video
        ref={mobileRef}
        autoPlay
        loop
        muted
        playsInline
        className="home-mobile-video md:hidden absolute inset-0 w-full h-full object-cover z-0"
        style={{ transform: "translateZ(0)" }}
        src={import.meta.env.BASE_URL + "home-mobile.mp4"}
      />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full min-h-[100dvh] flex flex-col items-center pt-8">
        <Nav />
      </div>
    </div>
  );
}
