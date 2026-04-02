import { ImageResponse } from "takumi-js/response";
import type { ImageResponseOptions } from "takumi-js/response";
import React from "react";
import { DEFAULT_BANNER_ID, getBannerDefinition } from "./banners/registry.js";
import type { BannerId } from "./banners/types.js";

export type { BannerId, BannerDefinition } from "./banners/types.js";
export {
  DEFAULT_BANNER_ID,
  getBannerDefinition,
  isBannerId,
  listBannerDefinitions,
  parseBannerId,
} from "./banners/registry.js";
export {
  StripBanner,
  StripBanner as MalvinasBanner,
} from "./banners/components/StripBanner.js";
export { OgBanner } from "./banners/components/OgBanner.js";
export { SquareBanner } from "./banners/components/SquareBanner.js";
export { HeaderBanner } from "./banners/components/HeaderBanner.js";
export { malvinasMapDataUrl, malvinasMapDataUrlOg } from "./assets/malvinasMapDataUrl.js";

const defaultDims = getBannerDefinition(DEFAULT_BANNER_ID);
export const DEFAULT_BANNER_WIDTH = defaultDims.width;
export const DEFAULT_BANNER_HEIGHT = defaultDims.height;

export function createBannerResponse(
  bannerId: BannerId = DEFAULT_BANNER_ID,
  options?: Partial<ImageResponseOptions>,
): ImageResponse {
  const def = getBannerDefinition(bannerId);
  return new ImageResponse(React.createElement(def.Component), {
    width: def.width,
    height: def.height,
    format: "png",
    ...options,
  });
}

export async function renderBannerPng(
  bannerId: BannerId = DEFAULT_BANNER_ID,
  options?: Partial<ImageResponseOptions>,
): Promise<Buffer> {
  const res = createBannerResponse(bannerId, options);
  await res.ready;
  return Buffer.from(await res.arrayBuffer());
}

export async function renderBannerJpeg(
  bannerId: BannerId = DEFAULT_BANNER_ID,
  options?: Partial<ImageResponseOptions>,
): Promise<Buffer> {
  const res = createBannerResponse(bannerId, { ...options, format: "jpeg" });
  await res.ready;
  return Buffer.from(await res.arrayBuffer());
}

export function createMalvinasBannerResponse(
  options?: Partial<ImageResponseOptions>,
): ImageResponse {
  return createBannerResponse(DEFAULT_BANNER_ID, options);
}

export async function renderMalvinasBannerPng(
  options?: Partial<ImageResponseOptions>,
): Promise<Buffer> {
  return renderBannerPng(DEFAULT_BANNER_ID, options);
}

export async function renderMalvinasBannerJpeg(
  options?: Partial<ImageResponseOptions>,
): Promise<Buffer> {
  return renderBannerJpeg(DEFAULT_BANNER_ID, options);
}
