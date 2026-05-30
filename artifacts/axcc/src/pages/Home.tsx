import { useEffect, useRef, useState } from "react";
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

const PLAYLIST_ID = "7GCUvjRop8bqUw8LfBte5r";

function SpotifyWidget() {
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = (IFrameAPI: any) => {
      if (!iframeContainerRef.current) return;
      IFrameAPI.createController(
        iframeContainerRef.current,
        { uri: `spotify:playlist:${PLAYLIST_ID}` },
        (controller: any) => {
          controllerRef.current = controller;
          controller.addListener("playback_update", (e: any) => {
            setPlaying(!e.data.isPaused);
          });
          setReady(true);
        }
      );
    };

    (window as any).onSpotifyIframeApiReady = init;

    if ((window as any).SpotifyIframeApi) {
      init((window as any).SpotifyIframeApi);
    } else if (!document.getElementById("spotify-iframe-api")) {
      const s = document.createElement("script");
      s.id = "spotify-iframe-api";
      s.src = "https://open.spotify.com/embed/iframe-api/v1";
      s.async = true;
      document.body.appendChild(s);
    }

    return () => {
      controllerRef.current?.destroy?.();
      controllerRef.current = null;
    };
  }, []);

  const toggle = () => {
    const c = controllerRef.current;
    if (!c) return;
    if (playing) c.pause(); else c.resume();
  };
  const prev = () => controllerRef.current?.previousTrack?.();
  const next = () => controllerRef.current?.nextTrack?.();

  return (
    <>
      {/* Off-screen iframe target — Spotify SDK injects its iframe here */}
      <div
        ref={iframeContainerRef}
        style={{ position: "fixed", left: "-9999px", top: "-9999px", width: "1px", height: "1px" }}
      />

      {/* Visible widget — right side, vertically centred */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 select-none">
        {/* Cheeky label */}
        <p
          className="text-white/50 text-[9px] uppercase tracking-[0.2em]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          ↑ don't press this
        </p>

        {/* Controls pill */}
        <div className="flex flex-col items-center gap-2 bg-black/35 backdrop-blur-md rounded-full px-2.5 py-3 border border-white/10">
          <button
            onClick={prev}
            disabled={!ready}
            aria-label="Previous track"
            className="text-white/60 hover:text-white transition-colors disabled:opacity-30 cursor-pointer p-0.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>

          <button
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? "Pause" : "Play"}
            className="text-white hover:text-accent transition-colors disabled:opacity-30 cursor-pointer p-0.5"
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <button
            onClick={next}
            disabled={!ready}
            aria-label="Next track"
            className="text-white/60 hover:text-white transition-colors disabled:opacity-30 cursor-pointer p-0.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        {/* Spotify logo */}
        <a
          href={`https://open.spotify.com/playlist/${PLAYLIST_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open playlist on Spotify"
          className="opacity-30 hover:opacity-60 transition-opacity"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </a>
      </div>
    </>
  );
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

      <SpotifyWidget />
    </div>
  );
}
