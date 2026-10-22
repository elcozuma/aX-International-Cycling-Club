"""Extract compact, distance-based elevation profiles from the supplied GPX files."""
import json
import math
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[3]
NS = {"g": "http://www.topografix.com/GPX/1/1"}


def distance(a, b):
    lat1, lat2 = math.radians(a[0]), math.radians(b[0])
    dlat, dlon = lat2 - lat1, math.radians(b[1] - a[1])
    h = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    return 6371.0088 * 2 * math.asin(min(1, math.sqrt(h)))


def extract(day):
    source = ROOT / f"attached_assets/Day_{day}_(Default)_1792680536582.gpx"
    tree = ET.parse(source)
    points, total = [], 0
    segments = tree.findall(".//g:trkseg", NS)
    if len(segments) != 1:
        raise ValueError(f"{source.name}: expected one continuous track segment")
    previous = None
    for point in segments[0].findall("g:trkpt", NS):
        elevation = point.find("g:ele", NS)
        if elevation is None:
            raise ValueError(f"{source.name}: missing elevation")
        location = (float(point.attrib["lat"]), float(point.attrib["lon"]))
        height = float(elevation.text)
        if not all(math.isfinite(v) for v in (*location, height)):
            raise ValueError(f"{source.name}: non-finite coordinate or elevation")
        if previous is not None:
            total += distance(previous, location)
        points.append((total, height))
        previous = location
    if len(points) < 2 or total <= 0:
        raise ValueError(f"{source.name}: empty or zero-length track")

    # Distance bins retain both peaks and valleys, plus both track endpoints.
    bins = {}
    for i, (km, height) in enumerate(points):
        bins.setdefault(min(89, int(km / total * 90)), []).append(i)
    indices = {0, len(points) - 1}
    for bucket in bins.values():
        indices.add(min(bucket, key=lambda i: points[i][1]))
        indices.add(max(bucket, key=lambda i: points[i][1]))
    samples = [[round(points[i][0], 4), round(points[i][1], 2)] for i in sorted(indices)]
    result = {
        "distance_km": round(total, 4),
        "min_m": min(p[1] for p in points),
        "max_m": max(p[1] for p in points),
        "source_points": len(points),
        "points": samples,
    }
    print(f"D{day}: {len(points)} points → {len(samples)} samples; {total:.1f} km; "
          f"{result['min_m']:.0f}–{result['max_m']:.0f} m")
    return result


if __name__ == "__main__":
    profiles = {f"day-{day}": extract(day) for day in range(1, 7)}
    output = ROOT / "artifacts/axcc/public/anti-atlas-elevation-profiles.js"
    output.write_text(
        "// Generated from the uploaded GPX tracks by scripts/build-elevation-profiles.py.\n"
        "globalThis.AXElevationProfiles="
        + json.dumps(profiles, separators=(",", ":"), allow_nan=False) + ";\n"
    )
