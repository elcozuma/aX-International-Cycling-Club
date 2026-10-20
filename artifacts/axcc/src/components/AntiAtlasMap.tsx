import { useEffect, useRef, useState } from "react";

const MAP_SRC = `${import.meta.env.BASE_URL}anti-atlas-map.html`;
const MESSAGE_TYPE = "ax-anti-atlas:resize";
const MIN_HEIGHT = 480;
const MAX_HEIGHT = 6000;

/**
 * Responsive wrapper for the supplied Anti-Atlas map + itinerary document.
 * The original markup, styles and script are served untouched (save for the
 * D7 itinerary update) from /public so their behaviour stays faithful.
 * Height is synced from the same-origin iframe via a verified postMessage.
 */
export function AntiAtlasMap() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>(1180);

  useEffect(() => {
    const expectedOrigin = window.location.origin;
    const onMessage = (event: MessageEvent) => {
      const frame = iframeRef.current;
      if (!frame || event.source !== frame.contentWindow) return;
      if (event.origin !== expectedOrigin) return;
      const data = event.data as { type?: unknown; height?: unknown } | null;
      if (!data || typeof data !== "object" || data.type !== MESSAGE_TYPE) return;
      const h = Number(data.height);
      if (!Number.isFinite(h)) return;
      setHeight(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.ceil(h))));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div
      className="w-full rounded-lg overflow-hidden border border-white/10"
      style={{ background: "#1d1f21" }}
      data-testid="map-anti-atlas"
    >
      <iframe
        ref={iframeRef}
        src={MAP_SRC}
        title="a-X Anti-Atlas expedition map and dated itinerary, 22–29 March"
        loading="lazy"
        scrolling="no"
        className="block w-full border-0"
        style={{ height, background: "#1d1f21", colorScheme: "dark" }}
      />
    </div>
  );
}
