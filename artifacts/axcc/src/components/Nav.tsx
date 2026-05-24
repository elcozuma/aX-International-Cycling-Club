import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function Nav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "events", path: "/events" },
    { name: "faqs", path: "/faq" },
  ];

  const avenir = { fontFamily: "'Avenir Next', 'Avenir', 'Century Gothic', sans-serif" };

  return (
    <>
      {/* Toggle button — top right */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle navigation"
        data-testid="nav-toggle"
        style={avenir}
        className="fixed top-5 right-6 z-[100] flex flex-col gap-[7px] group cursor-pointer bg-transparent border-none p-2"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
          className="block w-9 h-[2px] bg-white origin-center"
        />
        <motion.span
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="block w-9 h-[2px] bg-white"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
          className="block w-9 h-[2px] bg-white origin-center"
        />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90]"
              onClick={() => setOpen(false)}
            />

            {/* Menu — single bordered panel */}
            <motion.nav
              key="menu"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed top-14 right-6 z-[100] w-44 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden"
            >
              {navItems.map((item, i) => {
                const isActive = location === item.path;
                const isLast = i === navItems.length - 1;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={!isLast ? "border-b border-white/10" : ""}
                  >
                    <Link href={item.path}>
                      <span
                        onClick={() => setOpen(false)}
                        data-testid={`nav-${item.name}`}
                        style={avenir}
                        className={[
                          "flex items-center justify-between px-5 py-3 text-xs uppercase tracking-widest cursor-pointer select-none transition-colors",
                          isActive
                            ? "text-accent bg-white/5"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        ].join(" ")}
                      >
                        {item.name}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
