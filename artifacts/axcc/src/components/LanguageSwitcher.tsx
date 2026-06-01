import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { LANGUAGES } from "@/i18n/translations";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };

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
        className="flex flex-col items-center justify-center gap-0.5 cursor-pointer bg-transparent border-none p-2 group"
        style={{ width: "52px" }}
      >
        <span className="text-xl leading-none select-none" role="img" aria-label={current.label}>
          {current.flag}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="block text-white/40 group-hover:text-white/70 transition-colors leading-none"
          style={{ fontSize: "8px" }}
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
            className="absolute top-full right-0 mt-1 z-[110] bg-black/85 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden w-40"
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
                <span className="text-base leading-none">{l.flag}</span>
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
