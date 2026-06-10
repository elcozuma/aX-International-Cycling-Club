import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { analytics } from "@/lib/analytics";

export function AnalyticsProvider() {
  const [location] = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      analytics.init();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      analytics.trackPage(location);
    }, 120);
    return () => clearTimeout(timer);
  }, [location]);

  return null;
}
