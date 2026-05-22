import { useState } from "react";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

const faqs = [
  {
    q: "What is a-X?",
    a: "a-X (Across) is an international cycling club built around adventure touring and multi-day group rides. We bridge the gap between club ride culture and point-to-point adventure cycling."
  },
  {
    q: "Who can join?",
    a: "Any capable rider who values experience over luxury and exploration over a fixed itinerary. Our routes are designed for riders who are self-sufficient and comfortable with long days in the saddle."
  },
  {
    q: "What kind of rides do you organise?",
    a: "We curate small-group multi-day rides — typically 3 to 7 days — on mixed terrain. Routes are planned around challenge, autonomy, and shared experience rather than speed or competition."
  },
  {
    q: "How do I sign up for an event?",
    a: "Check the Events page for upcoming rides and contact us through the Contact page to express your interest. Spots are limited to keep groups small."
  },
  {
    q: "What bike do I need?",
    a: "Most of our routes suit gravel or adventure bikes. Road bikes may work on some routes. Specific kit requirements are shared with each event listing."
  },
  {
    q: "Are the rides supported?",
    a: "Rides are semi-supported. We plan routes with resupply points and share logistics in advance, but riders are expected to be largely self-reliant day to day."
  },
  {
    q: "How do I follow along or stay in touch?",
    a: "Follow us on Strava at strava.com/clubs/a-xcc or reach out via the Contact page. We share route notes, ride reports, and club news there."
  }
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="border-b border-white/15 last:border-b-0"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-center justify-between gap-4 py-3 md:py-4 group"
        style={nunito}
      >
        <span className="text-sm md:text-base font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-accent text-xl flex-shrink-0 leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm text-foreground/75 pb-3 md:pb-4 leading-relaxed" style={nunito}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans"
      style={{ backgroundImage: "url('/page-bg-v2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="absolute inset-0 overflow-y-auto px-8 md:px-12">
            <div className="min-h-full flex flex-col justify-center py-8">

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={rubikOne}
                className="text-base md:text-lg normal-case text-accent leading-tight mb-6"
              >
                QUESTIONS & ANSWERS
              </motion.h1>

              <div className="max-w-2xl">
                {faqs.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} index={i} />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
