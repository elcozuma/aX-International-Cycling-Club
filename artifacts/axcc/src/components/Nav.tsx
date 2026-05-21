import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Nav() {
  const [location] = useLocation();

  const navItems = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "events", path: "/events" },
    { name: "contact", path: "/contact" }
  ];

  return (
    <nav className="absolute top-8 left-0 right-0 z-50 flex justify-center w-full px-6">
      <div className="flex gap-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-display tracking-widest border transition-colors cursor-pointer select-none",
                  isActive 
                    ? "bg-accent border-accent text-accent-foreground" 
                    : "bg-transparent border-foreground/30 text-foreground hover:border-foreground/60"
                )}
                data-testid={`nav-${item.name}`}
              >
                {item.name}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
