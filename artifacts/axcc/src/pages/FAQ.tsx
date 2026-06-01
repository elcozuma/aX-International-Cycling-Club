import { useState } from "react";
import { Link } from "wouter";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { getFaqItems } from "@/i18n/content";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

type SelectionKey = number | null;

export default function FAQ() {
  const [selected, setSelected] = useState<SelectionKey>(null);
  const [mobileSelected, setMobileSelected] = useState<SelectionKey>(null);
  const { t, lang } = useLang();
  const generalFaqs = getFaqItems(lang);

  const selectedItem = selected !== null ? generalFaqs[selected] : null;

  function toggle(ii: number) {
    setSelected(prev => prev === ii ? null : ii);
  }

  function toggleMobile(ii: number) {
    setMobileSelected(prev => prev === ii ? null : ii);
  }

  return (
    <div className="relative md:h-[100dvh] md:overflow-hidden text-foreground font-sans bg-black">
      <div className="hidden md:block absolute inset-0 z-0" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}page-bg-v2.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <Nav />

      <div className="relative md:absolute z-10 mx-6 md:mx-0 md:inset-10 mt-[68px] md:mt-0 mb-6 md:mb-0">
        <div className="relative w-full md:h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col md:flex-row">

          <img src={import.meta.env.BASE_URL + "ax-logo.png"} alt="a-X" className="hidden lg:block absolute lg:-bottom-2 lg:right-5 z-0 h-24 w-auto opacity-75 pointer-events-none select-none [@media(max-height:600px)]:!hidden" />

          {/* ── MOBILE ACCORDION ── */}
          <div className="relative z-[1] md:hidden px-5 pt-6 pb-24 flex flex-col gap-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={rubikOne}
              className="text-base normal-case text-accent leading-tight mb-2"
            >
              {t("faq.title")}
            </motion.h1>

            <div className="flex flex-col gap-0.5">
              {generalFaqs.map((item, ii) => {
                const isOpen = mobileSelected === ii;
                return (
                  <div key={ii} className="rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleMobile(ii)}
                      className={[
                        "w-full text-left px-3 py-2.5 text-xs leading-snug transition-colors flex items-start justify-between gap-2",
                        isOpen ? "text-accent" : "text-foreground/55"
                      ].join(" ")}
                      style={nunito}
                    >
                      <span>{item.q}</span>
                      <span className="flex-shrink-0 text-foreground/30 mt-0.5">{isOpen ? "−" : "›"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 pt-0.5 border-l-2 border-accent/30 ml-3 mb-1">
                            {Array.isArray(item.a) ? (
                              <div className="flex flex-col gap-2">
                                {item.a.map((para, i) => (
                                  <p key={i} className="text-xs text-foreground/75 leading-relaxed" style={nunito}>{para}</p>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-foreground/75 leading-relaxed" style={nunito}>{item.a}</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 text-xs text-foreground/35 leading-relaxed" style={nunito}>
              <p>
                {t("faq.footer.unanswered")}{" "}
                <a href="mailto:email@a-xcc.com" className="underline underline-offset-2 cursor-pointer">{t("faq.footer.sendMessage")}</a>
              </p>
              <p className="mt-1">
                {t("faq.footer.eventSpecific")}{" "}
                <Link href="/morocco">
                  <span className="underline underline-offset-2 cursor-pointer">{t("faq.footer.eventPage")}</span>
                </Link>
              </p>
            </div>

          </div>

          {/* ── DESKTOP LAYOUT ── */}
          <div className="relative z-[1] hidden md:flex flex-col w-full md:w-2/5 h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
            <div className="px-6 md:px-8 pt-8 pb-3 flex-shrink-0">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={rubikOne}
                className="text-base md:text-lg normal-case text-accent leading-tight"
              >
                {t("faq.title")}
              </motion.h1>
            </div>

            <p className="text-xs uppercase tracking-widest text-foreground/35 px-6 md:px-8 pt-1 pb-2 flex-shrink-0" style={rubikOne}>
              {t("faq.general")}
            </p>

            <div className="relative flex-1 min-h-0">
              <div className="h-full overflow-y-scroll faq-scroll px-4 md:px-6 pb-4">
                <div className="flex flex-col gap-0.5">
                  {generalFaqs.map((item, ii) => {
                    const isActive = selected === ii;
                    return (
                      <button
                        key={ii}
                        onClick={() => toggle(ii)}
                        className={[
                          "text-left px-3 py-2 rounded-lg text-xs md:text-sm transition-all leading-snug",
                          isActive ? "bg-white/15 text-foreground" : "text-foreground/55 hover:text-foreground/85 hover:bg-white/8"
                        ].join(" ")}
                        style={nunito}
                      >
                        {item.q}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/70 to-transparent rounded-b-sm" />
            </div>
          </div>

          {/* Right column — answer panel */}
          <div className="relative z-[1] hidden md:flex flex-1 flex-col px-8 md:px-14 pt-10 pb-6 overflow-y-auto">
            <div className="flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {selectedItem ? (
                  <motion.div
                    key={selected!}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-md w-full"
                  >
                    <p className="text-sm md:text-base font-semibold text-accent mb-4 leading-snug" style={nunito}>
                      {selectedItem.q}
                    </p>
                    {Array.isArray(selectedItem.a) ? (
                      <div className="flex flex-col gap-3">
                        {selectedItem.a.map((para, i) => (
                          <p key={i} className="text-sm md:text-base text-foreground/80 leading-relaxed" style={nunito}>{para}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed" style={nunito}>{selectedItem.a}</p>
                    )}
                  </motion.div>
                ) : (
                  <motion.p
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-foreground/30 italic"
                    style={nunito}
                  >
                    {t("faq.placeholder")}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-shrink-0 text-xs text-foreground/35 leading-relaxed pt-4 border-t border-white/10 max-w-md" style={nunito}>
              <p>
                {t("faq.footer.unanswered")}{" "}
                <a href="mailto:email@a-xcc.com" className="underline underline-offset-2 hover:text-foreground/60 transition-colors cursor-pointer">{t("faq.footer.sendMessage")}</a>
              </p>
              <p className="mt-1">
                {t("faq.footer.eventSpecific")}{" "}
                <Link href="/morocco">
                  <span className="underline underline-offset-2 hover:text-foreground/60 transition-colors cursor-pointer">{t("faq.footer.eventPage")}</span>
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
      <img
        src={import.meta.env.BASE_URL + "ax-logo.png"}
        alt="a-X"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden h-16 w-auto opacity-60 pointer-events-none select-none"
      />
    </div>
  );
}
