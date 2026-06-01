import { useState } from "react";
import { Link } from "wouter";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

type FaqItem = { q: string; a: string | string[] };

const generalFaqs: FaqItem[] = [
  {
    q: "What is a-X?",
    a: "a-X (Across) is a community-driven gravel and adventure cycling project focused on small-group rides, overnighters, bikepacking trips and hosted expeditions. The aim is to create memorable riding experiences that sit somewhere between fully DIY adventure riding and expensive, heavily structured cycling tours."
  },
  {
    q: "Is this a traditional cycling tour company?",
    a: "No. a-X is built around community, autonomy and shared adventure rather than luxury tourism or rigid guided-tour structures."
  },
  {
    q: "What is a hosted expedition?",
    a: "A hosted expedition is a small-group multi-day riding experience where routes, general coordination and optional logistics support may be provided while riders remain responsible for their own riding decisions, preparation and self-sufficiency."
  },
  {
    q: "What kind of riding is a-X focused on?",
    a: "Primarily gravel, adventure and mixed-surface riding. The focus is on exploration, scenery, challenge and shared experience rather than competition."
  },
  {
    q: "Are there road rides too?",
    a: "Occasionally yes — especially in destinations where the roads themselves are part of the experience — but gravel and adventure riding sit at the heart of a-X."
  },
  {
    q: "Will there be regular rides?",
    a: "Yes. Alongside hosted expeditions and bikepacking trips, a-X will organise free public gravel rides, overnighters and local social rides where possible."
  },
  {
    q: "Are rides open to anyone?",
    a: "Many public rides and local events are open to anyone. Some expeditions or limited-capacity events may require registration or payment."
  },
  {
    q: "Do I need to be an experienced cyclist?",
    a: "You do not need to be elite, but you should already be comfortable riding long distances and spending long days on the bike."
  },
  {
    q: "Can I join alone?",
    a: "Yes."
  },
  {
    q: "Is this racing?",
    a: "No. The emphasis is on exploration, challenge and shared experience rather than competition."
  },
  {
    q: "Who hosts the rides and events?",
    a: "Events are hosted by experienced endurance and adventure cyclists with first-hand knowledge of the routes and riding style involved. The aim is not to provide a luxury guided tour, but to empower participants to curate their own memorable riding experiences built around autonomy, challenge and shared adventure."
  },
  {
    q: "Are e-bikes allowed?",
    a: "No."
  },
];

type SelectionKey = number | null;

export default function FAQ() {
  const [selected, setSelected] = useState<SelectionKey>(null);
  const [mobileSelected, setMobileSelected] = useState<SelectionKey>(null);

  const selectedItem = selected !== null ? generalFaqs[selected] : null;

  function toggle(ii: number) {
    setSelected(prev => prev === ii ? null : ii);
  }

  function toggleMobile(ii: number) {
    setMobileSelected(prev => prev === ii ? null : ii);
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans bg-black">
      <div className="hidden md:block absolute inset-0 z-0" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}page-bg-v2.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col md:flex-row">

          <img src={import.meta.env.BASE_URL + "ax-logo.png"} alt="a-X" className="hidden lg:block absolute lg:-bottom-2 lg:right-5 z-0 h-24 w-auto opacity-75 pointer-events-none select-none [@media(max-height:600px)]:!hidden" />

          {/* ── MOBILE ACCORDION ── */}
          <div className="relative z-[1] md:hidden px-5 pt-6 pb-6 flex-1 overflow-y-auto flex flex-col gap-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={rubikOne}
              className="text-base normal-case text-accent leading-tight mb-2"
            >
              FAQs
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
                Have a question not answered here?{" "}
                <a href="mailto:email@a-xcc.com" className="underline underline-offset-2 cursor-pointer">Send us a message.</a>
              </p>
              <p className="mt-1">
                For event and expedition-specific FAQs, visit the{" "}
                <Link href="/morocco">
                  <span className="underline underline-offset-2 cursor-pointer">event page.</span>
                </Link>
              </p>
            </div>

            <div className="flex justify-center pt-[267px] pb-2">
              <img src={import.meta.env.BASE_URL + "ax-logo.png"} alt="a-X" className="h-20 w-auto opacity-75 pointer-events-none select-none" />
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
                FAQs
              </motion.h1>
            </div>

            <p className="text-xs uppercase tracking-widest text-foreground/35 px-6 md:px-8 pt-1 pb-2 flex-shrink-0" style={rubikOne}>
              General
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
                    Select a question to read the answer.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-shrink-0 text-xs text-foreground/35 leading-relaxed pt-4 border-t border-white/10 max-w-md" style={nunito}>
              <p>
                Have a question not answered here?{" "}
                <a href="mailto:email@a-xcc.com" className="underline underline-offset-2 hover:text-foreground/60 transition-colors cursor-pointer">Send us a message.</a>
              </p>
              <p className="mt-1">
                For event and expedition-specific FAQs, visit the{" "}
                <Link href="/morocco">
                  <span className="underline underline-offset-2 hover:text-foreground/60 transition-colors cursor-pointer">event page.</span>
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
