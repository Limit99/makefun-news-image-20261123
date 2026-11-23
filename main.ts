// The World on Monday — one image that sums up the world news of
// Monday 23 November 2026, for make.fun's news-image-20261123.
//
// entry.png beside this file holds the picture: a dominant scene of
// Ukrainian sea drones sinking the Russian corvette Merkury in the
// port of Benghazi, Libya, under a large date masthead, with three
// short supporting stories (COP31 ends with no deal, Democrats win
// the US House, the EU-Indonesia trade deal) and a one-line ticker.
// Its editable source, frontpage.html, is kept beside it in this repo.
//
// This program's job is narrow: verify the picture is a whole PNG
// inside the gate's limits, then copy it to the output directory.
// It runs offline, twice, and must write identical bytes both times.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const MAX_BYTES = 1_048_576;
const MAX_SIDE = 1024;

// CRC-32 (the PNG chunk checksum) computed with a table built once.
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (const b of bytes) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// Walk every chunk: each one must be complete and carry a valid CRC,
// and the walk must end exactly at an IEND chunk on the file's last
// byte, so a truncated or padded file is refused instead of copied.
function inspectPng(data: Buffer): { width: number; height: number } {
  for (let i = 0; i < 8; i++) {
    if (data[i] !== PNG_SIGNATURE[i]) throw new Error("not a PNG file");
  }
  let offset = 8;
  let width = 0;
  let height = 0;
  let sawIend = false;
  while (offset < data.length) {
    if (offset + 12 > data.length) throw new Error("truncated chunk");
    const length = data.readUInt32BE(offset);
    const type = data.toString("ascii", offset + 4, offset + 8);
    const end = offset + 12 + length;
    if (end > data.length) throw new Error(`chunk ${type} overruns file`);
    const stored = data.readUInt32BE(offset + 8 + length);
    if (crc32(data.subarray(offset + 4, offset + 8 + length)) !== stored) {
      throw new Error(`chunk ${type} has a bad CRC`);
    }
    if (type === "IHDR") {
      width = data.readUInt32BE(offset + 8);
      height = data.readUInt32BE(offset + 12);
    }
    offset = end;
    if (type === "IEND") {
      sawIend = true;
      break;
    }
  }
  if (!sawIend || offset !== data.length) {
    throw new Error("no IEND chunk at the end of the file");
  }
  return { width, height };
}

const picture = readFileSync(new URL("./entry.png", import.meta.url));
if (picture.length > MAX_BYTES) {
  throw new Error(`entry.png is ${picture.length} bytes, over the 1 MiB cap`);
}
const { width, height } = inspectPng(picture);
if (width > MAX_SIDE || height > MAX_SIDE) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 cap`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.png"), picture);
console.log(`entry.png written: ${picture.length} bytes (${width}x${height})`);
