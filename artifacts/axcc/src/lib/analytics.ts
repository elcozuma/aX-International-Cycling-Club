const CONSENT_KEY = "ax_consent";
const SESSION_KEY = "ax_session";
const VISITOR_KEY = "ax_visitor";
const API_BASE = "/api/analytics";

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function fingerprint(): string {
  const str = [
    screen.width,
    screen.height,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency ?? 0,
  ].join("|");
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) & 0x7fffffff;
  }
  return h.toString(36);
}

function detectDevice(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR|Opera/i.test(ua)) return "Opera";
  if (/Chrome/i.test(ua) && !/Chromium/i.test(ua)) return "Chrome";
  if (/Chromium/i.test(ua)) return "Chromium";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
  return "Other";
}

function detectOS(): string {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "Windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macOS";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
}

function detectReferrerSource(ref: string): string {
  if (!ref) return "direct";
  const url = ref.toLowerCase();
  if (/google\.com/.test(url)) return "google";
  if (/bing\.com/.test(url)) return "bing";
  if (/linkedin\.com/.test(url)) return "linkedin";
  if (/facebook\.com|fb\.com/.test(url)) return "facebook";
  if (/twitter\.com|x\.com/.test(url)) return "x";
  if (/instagram\.com/.test(url)) return "instagram";
  if (/strava\.com/.test(url)) return "strava";
  if (/substack\.com/.test(url)) return "substack";
  if (/whatsapp\.com/.test(url)) return "whatsapp";
  return "other";
}

async function post(path: string, data: Record<string, unknown>): Promise<void> {
  try {
    await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      keepalive: true,
    });
  } catch {
    // Never block the user
  }
}

class Analytics {
  private sessionId: string | null = null;
  private visitorHash: string | null = null;
  private consentGiven = false;
  private currentPage = "";
  private pageStartTime = 0;
  private sessionStarted = false;
  private listenersAttached = false;
  private scrollFired = new Set<number>();

  init(): void {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(CONSENT_KEY);
    this.consentGiven = stored === "true";
    if (this.consentGiven) this.startSession();
  }

  setConsent(given: boolean): void {
    this.consentGiven = given;
    localStorage.setItem(CONSENT_KEY, given ? "true" : "false");
    if (given && !this.sessionStarted) this.startSession();
  }

  hasConsent(): boolean | null {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === null) return null;
    return stored === "true";
  }

  trackPage(page: string): void {
    if (!this.consentGiven || !this.sessionId) return;
    this.currentPage = page;
    this.pageStartTime = Date.now();
    this.scrollFired.clear();
    post(`${API_BASE}/pageview`, { sessionId: this.sessionId, page });
  }

  trackEvent(
    eventType: string,
    eventLabel: string,
    metadata?: Record<string, unknown>,
    coords?: { x: number; y: number },
  ): void {
    if (!this.consentGiven || !this.sessionId) return;
    post(`${API_BASE}/event`, {
      sessionId: this.sessionId,
      eventType,
      eventLabel: eventLabel.slice(0, 200),
      page: this.currentPage || window.location.pathname,
      xPercent: coords ? (coords.x / window.innerWidth) * 100 : null,
      yPercent: coords ? (coords.y / window.innerHeight) * 100 : null,
      metadata: metadata ?? null,
    });
  }

  private startSession(): void {
    if (this.sessionStarted) return;
    this.sessionStarted = true;

    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = generateId();
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    this.sessionId = sid;

    let vh = localStorage.getItem(VISITOR_KEY);
    if (!vh) {
      vh = fingerprint();
      localStorage.setItem(VISITOR_KEY, vh);
    }
    this.visitorHash = vh;

    post(`${API_BASE}/session`, {
      sessionId: this.sessionId,
      visitorHash: this.visitorHash,
      device: detectDevice(),
      browser: detectBrowser(),
      os: detectOS(),
      referrer: document.referrer || "",
      referrerSource: detectReferrerSource(document.referrer),
      landingPage: window.location.pathname,
      consentGiven: true,
    });

    if (!this.listenersAttached) {
      this.listenersAttached = true;
      this.attachScrollListener();
      this.attachClickListener();
      window.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") this.sendEndSession();
      });
      window.addEventListener("pagehide", () => this.sendEndSession(), {
        passive: true,
      });
    }
  }

  private sendEndSession(): void {
    if (!this.sessionId) return;
    const duration = this.pageStartTime
      ? Math.round((Date.now() - this.pageStartTime) / 1000)
      : 0;
    const data = JSON.stringify({
      sessionId: this.sessionId,
      exitPage: this.currentPage,
      durationSeconds: duration,
    });
    navigator.sendBeacon(
      `${API_BASE}/session/end`,
      new Blob([data], { type: "application/json" }),
    );
  }

  private attachScrollListener(): void {
    const thresholds = [25, 50, 75, 90, 100];
    window.addEventListener(
      "scroll",
      () => {
        if (!this.consentGiven || !this.sessionId) return;
        const docH =
          document.documentElement.scrollHeight - window.innerHeight;
        if (docH <= 0) return;
        const depth = Math.min(
          100,
          Math.round((window.scrollY / docH) * 100),
        );
        for (const t of thresholds) {
          if (depth >= t && !this.scrollFired.has(t)) {
            this.scrollFired.add(t);
            post(`${API_BASE}/event`, {
              sessionId: this.sessionId,
              eventType: "scroll",
              eventLabel: `${t}%`,
              page: this.currentPage || window.location.pathname,
              scrollDepth: t,
            });
          }
        }
      },
      { passive: true },
    );
  }

  private attachClickListener(): void {
    document.addEventListener(
      "click",
      (e) => {
        if (!this.consentGiven || !this.sessionId) return;
        const target = e.target as HTMLElement;
        const el = target.closest(
          "a, button, [data-track]",
        ) as HTMLElement | null;
        if (!el) return;

        const rawLabel =
          el.getAttribute("data-track") ||
          el.getAttribute("aria-label") ||
          el.textContent?.slice(0, 80)?.trim() ||
          "unknown";

        let eventType = "click";
        if (el.tagName === "A") {
          const href = (el as HTMLAnchorElement).href || "";
          if (href.startsWith("mailto:")) eventType = "email_click";
          else if (href.startsWith("tel:")) eventType = "phone_click";
          else if (/wa\.me|whatsapp/i.test(href)) eventType = "whatsapp_click";
          else if (href && !href.includes(window.location.hostname))
            eventType = "external_link";
        }

        post(`${API_BASE}/event`, {
          sessionId: this.sessionId,
          eventType,
          eventLabel: rawLabel.slice(0, 200),
          page: this.currentPage || window.location.pathname,
          xPercent: (e.clientX / window.innerWidth) * 100,
          yPercent: (e.clientY / window.innerHeight) * 100,
        });
      },
      { passive: true },
    );
  }
}

export const analytics = new Analytics();
