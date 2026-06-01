import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { LANGUAGES } from "@/i18n/translations";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };

function FlagImg({ countryCode, size }: { countryCode: string; size: number }) {
  const h = Math.round(size * (2 / 3));
  return (
    <img
      src={`https://flagcdn.com/${countryCode}.svg`}
      alt={countryCode}
      width={size}
      height={h}
      className="rounded-sm object-cover flex-shrink-0"
      style={{ width: size, height: h, display: "block" }}
    />
  );
}

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === lang)!;

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Change language"
        className="flex flex-col items-center justify-center gap-1 cursor-pointer bg-transparent border-none p-2 group"
        style={{ width: "52px" }}
      >
        <FlagImg countryCode={current.countryCode} size={40} />
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="block text-white/40 group-hover:text-white/70 transition-colors leading-none"
          style={{ fontSize: "9px" }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 z-[110] bg-black/85 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden w-44"
          >
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={[
                  "w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-colors cursor-pointer",
                  lang === l.code
                    ? "text-accent bg-white/5"
                    : "text-white/65 hover:text-white hover:bg-white/5"
                ].join(" ")}
                style={rubikOne}
              >
                <FlagImg countryCode={l.countryCode} size={28} />
                <span className="uppercase tracking-widest">{l.nativeLabel}</span>
                {lang === l.code && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
