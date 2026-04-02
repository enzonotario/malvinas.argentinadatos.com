import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_BANNER_ID,
  listBannerDefinitions,
  parseBannerId,
  renderBannerJpeg,
  renderBannerPng,
} from "../index.js";
import type { BannerId } from "../banners/types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const publicDir = path.join(repoRoot, "public");

type Parsed =
  | { mode: "help" }
  | { mode: "all" }
  | { mode: "one"; outPath: string; bannerId: BannerId };

function parseArgs(argv: string[]): Parsed {
  let bannerId: BannerId = DEFAULT_BANNER_ID;
  let sawBannerFlag = false;
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--banner" && argv[i + 1]) {
      bannerId = parseBannerId(argv[i + 1]);
      sawBannerFlag = true;
      i += 1;
      continue;
    }
    if (a === "--all") {
      return { mode: "all" };
    }
    if (a === "--help" || a === "-h") {
      return { mode: "help" };
    }
    if (!a.startsWith("-")) positional.push(a);
  }
  if (positional.length === 0) {
    if (sawBannerFlag) {
      return {
        mode: "one",
        outPath: path.join(publicDir, `${bannerId}.png`),
        bannerId,
      };
    }
    return { mode: "all" };
  }
  return {
    mode: "one",
    outPath: path.resolve(process.cwd(), positional[0]),
    bannerId,
  };
}

async function writePngAndJpeg(bannerId: BannerId, pngPath: string) {
  const dir = path.dirname(pngPath);
  const base = path.basename(pngPath, path.extname(pngPath));
  const jpgPath = path.join(dir, `${base}.jpg`);
  const [png, jpeg] = await Promise.all([
    renderBannerPng(bannerId),
    renderBannerJpeg(bannerId),
  ]);
  await Promise.all([fs.writeFile(pngPath, png), fs.writeFile(jpgPath, jpeg)]);
  process.stdout.write(`${pngPath}\n${jpgPath}\n`);
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.mode === "help") {
    process.stdout.write(`Usage:
  tsx src/cli/generate.ts
  tsx src/cli/generate.ts [--all]
  tsx src/cli/generate.ts <output.png|.jpg> [--banner <id>]
  tsx src/cli/generate.ts --banner <id>
  tsx src/cli/generate.ts --help

With no arguments, writes every variant to public/<id>.png and public/<id>.jpg

Banner ids:
${listBannerDefinitions()
  .map((b) => `  ${b.id.padEnd(8)} ${b.width}×${b.height}  ${b.purpose}`)
  .join("\n")}
Single-file default id (when --banner omitted): ${DEFAULT_BANNER_ID}
`);
    return;
  }
  if (parsed.mode === "all") {
    await fs.mkdir(publicDir, { recursive: true });
    for (const def of listBannerDefinitions()) {
      await writePngAndJpeg(def.id, path.join(publicDir, `${def.id}.png`));
    }
    return;
  }
  const ext = path.extname(parsed.outPath).toLowerCase();
  await fs.mkdir(path.dirname(parsed.outPath), { recursive: true });
  if (ext === ".jpg" || ext === ".jpeg") {
    const jpeg = await renderBannerJpeg(parsed.bannerId);
    await fs.writeFile(parsed.outPath, jpeg);
    process.stdout.write(`${parsed.outPath}\n`);
    return;
  }
  const pngPath =
    ext === ".png" ? parsed.outPath : path.join(parsed.outPath, `${parsed.bannerId}.png`);
  if (ext !== ".png") {
    await fs.mkdir(path.dirname(pngPath), { recursive: true });
  }
  await writePngAndJpeg(parsed.bannerId, pngPath);
}

main().catch((err) => {
  process.stderr.write(String(err instanceof Error ? err.stack ?? err.message : err) + "\n");
  process.exitCode = 1;
});
