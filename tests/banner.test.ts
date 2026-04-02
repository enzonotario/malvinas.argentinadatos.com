import { describe, expect, it } from "vitest";
import {
  createBannerResponse,
  createMalvinasBannerResponse,
  DEFAULT_BANNER_HEIGHT,
  DEFAULT_BANNER_ID,
  DEFAULT_BANNER_WIDTH,
  getBannerDefinition,
  listBannerDefinitions,
  parseBannerId,
  renderBannerJpeg,
  renderBannerPng,
  renderMalvinasBannerJpeg,
  renderMalvinasBannerPng,
} from "../src/index.js";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);

describe("banner registry", () => {
  it("default id is strip", () => {
    expect(DEFAULT_BANNER_ID).toBe("strip");
  });

  it("lists all banner kinds", () => {
    const all = listBannerDefinitions();
    expect(all.map((b) => b.id).sort()).toEqual(["header", "og", "square", "strip"]);
  });

  it("parseBannerId accepts known ids", () => {
    expect(parseBannerId("og")).toBe("og");
  });

  it("parseBannerId rejects unknown ids", () => {
    expect(() => parseBannerId("nope")).toThrow(/Unknown banner id/);
  });
});

describe("malvinas banner rendering", () => {
  it("exports default strip dimensions", () => {
    expect(DEFAULT_BANNER_WIDTH).toBe(800);
    expect(DEFAULT_BANNER_HEIGHT).toBe(130);
  });

  it("legacy API renders strip PNG", async () => {
    const buf = await renderMalvinasBannerPng();
    expect(buf.length).toBeGreaterThan(5_000);
    expect(buf.subarray(0, 8).equals(PNG_MAGIC)).toBe(true);
  });

  it("legacy API renders strip JPEG", async () => {
    const buf = await renderMalvinasBannerJpeg();
    expect(buf.length).toBeGreaterThan(2_000);
    expect(buf.subarray(0, 3).equals(JPEG_MAGIC)).toBe(true);
  });

  it("createMalvinasBannerResponse matches strip", async () => {
    const legacy = createMalvinasBannerResponse();
    const modular = createBannerResponse("strip");
    await legacy.ready;
    await modular.ready;
    expect(legacy.headers.get("content-type")).toBe("image/png");
    expect(modular.headers.get("content-type")).toBe("image/png");
  });

  it("each registered banner renders a valid PNG", async () => {
    for (const def of listBannerDefinitions()) {
      const buf = await renderBannerPng(def.id);
      expect(buf.subarray(0, 8).equals(PNG_MAGIC)).toBe(true);
      const min = def.id === "strip" ? 4_000 : 8_000;
      expect(buf.length).toBeGreaterThan(min);
    }
  }, 180_000);

  it("each registered banner renders a valid JPEG", async () => {
    for (const def of listBannerDefinitions()) {
      const buf = await renderBannerJpeg(def.id);
      expect(buf.subarray(0, 3).equals(JPEG_MAGIC)).toBe(true);
      const min = def.id === "strip" ? 2_000 : 4_000;
      expect(buf.length).toBeGreaterThan(min);
    }
  }, 180_000);

  it("accepts override dimensions on top of banner defaults", async () => {
    const buf = await renderBannerPng("strip", { width: 400, height: 65 });
    expect(buf.subarray(0, 8).equals(PNG_MAGIC)).toBe(true);
    expect(buf.length).toBeGreaterThan(2_000);
  });

  it("getBannerDefinition returns dimensions", () => {
    const og = getBannerDefinition("og");
    expect(og.width).toBe(1200);
    expect(og.height).toBe(630);
  });
});
