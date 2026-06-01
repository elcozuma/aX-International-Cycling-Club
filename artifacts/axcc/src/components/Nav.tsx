import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const avenir = { fontFamily: "'Avenir Next', 'Avenir', 'Century Gothic', sans-serif" };
const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

export function Nav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [clubRidesModal, setClubRidesModal] = useState(false);
  const [customExpModal, setCustomExpModal] = useState(false);

  const topItems = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
  ];
  const bottomItems = [
    { name: "faqs", path: "/faq" },
  ];

  const spanClass = (isActive: boolean) => [
    "flex items-center justify-between px-5 py-3 text-xs uppercase tracking-widest cursor-pointer select-none transition-colors",
    isActive ? "text-accent bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
  ].join(" ");

  function closeAll() {
    setOpen(false);
    setEventsOpen(false);
  }

  const eventsActive = location === "/morocco" || location === "/events";

  return (
    <>
      {/* Hamburger toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle navigation"
        data-testid="nav-toggle"
        className="fixed top-5 right-6 z-[100] flex flex-col gap-[7px] cursor-pointer bg-transparent border-none p-2"
      >
        <motion.span animate={open ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-9 h-[2px] bg-white origin-center" />
        <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} className="block w-9 h-[2px] bg-white" />
        <motion.span animate={open ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-9 h-[2px] bg-white origin-center" />
      </button>

      {/* Main dropdown */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[90]" onClick={closeAll} />

            <motion.nav
              key="menu"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed top-14 right-6 z-[100] w-52 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden"
            >
              {topItems.map((item, i) => {
                const isActive = location === item.path;
                return (
                  <motion.div key={item.path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-white/10">
                    <Link href={item.path}>
                      <span onClick={closeAll} data-testid={`nav-${item.name}`} style={avenir} className={spanClass(isActive)}>
                        {item.name}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Events — sub-dropdown */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: topItems.length * 0.04 }} className="border-b border-white/10">
                <button
                  data-testid="nav-events"
                  style={avenir}
                  onClick={() => setEventsOpen((o) => !o)}
                  className={[
                    "w-full flex items-center justify-between px-5 py-3 text-xs uppercase tracking-widest cursor-pointer select-none transition-colors",
                    eventsActive ? "text-accent bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
                  ].join(" ")}
                >
                  <span>events</span>
                  <motion.span animate={{ rotate: eventsOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-base leading-none">+</motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {eventsOpen && (
                    <motion.div
                      key="events-sub"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-white/5"
                    >
                      <Link href="/morocco">
                        <span onClick={closeAll} style={avenir} className="flex pl-7 pr-4 py-2.5 text-[10px] uppercase tracking-wider text-white/60 hover:text-white cursor-pointer transition-colors border-b border-white/5 leading-snug">
                          Southern Morocco · Mar 2027
                        </span>
                      </Link>
                      <button onClick={() => { setClubRidesModal(true); closeAll(); }} style={avenir} className="w-full text-left pl-7 pr-4 py-2.5 text-[10px] uppercase tracking-wider text-white/60 hover:text-white cursor-pointer transition-colors border-b border-white/5">
                        Club Rides / Free Events
                      </button>
                      <button onClick={() => { setCustomExpModal(true); closeAll(); }} style={avenir} className="w-full text-left pl-7 pr-4 py-2.5 text-[10px] uppercase tracking-wider text-white/60 hover:text-white cursor-pointer transition-colors">
                        Custom Expeditions
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {bottomItems.map((item, i) => {
                const isActive = location === item.path;
                return (
                  <motion.div key={item.path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (topItems.length + 1 + i) * 0.04 }} className="border-b border-white/10">
                    <Link href={item.path}>
                      <span onClick={closeAll} data-testid={`nav-${item.name}`} style={avenir} className={spanClass(isActive)}>
                        {item.name}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Contact */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (topItems.length + 1 + bottomItems.length) * 0.04 }}>
                <a href="mailto:email@a-xcc.com" onClick={closeAll} data-testid="nav-contact" style={avenir} className={spanClass(false)}>
                  contact
                </a>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Club Rides Modal */}
      <AnimatePresence>
        {clubRidesModal && (
          <>
            <motion.div key="cr-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm" onClick={() => setClubRidesModal(false)} />
            <motion.div key="cr-modal" initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[201] flex items-center justify-center p-6 pointer-events-none">
              <div className="bg-black/92 border border-white/15 rounded-2xl p-8 max-w-md w-full relative pointer-events-auto">
                <button onClick={() => setClubRidesModal(false)} className="absolute top-4 right-5 text-white/40 hover:text-white text-lg transition-colors leading-none">✕</button>
                <h2 className="text-base text-accent mb-1" style={rubikOne}>CLUB RIDES & FREE EVENTS</h2>
                <p className="text-xs uppercase tracking-widest text-white/30 mb-5" style={rubikOne}>Open to all · No cost</p>
                <p className="text-sm text-foreground/75 leading-relaxed mb-3" style={nunito}>
                  a-X club rides will soon be announced, based in <span className="text-foreground/90">Leeds, UK</span> and <span className="text-foreground/90">Málaga, Spain</span>. All rides are open to the public and free to attend.
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed" style={nunito}>
                  Rides range from social gravel spins to longer day rides and overnighters. No experience required beyond being comfortable on a bike for a few hours.
                </p>
                <a href="https://www.strava.com/clubs/a-xcc" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-xs uppercase tracking-widest text-accent/70 hover:text-accent transition-colors underline underline-offset-4" style={rubikOne}>
                  Check Strava for updates →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Expeditions Modal */}
      <AnimatePresence>
        {customExpModal && (
          <>
            <motion.div key="ce-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm" onClick={() => setCustomExpModal(false)} />
            <motion.div key="ce-modal" initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[201] flex items-center justify-center p-6 pointer-events-none">
              <div className="bg-black/92 border border-white/15 rounded-2xl p-8 max-w-md w-full relative pointer-events-auto">
                <button onClick={() => setCustomExpModal(false)} className="absolute top-4 right-5 text-white/40 hover:text-white text-lg transition-colors leading-none">✕</button>
                <h2 className="text-base text-accent mb-1" style={rubikOne}>CUSTOM EXPEDITIONS</h2>
                <p className="text-xs uppercase tracking-widest text-white/30 mb-5" style={rubikOne}>For clubs & riding groups</p>
                <p className="text-sm text-foreground/75 leading-relaxed mb-3" style={nunito}>
                  a-X works with other cycling clubs and riding groups to create bespoke expeditions in a destination of their choosing. The level of support is entirely flexible — from minimal coordination through to a fully supported, end-to-end experience.
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed mb-3" style={nunito}>
                  Because a-X doesn't operate as a traditional tour company, custom expeditions are typically available at a fraction of the cost of comparable commercial offerings.
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed" style={nunito}>
                  If you have a group in mind and a destination you've been dreaming about, get in touch to talk through the options.
                </p>
                <a href="mailto:email@a-xcc.com" className="inline-block mt-6 text-xs uppercase tracking-widest text-accent/70 hover:text-accent transition-colors underline underline-offset-4" style={rubikOne}>
                  Get in touch →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
