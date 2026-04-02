import type { BannerDefinition, BannerId } from "./types.js";
import { HeaderBanner } from "./components/HeaderBanner.js";
import { OgBanner } from "./components/OgBanner.js";
import { SquareBanner } from "./components/SquareBanner.js";
import { StripBanner } from "./components/StripBanner.js";

export type { BannerDefinition, BannerId } from "./types.js";

export const DEFAULT_BANNER_ID: BannerId = "strip";

const definitions: Record<BannerId, BannerDefinition> = {
  strip: {
    id: "strip",
    width: 800,
    height: 130,
    purpose: "Compact horizontal strip for README and site footers (800×130)",
    Component: StripBanner,
  },
  og: {
    id: "og",
    width: 1200,
    height: 630,
    purpose: "Open Graph / link previews (1200×630)",
    Component: OgBanner,
  },
  square: {
    id: "square",
    width: 1080,
    height: 1080,
    purpose: "Square social feed (1080×1080)",
    Component: SquareBanner,
  },
  header: {
    id: "header",
    width: 1500,
    height: 500,
    purpose: "Wide profile header, X/Twitter-style (1500×500)",
    Component: HeaderBanner,
  },
};

export function listBannerDefinitions(): BannerDefinition[] {
  return Object.values(definitions);
}

export function getBannerDefinition(id: BannerId): BannerDefinition {
  return definitions[id];
}

export function isBannerId(value: string): value is BannerId {
  return value in definitions;
}

export function parseBannerId(value: string): BannerId {
  if (isBannerId(value)) return value;
  throw new Error(
    `Unknown banner id "${value}". Valid: ${Object.keys(definitions).join(", ")}`,
  );
}
