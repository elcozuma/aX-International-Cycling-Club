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
        src={import.meta.env.BASE_URL + "hero.mp4"}
      />

      {/* Video Background — mobile only */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="md:hidden absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: "calc(50% + 46px) center" }}
        src={import.meta.env.BASE_URL + "home-mobile.mp4"}
      />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full min-h-[100dvh] flex flex-col items-center pt-8">
        <Nav />
      </div>
    </div>
  );
}
