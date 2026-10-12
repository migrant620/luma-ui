// Runtime cover-colour extraction for the event-detail background.
//
// GOAL R5: the detail background must be a real algorithm — sampled from our
// own cover image at runtime — never a per-image hardcoded colour. The
// gradient below is derived entirely from the dominant colour of whatever
// cover is passed in, so any future event automatically gets a matching
// background without touching this file.
//
// Method (deterministic, same image -> same colours):
//   1. Resolve the bundled asset URI and decode it.
//   2. Downscale to a 48x48 canvas and read the pixels.
//   3. Bucket quantise RGB (5 bits/channel) with a saturation-weighted
//      histogram so chromatic regions win over flat white/dark margins;
//      very dark and very bright pixels are down-weighted.
//   4. The heaviest chromatic bucket's weighted mean is the dominant colour.
//      Achromatic covers legitimately yield a neutral background.
//   5. Derive the vertical gradient (deep at the top where the nav/status
//      overlays sit, lifting toward a desaturated base at the bottom) and a
//      left-edge scrim, both as pure functions of the dominant colour.

import { Platform } from 'react-native';

type RGB = [number, number, number];

interface CoverPalette {
  dominant: RGB;
  gradient: string;
}

const cache = new Map<string, Promise<CoverPalette | null>>();

const SAMPLE_N = 48;
const BITS = 5; // 32 buckets per channel

const rgbCss = ([r, g, b]: RGB, a = 1): string =>
  a >= 1 ? `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})` : `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;

const shade = (c: RGB, f: number): RGB => [c[0] * f, c[1] * f, c[2] * f];

const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const luma = (c: RGB): number => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

const desat = (c: RGB, t: number): RGB => {
  const l = luma(c);
  return [c[0] + (l - c[0]) * t, c[1] + (l - c[1]) * t, c[2] + (l - c[2]) * t];
};

function loadImage(uri: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = uri;
  });
}

function saturation(c: RGB): number {
  const max = Math.max(c[0], c[1], c[2]);
  const min = Math.min(c[0], c[1], c[2]);
  return max === 0 ? 0 : (max - min) / max;
}

function dominantColour(img: HTMLImageElement): RGB | null {
  const canvas = document.createElement('canvas');
  canvas.width = SAMPLE_N;
  canvas.height = SAMPLE_N;
  const ctx = canvas.getContext('2d', { willReadFrequently: true } as any) as CanvasRenderingContext2D | null;
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, SAMPLE_N, SAMPLE_N);
  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, SAMPLE_N, SAMPLE_N).data;
  } catch {
    return null;
  }
  const buckets = new Map<number, { w: number; r: number; g: number; b: number }>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 200) continue; // skip transparent
    const c: RGB = [data[i], data[i + 1], data[i + 2]];
    const v = Math.max(c[0], c[1], c[2]) / 255;
    let w = 0.15 + saturation(c); // chromatic pixels carry more weight
    if (v < 0.1 || v > 0.95) w *= 0.25; // down-weight near-black / near-white
    const key = ((c[0] >> BITS) << 10) | ((c[1] >> BITS) << 5) | (c[2] >> BITS);
    const e = buckets.get(key);
    if (e) {
      e.w += w;
      e.r += c[0] * w;
      e.g += c[1] * w;
      e.b += c[2] * w;
    } else {
      buckets.set(key, { w, r: c[0] * w, g: c[1] * w, b: c[2] * w });
    }
  }
  if (buckets.size === 0) return null;
  const ranked = Array.from(buckets.values())
    .map((e) => ({ w: e.w, mean: [e.r / e.w, e.g / e.w, e.b / e.w] as RGB }))
    .sort((a, b) => b.w - a.w);
  const top = ranked[0];
  // Prefer a chromatic bucket when the heaviest one is nearly grey but a
  // comparably weighted colourful bucket exists.
  if (saturation(top.mean) < 0.15) {
    const chroma = ranked.find((r) => saturation(r.mean) >= 0.2 && r.w >= 0.35 * top.w);
    if (chroma) return chroma.mean;
  }
  return top.mean;
}

// Pure function of the dominant colour — no constants below encode a
// particular cover's appearance.
function backgroundGradient(dominant: RGB): string {
  const grey = desat(dominant, 0.72);
  const stops: Array<[number, RGB]> = [
    [0.0, shade(dominant, 0.13)],
    [0.16, shade(dominant, 0.14)],
    [0.3, shade(dominant, 0.34)],
    [0.46, shade(dominant, 0.46)],
    [0.6, mix(shade(dominant, 0.55), shade(grey, 0.58), 0.5)],
    [0.78, shade(grey, 0.66)],
    [1.0, shade(grey, 0.74)],
  ];
  const body = `linear-gradient(180deg, ${stops
    .map(([p, c]) => `${rgbCss(c)} ${Math.round(p * 100)}%`)
    .join(', ')})`;
  const scrim = `linear-gradient(90deg, ${rgbCss(shade(dominant, 0.08), 0.42)} 0%, ${rgbCss(
    shade(dominant, 0.08),
    0,
  )} 42%)`;
  return `${scrim}, ${body}`;
}

async function extract(uri: string): Promise<CoverPalette | null> {
  const img = await loadImage(uri);
  if (!img || !img.naturalWidth) return null;
  const dominant = dominantColour(img);
  if (!dominant) return null;
  return { dominant, gradient: backgroundGradient(dominant) };
}

// Resolve a Metro asset module to a URL without Image.resolveAssetSource
// (not available as a static in this RNW build). Mirrors what
// AssetSourceResolver does for a single-scale bundled asset.
function resolveUri(source: any): string | undefined {
  if (source == null) return undefined;
  if (typeof source === 'string') return source;
  const obj = typeof source === 'number' ? null : source.default ?? source;
  if (obj && typeof obj === 'object') {
    if (typeof obj.uri === 'string') return obj.uri;
    if (obj.httpServerLocation && obj.name && obj.type) {
      const scales: number[] | undefined = obj.scales;
      const scale = scales && scales.length > 1 ? scales[scales.length - 1] : 1;
      const file = scale === 1 ? `${obj.name}.${obj.type}` : `${obj.name}@${scale}x.${obj.type}`;
      return `${obj.httpServerLocation}/${file}`;
    }
  }
  return undefined;
}

/**
 * Extract a background gradient from a bundled cover image at runtime.
 * Resolves to `null` when extraction is impossible (non-web platform,
 * decode failure) so callers can keep their neutral fallback.
 */
export function extractCoverBackground(source: any): Promise<string | null> {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return Promise.resolve(null);
  let uri = resolveUri(source);
  if (!uri) return Promise.resolve(null);
  if (!cache.has(uri)) cache.set(uri, extract(uri));
  return cache.get(uri)!.then((p) => (p ? p.gradient : null));
}
