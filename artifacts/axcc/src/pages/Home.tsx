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

      {/* Static Background — mobile only */}
      <div
        className="md:hidden absolute inset-0 z-0"
        style={{ backgroundImage: "url('/page-bg-v2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full min-h-[100dvh] flex flex-col items-center pt-8">
        <Nav />

        {/* Mobile title — hidden on md+ */}
        <div className="md:hidden absolute bottom-16 left-0 right-0 px-8 flex justify-center">
          <div className="text-center" style={{ fontFamily: "'Rubik One', sans-serif", color: "#f5e530" }}>
            <p className="text-2xl leading-tight normal-case">a-X</p>
            <p className="text-lg leading-snug normal-case">International Cycling Club</p>
          </div>
        </div>
      </div>
    </div>
  );
}
