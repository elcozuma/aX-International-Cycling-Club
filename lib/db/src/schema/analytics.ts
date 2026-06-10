import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  real,
  varchar,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const visitorSessions = pgTable(
  "visitor_sessions",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    visitorHash: varchar("visitor_hash", { length: 64 }),
    isReturning: boolean("is_returning").default(false),
    startedAt: timestamp("started_at").defaultNow().notNull(),
    endedAt: timestamp("ended_at"),
    durationSeconds: integer("duration_seconds"),
    landingPage: text("landing_page"),
    exitPage: text("exit_page"),
    device: varchar("device", { length: 20 }),
    browser: varchar("browser", { length: 50 }),
    os: varchar("os", { length: 50 }),
    country: varchar("country", { length: 100 }),
    city: varchar("city", { length: 100 }),
    referrer: text("referrer"),
    referrerSource: varchar("referrer_source", { length: 50 }),
    ipHash: varchar("ip_hash", { length: 64 }),
    consentGiven: boolean("consent_given").default(false),
  },
  (t) => [
    index("vs_started_at_idx").on(t.startedAt),
    index("vs_visitor_hash_idx").on(t.visitorHash),
  ],
);

export const pageViews = pgTable(
  "page_views",
  {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 36 }).notNull(),
    page: text("page").notNull(),
    viewedAt: timestamp("viewed_at").defaultNow().notNull(),
    durationSeconds: integer("duration_seconds"),
  },
  (t) => [
    index("pv_session_id_idx").on(t.sessionId),
    index("pv_viewed_at_idx").on(t.viewedAt),
    index("pv_page_idx").on(t.page),
  ],
);

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    sessionId: varchar("session_id", { length: 36 }).notNull(),
    eventType: varchar("event_type", { length: 50 }).notNull(),
    eventLabel: text("event_label"),
    page: text("page").notNull(),
    xPercent: real("x_percent"),
    yPercent: real("y_percent"),
    scrollDepth: real("scroll_depth"),
    metadata: jsonb("metadata"),
    occurredAt: timestamp("occurred_at").defaultNow().notNull(),
  },
  (t) => [
    index("ae_session_id_idx").on(t.sessionId),
    index("ae_event_type_idx").on(t.eventType),
    index("ae_page_idx").on(t.page),
    index("ae_occurred_at_idx").on(t.occurredAt),
  ],
);

export type VisitorSession = typeof visitorSessions.$inferSelect;
export type PageView = typeof pageViews.$inferSelect;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
