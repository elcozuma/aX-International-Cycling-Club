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
    { name: "contact", path: "/contact" }
  ];

  const avenir = { fontFamily: "'Avenir Next', 'Avenir', 'Century Gothic', sans-serif" };

  return (
    <>
      {/* Logo — top left */}
      <Link href="/">
        <img
          src="/ax-logo.png"
          alt="a-X"
          className="fixed top-4 left-5 z-[100] h-8 md:h-9 w-auto opacity-90 hover:opacity-100 transition-opacity cursor-pointer select-none"
        />
      </Link>

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

            {/* Menu */}
            <motion.nav
              key="menu"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="fixed top-14 right-6 z-[100] flex flex-col items-end gap-1 min-w-[140px]"
            >
              {navItems.map((item, i) => {
                const isActive = location === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={item.path}>
                      <span
                        onClick={() => setOpen(false)}
                        data-testid={`nav-${item.name}`}
                        style={avenir}
                        className={[
                          "block px-5 py-2 rounded-full text-sm cursor-pointer select-none border transition-colors",
                          isActive
                            ? "bg-accent border-accent text-accent-foreground"
                            : "bg-black/40 backdrop-blur-sm border-white/20 text-white hover:border-white/50"
                        ].join(" ")}
                      >
                        {item.name}
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
