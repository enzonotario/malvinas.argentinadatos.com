import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const svgPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "islasmalvinas.svg");
const svg = readFileSync(svgPath, "utf-8");

export const malvinasMapDataUrl =
  "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

const OG_MAP_FILL = "#f0c419";
const OG_MAP_STROKE = "#c9a010";

function svgWithYellowFillForOg(source: string): string {
  return source
    .replace(/fill="#fff"/gi, `fill="${OG_MAP_FILL}"`)
    .replace(/fill="#ffffff"/gi, `fill="${OG_MAP_FILL}"`)
    .replace(/stroke="#fff"/gi, `stroke="${OG_MAP_STROKE}"`)
    .replace(/stroke="#ffffff"/gi, `stroke="${OG_MAP_STROKE}"`);
}

export const malvinasMapDataUrlOg =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(svgWithYellowFillForOg(svg));
