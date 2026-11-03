// Shared helpers for slice C generator (colors ONLY from design/tokens.json)
const C = {
  n950: '#0b1a33', n900: '#10233f', n800: '#183156', n700: '#2a3d5c',
  o50: '#fff7ed', o100: '#ffedd5', o500: '#f97316', o600: '#ea580c', o700: '#c2410c', o800: '#9a3412',
  w: '#ffffff', g50: '#f9fafb', g100: '#f3f4f6', g200: '#e5e7eb', g300: '#d1d5db', g400: '#9ca3af',
  g500: '#6b7280', g600: '#4b5563', g700: '#374151', g900: '#111827',
  err: '#b91c1c', err50: '#fef2f2', ok: '#15803d', ok50: '#f0fdf4', warn: '#b45309', warn50: '#fffbeb'
};
const SH = {
  sm: '0 2px 6px -1px rgba(11, 26, 51, 0.10)', md: '0 8px 24px -6px rgba(11, 26, 51, 0.18)',
  lg: '0 20px 48px -12px rgba(11, 26, 51, 0.28)', bar: '0 -6px 20px 0 rgba(11, 26, 51, 0.25)',
  cta: '0 10px 24px -8px rgba(234, 88, 12, 0.55)'
};
const GR = {
  desk: 'linear-gradient(90deg, #0b1a33f0 0%, #0b1a33d1 42%, #0b1a3340 100%)',
  mob: 'linear-gradient(180deg, #0b1a33b3 0%, #0b1a33eb 55%, #0b1a33 100%)',
  light: 'linear-gradient(90deg, #fffffff5 0%, #ffffffe0 45%, #ffffff00 100%)'
};
const FD = "'Montserrat','Segoe UI',Arial,sans-serif";
const FB = "'Inter','Segoe UI',Roboto,Arial,sans-serif";
const LOGO = '/_blob/fc94c9cccc85f2e50008980dba7d4ae7';
const IMG0 = '/_blob/9226420d74e06266d617a98664714be8';
const IMG1 = '/_blob/94f64b9a85884fcad2b8471f3bc16cbd';

const ICON = {
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'clipboard-check': '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  'alert-circle': '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  loader: '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
  'paint-roller': '<rect x="2" y="2" width="16" height="6" rx="2"/><path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="8" y="16" width="4" height="6" rx="1"/>',
  'house-exterior': '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v12h14V9"/><path d="M10 21v-6h4v6"/><path d="M16 5V3h2v3.5"/>',
  cabinet: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18"/><path d="M9 10v4"/><path d="M15 10v4"/>',
  'cooking-pot': '<path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/>',
  bath: '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5 8 7"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M17 19v2"/>',
  flooring: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v6"/><path d="M15 9v6"/><path d="M9 15v6"/>',
  layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  fence: '<path d="M4 21V7l2-3 2 3v14"/><path d="M10 21V7l2-3 2 3v14"/><path d="M16 21V7l2-3 2 3v14"/><path d="M2 11h20"/><path d="M2 17h20"/>'
};
function icon(n, s, color, cls) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" style="flex:none;color:' + color + ';display:block"' + (cls ? ' class="' + cls + '"' : '') + '>' + ICON[n] + '</svg>';
}
const RING = 'outline:4px solid ' + C.o600 + ';outline-offset:3px;';

// static (muestreo) vs live (prototipo) link factory
const XS = { ring: '', home: '', svc: '', est: '', a: (h, s, i) => '<div style="' + s + '">' + i + '</div>' };
function XL(o) {
  return Object.assign({ ring: '', a: (h, s, i, at) => '<a href="' + h + '" style="' + s + '" ' + (at || '') + '>' + i + '</a>' }, o);
}

const BTN = {
  primary: 'background:' + C.o600 + ';border:2px solid ' + C.o600 + ';color:' + C.n950 + ';box-shadow:' + SH.cta,
  oLight: 'background:transparent;border:2px solid ' + C.w + ';color:' + C.w,
  oDark: 'background:transparent;border:2px solid ' + C.n950 + ';color:' + C.n950,
  dark: 'background:' + C.n950 + ';border:2px solid ' + C.n950 + ';color:' + C.w
};
function btn(X, o) {
  const minh = { sm: 44, md: 48, lg: 56 }[o.size || 'md'], fs = { sm: 15, md: 16, lg: 17 }[o.size || 'md'], pad = { sm: 18, md: 24, lg: 32 }[o.size || 'md'];
  const ic = o.lead ? icon(o.lead, 20, o.v === 'oLight' ? C.o500 : o.v === 'primary' ? C.n950 : C.n950) : '';
  const tr = o.trail ? icon(o.trail, 20, o.v === 'dark' ? C.o500 : C.n950) : '';
  const st = 'display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:' + minh + 'px;padding:0 ' + pad + 'px;box-sizing:border-box;border-radius:10px;font-family:' + FD + ';font-weight:700;font-size:' + fs + 'px;letter-spacing:0.01em;line-height:1;white-space:nowrap;text-decoration:none;' + BTN[o.v || 'primary'] + ';' + (o.block ? 'width:100%;' : '') + (o.ring ? RING : '');
  return X.a(o.href, st, ic + o.label + tr, o.at || '');
}
const ph = () => '<span data-placeholder="true" style="display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:999px;background:' + C.warn50 + ';border:1px solid ' + C.warn + ';color:' + C.warn + ';font:500 13px ' + FB + '">Placeholder</span>';
const kicker = (t, dark) => '<div style="display:flex;align-items:center;gap:12px;font:700 13px/1.2 ' + FD + ';letter-spacing:0.14em;text-transform:uppercase;color:' + (dark ? C.o500 : C.o700) + '"><span style="display:block;width:24px;height:3px;border-radius:4px;background:' + C.o600 + '"></span>' + t + '</div>';

const SERVICES = [
  ['interior-painting', 'Interior Painting', 'Walls, ceilings, trim and doors finished with careful prep and clean lines.', 'paint-roller'],
  ['exterior-painting', 'Exterior Painting', 'Siding, brick, trim and doors protected and refreshed for North Carolina weather.', 'house-exterior'],
  ['cabinet-painting', 'Cabinet Painting', 'A fresh, durable finish for your cabinets without the cost of replacing them.', 'cabinet'],
  ['kitchen-remodeling', 'Kitchen Remodeling', 'Cabinets, counters, layout and finishes brought together in one project.', 'cooking-pot'],
  ['bathroom-remodeling', 'Bathroom Remodeling', 'From quick refreshes to complete bathroom makeovers.', 'bath'],
  ['flooring-installation', 'Flooring Installation', 'New floors installed level, tight and ready for everyday life.', 'flooring'],
  ['drywall-finishing', 'Drywall & Finishing', 'Patches, repairs and smooth finishes, ready for paint.', 'layers'],
  ['decks-outdoor-living', 'Decks & Outdoor Living', 'Decks and outdoor spaces built, restored and stained.', 'fence']
];

function page(o) {
  const css = '<style>\nbody{margin:0}\na{color:' + C.o700 + '}a:hover{color:' + C.o800 + '}\n' +
    'a:focus-visible,button:focus-visible{outline:3px solid ' + C.o600 + ';outline-offset:3px}\n' +
    '.nvp-in::placeholder{color:' + C.g500 + '}\n' +
    '.nvp-in:hover{border-color:' + C.g700 + ' !important}\n' +
    '.nvp-in:focus{border:2px solid ' + C.n950 + ' !important;outline:3px solid ' + C.o600 + ';outline-offset:3px}\n' +
    '.nvp-in[aria-invalid="true"]{border:2px solid ' + C.err + ' !important}\n' +
    '.nvp-in:disabled{background:' + C.g100 + ' !important;color:' + C.g500 + ' !important;border-color:' + C.g300 + ' !important}\n' +
    '.nvp-btn[aria-disabled="true"]{background:' + C.g300 + ' !important;border-color:' + C.g300 + ' !important;color:' + C.g600 + ' !important;box-shadow:none !important;cursor:not-allowed}\n' +
    '.nvp-spin{animation:nvp-spin 800ms linear infinite}@keyframes nvp-spin{to{transform:rotate(360deg)}}\n' +
    '@media (prefers-reduced-motion: reduce){.nvp-spin{animation:none}}\n</style>';
  return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>' + o.title + '</title>\n<script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">\n' + css + '\n</helmet>\n' +
    '<div style="width: ' + o.w + 'px; ' + (o.fixedH ? 'height: ' : 'min-height: ') + o.h + 'px; box-sizing: border-box; overflow: hidden; position: relative; font-family: ' + FB + '; color: ' + C.g700 + '; background: ' + (o.bg || C.w) + '">\n' + o.body + '\n</div>\n</x-dc>\n' +
    '<script type="text/x-dc" data-dc-script data-props=\'{"$preview":{"width":' + o.w + ',"height":' + o.h + '}}\'>\n' + (o.script || 'class Component extends DCLogic {\n  renderVals() { return {}; }\n}') + '\n</script>\n</body>\n</html>\n';
}
module.exports = { C, SH, GR, FD, FB, LOGO, IMG0, IMG1, icon, RING, XS, XL, btn, ph, kicker, SERVICES, page };
