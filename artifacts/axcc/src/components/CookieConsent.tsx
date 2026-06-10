import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analytics } from "@/lib/analytics";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = analytics.hasConsent();
    if (consent === null) setShow(true);
  }, []);

  function accept() {
    analytics.setConsent(true);
    setShow(false);
  }

  function decline() {
    analytics.setConsent(false);
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="consent"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[300] bg-black/95 backdrop-blur-sm border-t border-white/10 px-5 py-4"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs text-white/60 flex-1 leading-relaxed">
              We use anonymous cookies to understand how visitors explore this
              site. No personal data is stored or shared.{" "}
              <a
                href="https://gdpr.eu/cookies/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-white/40 hover:text-white/60 transition-colors"
              >
                Learn more
              </a>
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={decline}
                className="text-xs text-white/40 hover:text-white/70 transition-colors px-4 py-2 border border-white/15 rounded-lg"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="text-xs text-white px-4 py-2 rounded-lg transition-colors font-medium"
                style={{ background: "hsl(68 57% 38%)" }}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
