const fs = require('fs');
const path = require('path');
const L = require('./lib.js');
const S = require('./screens.js');
const F = require('./flow.js');
const { C, SH, FD, FB, icon, btn, page, XS, XL } = L;
const ROOT = process.argv[2];
const OUT = path.join(ROOT, 'concept-board', 'project');
const FRAG = path.join(ROOT, 'concept-board', 'fragments');
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(FRAG, { recursive: true });
const boards = {}; const order = []; const notes = {};
function emit(name, o, meta) {
  fs.writeFileSync(path.join(OUT, name), page(o));
  boards[name] = Object.assign({ x: meta.x, y: meta.y, w: o.w, h: o.h, page: meta.page, title: meta.title }, meta.interactive ? { is_interactive: true } : {});
  order.push(name);
}
const XR = (r) => Object.assign({}, XS, { ring: r });

/* ---------- Muestreo ---------- */
const webT = (c) => '<div style="width:432px;border:2px solid ' + C.g300 + ';border-radius:8px;overflow:hidden;background:' + C.w + '"><div style="height:20px;box-sizing:border-box;background:' + C.g100 + ';border-bottom:1px solid ' + C.g200 + ';display:flex;align-items:center;gap:4px;padding:0 8px"><i style="width:6px;height:6px;border-radius:50%;background:' + C.g400 + ';display:block"></i><i style="width:6px;height:6px;border-radius:50%;background:' + C.g400 + ';display:block"></i><i style="width:6px;height:6px;border-radius:50%;background:' + C.g400 + ';display:block"></i></div><div style="position:relative;width:432px;height:243px;overflow:hidden"><div style="position:absolute;top:0;left:0;width:1440px;height:810px;overflow:hidden;transform:scale(0.3);transform-origin:0 0;background:' + C.w + '">' + c + '</div></div></div>';
const phoneT = (dev, w, h, s) => '<div style="width:' + Math.round(w * s) + 'px;height:' + Math.round(h * s) + 'px;border:2px solid ' + C.n950 + ';border-radius:14px;overflow:hidden;position:relative"><div style="position:absolute;top:0;left:0;width:' + w + 'px;height:' + h + 'px;transform:scale(' + s + ');transform-origin:0 0">' + dev + '</div></div>';
const lab = (t) => '<div style="margin-bottom:6px;font:600 12px/1.3 ' + FB + ';color:' + C.g600 + '">' + t + '</div>';
const dim = (inner, sheet) => '<div style="position:relative;width:100%;height:100%;overflow:hidden">' + inner + '<div style="position:absolute;inset:0;background:' + C.n950 + ';opacity:0.6"></div>' + sheet + '</div>';
const callWeb = () => '<div style="position:relative;width:1440px;height:810px;overflow:hidden">' + S.dHome(XS) + '<div style="position:absolute;inset:0;background:' + C.n950 + ';opacity:0.6"></div><div style="position:absolute;left:460px;top:250px;width:520px;box-sizing:border-box;padding:32px;background:' + C.w + ';border-radius:16px;box-shadow:' + SH.lg + '"><div style="font:700 26px/1.3 ' + FD + ';color:' + C.n950 + '">Call (919) 805-7952</div><p style="margin:12px 0 0;font:400 17px/1.6 ' + FB + ';color:' + C.g700 + '">The browser hands the number to your calling app (prompt varies by device).</p><div style="margin-top:24px;display:flex;gap:12px">' + btn(XS, { v: 'oDark', label: 'Cancel' }) + btn(XS, { label: 'Call', lead: 'phone' }) + '</div></div></div>';
const callIos = () => dim(S.mHome(XS), '<div style="position:absolute;left:8px;right:8px;bottom:8px;display:grid;gap:8px"><div style="background:' + C.w + ';border-radius:16px;padding:20px;text-align:center"><div style="font:600 13px ' + FB + ';color:' + C.g600 + '">Call</div><div style="margin-top:8px;font:700 22px ' + FD + ';color:' + C.n950 + '">(919) 805-7952</div><div style="margin-top:16px;display:flex;justify-content:center">' + btn(XS, { size: 'lg', block: true, label: 'Call', lead: 'phone' }) + '</div></div><div style="background:' + C.w + ';border-radius:16px;padding:14px;text-align:center;font:600 17px ' + FD + ';color:' + C.n950 + '">Cancel</div></div>');
const callAnd = () => '<div style="position:relative;width:100%;height:100%;background:' + C.w + ';display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px"><div style="font:600 14px ' + FB + ';color:' + C.g600 + '">Phone app</div><div style="font:700 34px ' + FD + ';color:' + C.n950 + ';font-variant-numeric:tabular-nums lining-nums">(919) 805-7952</div><div style="width:72px;height:72px;border-radius:50%;background:' + C.ok + ';display:flex;align-items:center;justify-content:center">' + icon('phone', 32, C.w) + '</div></div>';
const wrapM = (inner) => inner;

function muestreo(file, title, sub, y, x, steps) {
  const rows = steps.map((st, i) => '<div style="display:flex;align-items:flex-start;gap:24px;margin-top:' + (i ? 28 : 0) + 'px"><div style="width:220px;flex:none"><div style="width:36px;height:36px;border-radius:50%;background:' + C.n950 + ';color:' + C.w + ';display:flex;align-items:center;justify-content:center;font:800 16px ' + FD + '">' + (i + 1) + '</div><div style="margin-top:12px;font:700 18px/1.3 ' + FD + ';color:' + C.n950 + '">' + st.t + '</div><div style="margin-top:8px;font:400 14px/1.5 ' + FB + ';color:' + C.g600 + '">' + st.d + '</div></div>' +
    '<div>' + lab('Web · 1440') + webT(st.w) + '</div><div>' + lab('iOS · Safari') + phoneT(S.iosDevice(st.m), 390, 844, 0.3) + '</div><div>' + lab('Android · Chrome') + phoneT(S.androidDevice(st.a || st.m), 412, 915, 0.28) + '</div></div>').join('');
  const h = 150 + steps.length * 300 + (steps.length - 1) * 28 + 40;
  const body = '<div style="padding:40px"><div style="display:flex;align-items:center;gap:12px"><span style="display:block;width:24px;height:3px;border-radius:4px;background:' + C.o600 + '"></span><span style="font:700 13px ' + FD + ';letter-spacing:0.14em;text-transform:uppercase;color:' + C.o700 + '">Muestreo</span></div><h2 style="margin:12px 0 0;font:800 30px/1.15 ' + FD + ';color:' + C.n950 + '">' + title + '</h2><p style="margin:8px 0 0;font:400 16px/1.5 ' + FB + ';color:' + C.g600 + '">' + sub + '</p><div style="margin-top:32px">' + rows + '</div></div>';
  emit(file, { title: title, w: 1100, h: h, body: body }, { x: x, y: y, page: 'muestreo', title: 'Muestreo ' + file.slice(9, 11) + ' · ' + title });
  return h;
}
const mAn = (fn) => (X) => fn(X);
let yM = 0;
const hs = [];
hs.push(muestreo('muestreo-01-cotizacion.dc.html', 'Cotización gratuita', 'Inicio, botón Get a Free Estimate, formulario y confirmación.', 0, 0, [
  { t: 'Inicio: tocar "Get a Free Estimate"', d: 'CTA principal del hero (escritorio) y de la barra fija (móvil).', w: S.dHome(XR('cta')), m: S.mHome(XR('cta')) },
  { t: 'Formulario de cotización', d: 'Nombre, teléfono, ZIP y servicio obligatorios; correo, detalles y horario opcionales.', w: S.dFormStatic(XS, false), m: S.mFormStatic(XS, false) },
  { t: 'Confirmación', d: 'Mensaje de éxito con el método de contacto elegido y el teléfono.', w: S.dFormStatic(XS, true), m: S.mFormStatic(XS, true) }
]));
hs.push(muestreo('muestreo-02-llamada.dc.html', 'Llamada directa', 'Barra fija móvil "Call Now" o teléfono del encabezado, y la app de llamadas con (919) 805-7952.', 0, 1180, [
  { t: 'Tocar "Call Now" o el teléfono', d: 'Móvil: barra fija inferior. Escritorio: teléfono en el encabezado.', w: S.dHome(XR('call')), m: S.mHome(XR('call')) },
  { t: 'Se abre la app de llamadas', d: 'Enlace tel:+19198057952. El aviso exacto lo define el sistema operativo.', w: callWeb(), m: callIos(), a: callAnd() }
]));
hs.push(muestreo('muestreo-03-servicio.dc.html', 'Servicio a cotización', 'Servicios, página del servicio y CTA hacia el formulario.', 0, 2360, [
  { t: 'Listado de servicios', d: 'Se elige un servicio de la cuadrícula.', w: S.dHub(XS), m: S.mHub(XS) },
  { t: 'Página del servicio', d: 'Alcance, garantía y CTA "Get a Free Estimate".', w: S.dService(XR('cta')), m: S.mService(XR('cta')) },
  { t: 'Formulario de cotización', d: 'Mismo formulario del flujo 1.', w: S.dFormStatic(XS, false), m: S.mFormStatic(XS, false) }
]));
notes['c-muestreo-row1'] = { x: 0, y: -240, text: 'Muestreo · flujos clave (Web / iOS Safari / Android Chrome)', kind: 'title1', maxW: 3600, page: 'muestreo' };

/* ---------- Prototipo ---------- */
const XD = XL({ home: 'proto-01-inicio.dc.html', svc: 'proto-02-servicio.dc.html', est: 'proto-03-cotizacion.dc.html' });
const XM = XL({ home: 'proto-04-inicio-movil.dc.html', svc: 'proto-04-inicio-movil.dc.html', est: 'proto-05-cotizacion-movil.dc.html' });
const GAP = 80; const ROWGAP = 320;
// row 1: live card
const liveBody = '<a href="LIVE_URL_PENDING" style="display:flex;align-items:center;justify-content:space-between;gap:24px;box-sizing:border-box;width:100%;min-height:200px;padding:32px;background:' + C.n950 + ';color:' + C.w + ';text-decoration:none;border-radius:24px"><span style="display:block"><span style="display:block;font:700 13px ' + FD + ';letter-spacing:0.14em;text-transform:uppercase;color:' + C.o500 + '">Prototipo</span><span style="display:block;margin-top:12px;font:800 28px/1.15 ' + FD + ';color:' + C.w + '">Ver prototipo en vivo</span><span style="display:block;margin-top:8px;font:400 15px/1.5 ' + FB + ';color:' + C.g300 + '">Abre el sitio desplegado en una pestaña nueva.</span></span>' + icon('arrow-right', 32, C.o500) + '</a>';
emit('proto-00-en-vivo.dc.html', { title: 'Ver prototipo en vivo', w: 520, h: 200, body: liveBody, fixedH: true, bg: C.n950 }, { x: 0, y: 0, page: 'prototipo', title: 'Prototipo · Ver en vivo', interactive: true });
notes['c-proto-row1'] = { x: 0, y: -240, text: 'Prototipo · versión en vivo', kind: 'title1', maxW: 1200, page: 'prototipo' };
const yD = 200 + ROWGAP;
const dFlow = (hero) => hero;
emit('proto-01-inicio.dc.html', { title: 'Inicio (escritorio)', w: 1440, h: 1540, body: S.dHome(XD, 'Prototipo: cada tarjeta de servicio abre la página de Interior Painting.') }, { x: 0, y: yD, page: 'prototipo', title: 'Prototipo · 01 · Inicio (escritorio)', interactive: true });
emit('proto-02-servicio.dc.html', { title: 'Servicio (escritorio)', w: 1440, h: 1460, body: S.dService(XD) }, { x: 1440 + GAP, y: yD, page: 'prototipo', title: 'Prototipo · 02 · Servicio (escritorio)', interactive: true });
const back = XD.a(XD.home, 'display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 24px;border-radius:10px;background:transparent;border:2px solid ' + C.n950 + ';color:' + C.n950 + ';font:700 16px/1 ' + FD + ';text-decoration:none;white-space:nowrap', 'Back to home');
const dForm = S.dHeader(XD) + S.dFormHero + '<section style="padding:56px 0"><div style="width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:7fr 5fr;gap:48px"><div style="background:' + C.w + ';border:1px solid ' + C.g200 + ';border-radius:24px;box-shadow:' + SH.md + ';padding:40px">' + F.formBound(true).replace('@@BACK@@', back) + '</div>' + S.dAside(XD) + '</div></section>';
emit('proto-03-cotizacion.dc.html', { title: 'Cotización (escritorio)', w: 1440, h: 1560, body: dForm, script: F.SCRIPT }, { x: 2 * (1440 + GAP), y: yD, page: 'prototipo', title: 'Prototipo · 03 · Cotización (escritorio, todos los estados)', interactive: true });
notes['c-proto-row2'] = { x: 0, y: yD - 240, text: 'Prototipo · escritorio 1440', kind: 'title1', maxW: 4400, page: 'prototipo' };
const yM2 = yD + 1560 + ROWGAP;
const mHeroForm = '<section style="background:' + C.n950 + ';padding:32px 20px"><h1 style="' + S.hh(32, C.w) + '">Get Your Free Estimate</h1><p style="margin:12px 0 0;font:400 17px/1.6 ' + FB + ';color:' + C.g300 + '">Tell us about your project. It takes about a minute, and there\'s no obligation.</p></section>';
const mFormBound = (X, back2) => S.mWrap(S.mScroll(S.mHeader(X) + mHeroForm + '<section style="padding:24px 16px"><div style="border:1px solid ' + C.g200 + ';border-radius:24px;box-shadow:' + SH.md + ';padding:24px;background:' + C.w + '">' + F.formBound(false).replace('@@BACK@@', back2) + '</div></section>', true), S.mBar(X, true));
const backM = XM.a(XM.home, 'display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 24px;border-radius:10px;background:transparent;border:2px solid ' + C.n950 + ';color:' + C.n950 + ';font:700 16px/1 ' + FD + ';text-decoration:none;white-space:nowrap', 'Back to home');
emit('proto-04-inicio-movil.dc.html', { title: 'Inicio (móvil 390)', w: 390, h: 844, fixedH: true, body: S.mHome(XM, true) }, { x: 0, y: yM2, page: 'prototipo', title: 'Prototipo · 04 · Inicio (móvil 390)', interactive: true });
emit('proto-05-cotizacion-movil.dc.html', { title: 'Cotización (móvil 390)', w: 390, h: 844, fixedH: true, body: mFormBound(XM, backM), script: F.SCRIPT }, { x: 390 + GAP, y: yM2, page: 'prototipo', title: 'Prototipo · 05 · Cotización (móvil 390, todos los estados)', interactive: true });
notes['c-proto-row3'] = { x: 0, y: yM2 - 240, text: 'Prototipo · móvil 390', kind: 'title1', maxW: 1200, page: 'prototipo' };

/* ---------- Pantallas editables ---------- */
const XE = { ring: '', home: '#', svc: '#', est: '#', a: (h, s, i, at) => (h.indexOf('tel:') === 0 ? '<a href="' + h + '" style="' + s + '" ' + (at || '') + '>' + i + '</a>' : '<div style="' + s + '">' + i + '</div>') };
const bar = (w, hgt) => '<div style="height:' + hgt + 'px;overflow:hidden">' + F.presetBar(w) + '</div>';
const eWeb = bar(1366, 68) + '<div style="width:1366px;overflow:hidden">' + S.dHeader(XE) + S.dFormHero + '<section style="padding:56px 0"><div style="width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:7fr 5fr;gap:48px"><div style="background:' + C.w + ';border:1px solid ' + C.g200 + ';border-radius:24px;box-shadow:' + SH.md + ';padding:40px">' + F.formBound(true).replace('@@BACK@@', '') + '</div>' + S.dAside(XE) + '</div></section></div>';
const yE = 0;
emit('edit-web-01-cotizacion-formulario.dc.html', { title: 'Web · 01 · Cotización · Formulario (editable)', w: 1366, h: 1900, body: eWeb, script: F.SCRIPT }, { x: 0, y: yE, page: 'editables', title: 'Web · 01 · Cotización · Formulario (editable)', interactive: true });
emit('edit-ios-01-cotizacion-formulario.dc.html', { title: 'iOS · 01 · Cotización · Formulario (editable)', w: 390, h: 964, fixedH: true, body: bar(390, 120) + S.iosDevice(mFormBound(XE, '')), script: F.SCRIPT }, { x: 1366 + GAP, y: yE, page: 'editables', title: 'iOS · 01 · Cotización · Formulario (editable)', interactive: true });
emit('edit-android-01-cotizacion-formulario.dc.html', { title: 'Android · 01 · Cotización · Formulario (editable)', w: 412, h: 1035, fixedH: true, body: bar(412, 120) + S.androidDevice(mFormBound(XE, '')), script: F.SCRIPT }, { x: 1366 + GAP + 390 + GAP, y: yE, page: 'editables', title: 'Android · 01 · Cotización · Formulario (editable)', interactive: true });
notes['c-edit-row1'] = { x: 0, y: -240, text: 'Pantallas editables · Cotización (Web / iOS Safari / Android Chrome)', kind: 'title1', maxW: 2400, page: 'editables' };

fs.writeFileSync(path.join(FRAG, 'c.json'), JSON.stringify({ boards: boards, order: order, notes: notes }, null, 2));
console.log(order.length + ' artboards');
