// Generates favicons/PWA icons (§8.3) and OG images (§1.5). Run: node scripts/og.mjs
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = createRequire(path.join(root, 'package.json'))('sharp');
const src = (p) => path.join(root, 'src/assets', p);
const pub = (p) => path.join(root, 'public', p);
const NAVY = '#0b1a33';
mkdirSync(pub('og'), { recursive: true });

// ---- Icons: orange N from logo-f (top part of the image) centered on navy square, 12% padding, radius 22%
const nMark = await sharp(src('logo-f.png')).extract({ left: 0, top: 0, width: 1100, height: 548 }).trim().png().toBuffer();
async function icon(size, out) {
  const inner = Math.round(size * 0.76);
  const mark = await sharp(nMark).resize(inner, inner, { fit: 'inside' }).toBuffer();
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}"/></svg>`);
  await sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: mark, gravity: 'center' }, { input: mask, blend: 'dest-in' }])
    .png().toFile(pub(out));
}
await icon(32, 'favicon-32.png');
await icon(180, 'apple-touch-icon.png');
await icon(192, 'icon-192.png');
await icon(512, 'icon-512.png');
writeFileSync(pub('site.webmanifest'), JSON.stringify({
  name: 'New Valley Painting', short_name: 'New Valley', start_url: '/', display: 'standalone',
  theme_color: NAVY, background_color: NAVY,
  icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n');

// ---- OG images
const items = [
  ['default', 'Painting & Remodeling in Raleigh-Durham', 'stock/img-01-hero.jpg'],
  ['interior-painting', 'Interior Painting', 'stock/img-10-interior.jpg'],
  ['exterior-painting', 'Exterior Painting', 'client/after.jpg'],
  ['cabinet-painting', 'Cabinet Painting', 'stock/img-11-cabinet.jpg'],
  ['kitchen-remodeling', 'Kitchen Remodeling', 'stock/img-12-kitchen.jpg'],
  ['bathroom-remodeling', 'Bathroom Remodeling', 'stock/img-13-bath.jpg'],
  ['flooring-installation', 'Flooring Installation', 'stock/img-14-flooring.jpg'],
  ['drywall-finishing', 'Drywall Repair & Finishing', 'stock/img-15-drywall.jpg'],
  ['decks-outdoor-living', 'Decks & Outdoor Living', 'stock/img-16-decks.jpg'],
];
const W = 1200, H = 630, PX = Math.round(W * 0.46), PAD = 72;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const wrap = (text, max = 17) => {
  const lines = []; let cur = '';
  for (const w of text.split(' ')) {
    if (cur && (cur + ' ' + w).length > max) { lines.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w;
  }
  return [...lines, cur].slice(0, 3);
};
const logo = await sharp(src('logo-n.png')).resize({ height: 56 }).toBuffer();
const logoH = 56;

for (const [slug, headline, photo] of items) {
  const lines = wrap(headline);
  const lineH = 67;
  const blockH = logoH + 32 + lines.length * lineH + 24 + 6 + 20 + 36;
  const top = Math.round((H - blockH) / 2);
  let y = top + logoH + 32;
  const tspans = lines.map((l, i) => `<text x="${PAD}" y="${y + i * lineH + 52}" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="64" fill="#fff">${esc(l)}</text>`).join('');
  y += lines.length * lineH + 24;
  const text = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${tspans}
    <rect x="${PAD}" y="${y}" width="72" height="6" rx="3" fill="#ea580c"/>
    <text x="${PAD}" y="${y + 6 + 20 + 28}" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="30" fill="#d1d5db">(919) 805-7952 · Free Estimates</text></svg>`;
  const fade = `<svg xmlns="http://www.w3.org/2000/svg" width="${PX}" height="${H}"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="${NAVY}"/><stop offset="0.45" stop-color="${NAVY}" stop-opacity="0"/></linearGradient></defs><rect width="${PX}" height="${H}" fill="url(#g)"/></svg>`;
  const img = await sharp(src(photo)).resize(PX, H, { fit: 'cover' }).toBuffer();
  await sharp({ create: { width: W, height: H, channels: 3, background: NAVY } })
    .composite([
      { input: img, left: W - PX, top: 0 },
      { input: Buffer.from(fade), left: W - PX, top: 0 },
      { input: logo, left: PAD, top },
      { input: Buffer.from(text), left: 0, top: 0 },
    ])
    .jpeg({ quality: 82, mozjpeg: true }).toFile(pub(`og/${slug}.jpg`));
  console.log('og', slug);
}
