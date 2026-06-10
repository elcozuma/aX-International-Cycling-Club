interface GeoResult {
  country: string;
  city: string;
}

const cache = new Map<string, { result: GeoResult; expiresAt: number }>();
const TTL = 24 * 60 * 60 * 1000;

const PRIVATE_PREFIXES = [
  "127.",
  "::1",
  "192.168.",
  "10.",
  "172.16.",
  "172.17.",
  "172.18.",
  "172.19.",
  "172.2",
  "172.3",
  "fc",
  "fd",
];

function isPrivate(ip: string): boolean {
  return PRIVATE_PREFIXES.some((p) => ip.startsWith(p));
}

export async function geolocate(ip: string): Promise<GeoResult> {
  if (!ip || isPrivate(ip)) return { country: "Local", city: "Local" };

  const prefix = ip.replace(/\.\d+$/, ".0");
  const cached = cache.get(prefix);
  if (cached && cached.expiresAt > Date.now()) return cached.result;

  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,city`,
      { signal: AbortSignal.timeout(3000) },
    );
    if (!res.ok) return { country: "", city: "" };
    const data = (await res.json()) as {
      status: string;
      country?: string;
      city?: string;
    };
    if (data.status === "success") {
      const result: GeoResult = {
        country: data.country ?? "",
        city: data.city ?? "",
      };
      cache.set(prefix, { result, expiresAt: Date.now() + TTL });
      return result;
    }
  } catch {
    // ip-api unavailable — fail silently
  }
  return { country: "", city: "" };
}
