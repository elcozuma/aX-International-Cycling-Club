import { useEffect, useRef } from "react";
import { Nav } from "@/components/Nav";

function useAutoplayVideo(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const vid = ref.current;
    if (!vid) return;

    vid.muted = true;
    vid.setAttribute("playsinline", "");
    vid.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      vid.play().catch(() => {});
    };

    vid.addEventListener("canplay", tryPlay, { once: true });
    vid.addEventListener("loadedmetadata", tryPlay, { once: true });

    vid.load();
    tryPlay();

    return () => {
      vid.removeEventListener("canplay", tryPlay);
      vid.removeEventListener("loadedmetadata", tryPlay);
    };
  }, [ref]);
}

export default function Home() {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useAutoplayVideo(desktopRef);
  useAutoplayVideo(mobileRef);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Video Background — desktop only */}
      <video
        ref={desktopRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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
        preload="auto"
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
