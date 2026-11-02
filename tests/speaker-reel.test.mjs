import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const reelPath = "videos/sam-whitney-speaker-reel-jan-2026.mp4";
const source = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const video = readFileSync(resolve(root, "client/public", reelPath));

// Run after the production build: node --test tests/speaker-reel.test.mjs

test("homepage uses the deployable local reel and inline mobile playback", () => {
  assert.ok(source.includes(`const VIDEO_URL = "/${reelPath}";`));
  assert.ok(!source.includes("d2xsxph8kpxj0f.cloudfront.net"));
  assert.match(source, /<video\s+src=\{VIDEO_URL\}[\s\S]*?playsInline[\s\S]*?preload="metadata"/);
  assert.ok(source.includes("Watch Sam Speak"));
});

test("reel is H.264 with AAC audio and fast-start metadata", () => {
  const atoms = [];
  let offset = 0;
  while (offset + 8 <= video.length) {
    let size = video.readUInt32BE(offset);
    const type = video.toString("ascii", offset + 4, offset + 8);
    if (size === 1) size = Number(video.readBigUInt64BE(offset + 8));
    if (size === 0) size = video.length - offset;
    assert.ok(size >= 8 && offset + size <= video.length, "valid MP4 atom");
    atoms.push(type);
    offset += size;
  }
  assert.equal(atoms[0], "ftyp");
  assert.ok(atoms.includes("moov") && atoms.includes("mdat"));
  assert.ok(atoms.indexOf("moov") < atoms.indexOf("mdat"), "metadata precedes video for fast playback startup");
  assert.ok(video.includes(Buffer.from("avc1")), "H.264 video track");
  assert.ok(video.includes(Buffer.from("mp4a")), "AAC audio track");
});

test("production build includes the exact complete reel", () => {
  assert.deepEqual(readFileSync(resolve(root, "dist", reelPath)), video);
});

test("all existing image assets are copied unchanged to the production build", () => {
  const originals = resolve(root, "client/public/images");
  for (const name of readdirSync(originals)) {
    assert.deepEqual(
      readFileSync(resolve(root, "dist/images", name)),
      readFileSync(resolve(originals, name)),
      `image preserved: ${name}`,
    );
  }
});
