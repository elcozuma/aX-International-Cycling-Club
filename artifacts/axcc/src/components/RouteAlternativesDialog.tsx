import * as DialogPrimitive from "@radix-ui/react-dialog";

type Row = { name: string; time: string; km: number; ascent: number; unpaved: number; score: number };
type DayAlts = { day: number; def: Row; alts: Row[] };

const r = (name: string, time: string, km: number, ascent: number, unpaved: number, score: number): Row =>
  ({ name, time, km, ascent, unpaved, score });

export const ROUTE_ALTERNATIVES: Record<number, DayAlts> = {
  1: { day: 1, def: r("Default", "6h", 70, 2200, 32.2, 5.5), alts: [
    r("Hard", "7:01", 77.2, 2490, 39.9, 6.3),
    r("Hard 2", "6:51", 75.2, 2280, 46.5, 6.1),
    r("Very Hard", "7:45", 82.8, 2590, 51.7, 6.9),
    r("Option 2, no hike-a-bike", "4:38", 61.5, 1680, 8.7, 4.1),
    r("Option 2 - Hard, no hike-a-bike", "6:06", 77.3, 2190, 16.9, 5.4),
    r("Option 3, no hike-a-bike", "5:40", 77.9, 1890, 11.6, 5.0),
    r("Option 3 - Hard, no hike-a-bike", "7:08", 93.7, 2400, 17.9, 6.3),
    r("Option 4, no hike-a-bike", "4:57", 72.4, 1560, 7.6, 4.3),
    r("Option 5, no hike-a-bike", "5:02", 66.8, 1590, 18.3, 4.4),
    r("Option 6, no hike-a-bike", "5:35", 83.4, 1700, 8.1, 4.9),
  ] },
  2: { day: 2, def: r("Default", "4h", 50, 1000, 45.2, 3.6), alts: [
    r("Option 2 - Ait Mansour Gorge, sticking to road", "3:16", 50.1, 1000, 6.4, 2.9),
    r("Option 2 - Ait Mansour Gorge", "3:41", 52.7, 1020, 19.5, 3.2),
  ] },
  3: { day: 3, def: r("Default", "11.5h", 140, 2500, 61.1, 9.9), alts: [
    r("Default - no colonial road", "10:05", 150, 2760, 19.7, 8.8),
    r("Option 2", "10:14", 135, 2240, 49.3, 8.8),
    r("Option 2 - no colonial road", "8:51", 143, 2490, 6.3, 7.7),
    r("Option 3 - Desert Peloton, via Tata", "9:46", 160, 1410, 27.8, 8.0),
  ] },
  4: { day: 4, def: r("Default", "8.5h", 120, 1400, 41.8, 6.9), alts: [
    r("Option 2, no Ibn Yacoub", "8:32", 118, 1480, 50.1, 7.2),
    r("Option 3, mostly road", "10:06", 151, 1560, 38.9, 8.4),
    r("Option 4, sticking to road", "9:46", 155, 1530, 30.3, 8.1),
  ] },
  5: { day: 5, def: r("Default", "5.5h", 80, 1000, 31.2, 4.4), alts: [
    r("Hard", "7:37", 97.2, 1250, 64, 6.4),
  ] },
};

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

function fmtTime(t: string) {
  const m = /^(\d+):(\d{2})$/.exec(t);
  return m ? `${Number(m[1])}h ${m[2]}m` : t;
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[9px] uppercase tracking-widest text-white/40">{label}</dt>
      <dd className="text-[13px] text-white tabular-nums whitespace-nowrap">
        {value}{unit && <span className="text-white/45 text-[10px]"> {unit}</span>}
      </dd>
    </div>
  );
}

function RowCard({ row, isDefault }: { row: Row; isDefault?: boolean }) {
  return (
    <li
      className={[
        "rounded-md border px-3 py-2.5",
        isDefault ? "border-accent/70 bg-accent/10" : "border-white/10 bg-white/[0.03]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-[13px] font-bold text-[#f5f1e9] leading-snug" style={nunito}>{row.name}</p>
        <span
          className={[
            "shrink-0 text-[9px] uppercase tracking-widest rounded px-1.5 py-0.5",
            isDefault ? "bg-accent text-background" : "border border-white/15 text-white/55",
          ].join(" ")}
          style={rubikOne}
        >
          {isDefault ? "Default · Organiser" : "Alternative · Est."}
        </span>
      </div>
      <dl className="grid grid-cols-3 sm:grid-cols-5 gap-x-3 gap-y-2" style={nunito}>
        <Stat label="Time" value={fmtTime(row.time)} />
        <Stat label="Distance" value={String(row.km)} unit="km" />
        <Stat label="Ascent" value={row.ascent.toLocaleString("en-GB")} unit="m" />
        <Stat label="Unpaved" value={row.unpaved.toFixed(1)} unit="%" />
        <Stat label="Workload" value={row.score.toFixed(1)} unit="/10" />
      </dl>
    </li>
  );
}

export function RouteAlternativesDialog({ day, onClose }: { day: number | null; onClose: () => void }) {
  const data = day != null ? ROUTE_ALTERNATIVES[day] : undefined;
  return (
    <DialogPrimitive.Root open={!!data} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="fixed z-[101] flex flex-col bg-[#1d1f1c] border border-white/15 text-foreground shadow-2xl
            inset-x-0 bottom-0 max-h-[88dvh] rounded-t-xl
            md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[min(640px,calc(100vw-48px))] md:max-h-[84dvh] md:rounded-xl
            data-[state=open]:animate-in data-[state=open]:fade-in-0"
        >
          {data && (
            <>
              <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3 border-b border-white/10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-1" style={rubikOne}>Day {data.day} · Route options</p>
                  <DialogPrimitive.Title className="text-base text-white leading-tight" style={rubikOne}>
                    Compare D{data.day} alternatives
                  </DialogPrimitive.Title>
                </div>
                <DialogPrimitive.Close
                  className="shrink-0 rounded border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/70 hover:text-white hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  style={rubikOne}
                >
                  Close
                </DialogPrimitive.Close>
              </div>
              <div className="overflow-y-auto overscroll-contain px-5 py-4">
                <DialogPrimitive.Description className="text-xs text-foreground/60 leading-relaxed mb-3" style={nunito}>
                  For comparison only — the official itinerary stays the Default. Default figures are the organiser's published stats; alternatives are estimated Komoot figures. Workload score is not a technical grade and excludes weather, luggage, fatigue and stops.
                </DialogPrimitive.Description>
                <ul className="space-y-2">
                  <RowCard row={data.def} isDefault />
                  {data.alts.map((a) => <RowCard key={a.name} row={a} />)}
                </ul>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
