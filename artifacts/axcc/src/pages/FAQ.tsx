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

export default function FAQ() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans"
      style={{ backgroundImage: "url('/page-bg-v2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col md:flex-row">

          {/* Left column — questions list */}
          <div className="w-full md:w-2/5 h-full flex flex-col overflow-y-auto border-b md:border-b-0 md:border-r border-white/10 px-6 md:px-8 py-8">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={rubikOne}
              className="text-base md:text-lg normal-case text-accent leading-tight mb-6"
            >
              QUESTIONS & ANSWERS
            </motion.h1>

            <div className="flex flex-col gap-1">
              {faqs.map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => setSelected(selected === i ? null : i)}
                  className={[
                    "text-left px-4 py-3 rounded-lg text-sm md:text-base transition-all",
                    selected === i
                      ? "bg-white/15 text-foreground"
                      : "text-foreground/60 hover:text-foreground/90 hover:bg-white/8"
                  ].join(" ")}
                  style={nunito}
                >
                  {item.q}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right column — answer panel */}
          <div className="flex-1 flex items-center justify-center px-8 md:px-12 py-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              {selected !== null ? (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-md"
                >
                  <p
                    className="text-sm md:text-base font-semibold text-accent mb-4 leading-snug"
                    style={rubikOne}
                  >
                    {faqs[selected].q}
                  </p>
                  <p
                    className="text-sm md:text-base text-foreground/80 leading-relaxed"
                    style={nunito}
                  >
                    {faqs[selected].a}
                  </p>
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

        </div>
      </div>
    </div>
  );
}
