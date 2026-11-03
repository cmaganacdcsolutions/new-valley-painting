const L = require('./lib.js');
const { C, SH, GR, FD, FB, LOGO, IMG0, IMG1, icon, btn, ph, kicker, SERVICES } = L;
const logo = (h) => '<img src="' + LOGO + '" alt="New Valley Painting" style="display:block;height:' + h + 'px;width:auto">';
const hh = (sz, color, mt) => 'margin:' + (mt || 0) + 'px 0 0;font:800 ' + sz + 'px/1.12 ' + FD + ';letter-spacing:-0.01em;color:' + color;

/* ---------- desktop (1440 wide) ---------- */
function dHeader(X) {
  const nav = 'font:600 15px/1 ' + FD + ';color:' + C.w + ';text-decoration:none;display:inline-flex;align-items:center;min-height:44px';
  return '<header style="height:80px;box-sizing:border-box;background:' + C.n950 + ';border-bottom:1px solid ' + C.n700 + ';display:flex;align-items:center;justify-content:space-between;padding:0 120px">' +
    X.a(X.home, 'display:inline-flex;align-items:center', logo(44), 'aria-label="New Valley Painting, home"') +
    '<nav style="display:flex;align-items:center;gap:32px">' + X.a(X.svc, nav, 'Services') + '<span style="' + nav + '">Service Areas</span><span style="' + nav + '">Projects</span><span style="' + nav + '">About</span><span style="' + nav + '">Reviews</span></nav>' +
    '<div style="display:flex;align-items:center;gap:24px">' +
    X.a('tel:+19198057952', 'display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 4px;font:700 15px/1 ' + FD + ';color:' + C.w + ';text-decoration:none;white-space:nowrap;font-variant-numeric:tabular-nums lining-nums;' + (X.ring === 'call' ? L.RING : ''), icon('phone', 18, C.o500) + '(919) 805-7952') +
    btn(X, { href: X.est, size: 'sm', label: 'Get a Free Estimate', trail: 'arrow-right' }) + '</div></header>';
}
function dFooter() {
  return '<footer style="background:' + C.n950 + ';padding:40px 120px;display:flex;justify-content:space-between;align-items:center">' + logo(44) +
    '<div style="text-align:right;font:400 14px/1.6 ' + FB + ';color:' + C.g300 + '">(919) 805-7952<br>nvpnting@gmail.com</div></footer>';
}
function sCard(X, o) {
  const mh = o.mh || 150;
  const media = o.img ? '<img src="' + o.img + '" alt="" style="display:block;width:100%;height:' + mh + 'px;object-fit:cover">' :
    '<div style="position:relative;height:' + mh + 'px;background:' + C.g100 + ';display:flex;align-items:center;justify-content:center">' + icon(o.ic, 40, C.o700) + '<span style="position:absolute;top:8px;left:8px">' + ph() + '</span></div>';
  const inner = media + '<div style="padding:0 20px 20px"><div style="position:relative;margin-top:-24px;margin-left:0;width:48px;height:48px;box-sizing:border-box;border-radius:10px;background:' + C.o50 + ';border:1px solid ' + C.o100 + ';box-shadow:0 0 0 4px ' + C.w + ';display:flex;align-items:center;justify-content:center">' + icon(o.ic, 24, C.o600) + '</div>' +
    '<div style="margin-top:12px;font:700 18px/1.3 ' + FD + ';color:' + C.n950 + '">' + o.title + '</div>' +
    '<div style="margin-top:8px;font:400 14px/1.5 ' + FB + ';color:' + C.g600 + '">' + o.desc + '</div>' +
    '<div style="margin-top:16px;display:inline-flex;align-items:center;gap:6px;min-height:44px;font:700 15px ' + FD + ';color:' + C.o700 + '">Learn more' + icon('arrow-right', 18, C.o700) + '</div></div>';
  return X.a(o.href, 'display:block;box-sizing:border-box;text-decoration:none;background:' + C.w + ';border:1px solid ' + C.g200 + ';border-radius:16px;box-shadow:' + SH.sm + ';overflow:hidden', inner);
}
function dHero(X) {
  const checks = ['Interior & Exterior Painting', 'Kitchen & Bathroom Remodeling', 'Flooring Installation', 'Drywall & Finishing', 'Decks & Outdoor Living', 'And More'].map((t) =>
    '<li style="display:flex;align-items:center;gap:8px;font:500 16px/1.4 ' + FB + ';color:' + C.w + '">' + icon('check', 20, C.o500) + t + '</li>').join('');
  return '<section style="position:relative;height:700px;overflow:hidden;background:' + C.n950 + '">' +
    '<img src="' + IMG0 + '" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">' +
    '<div style="position:absolute;inset:0;background:' + GR.desk + '"></div>' +
    '<div style="position:relative;width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px;height:100%;display:flex;flex-direction:column;justify-content:center"><div style="max-width:640px">' +
    kicker('More than painting · Raleigh-Durham, NC', true) +
    '<h1 style="' + hh(60, C.w, 12).replace('1.12', '1.05') + '">Painting &amp; Remodeling Services in Raleigh-Durham</h1>' +
    '<p style="margin:16px 0 0;font:400 19px/1.6 ' + FB + ';color:' + C.g300 + ';max-width:34rem">From fresh interior and exterior paint to complete kitchen and bath remodels, we deliver quality, value and attention to detail. Family owned, fully insured and backed by a 2-year workmanship warranty.</p>' +
    '<ul style="list-style:none;margin:24px 0 0;padding:0;display:grid;grid-template-columns:repeat(2,max-content);column-gap:32px;row-gap:8px">' + checks + '</ul>' +
    '<div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap">' + btn(X, { href: X.est, size: 'lg', label: 'Get a Free Estimate', trail: 'arrow-right', ring: X.ring === 'cta' }) + btn(X, { href: 'tel:+19198057952', size: 'lg', v: 'oLight', label: 'Call (919) 805-7952', lead: 'phone' }) + '</div>' +
    '<div style="margin-top:16px;display:flex;align-items:center;gap:8px;font:500 13px/1.45 ' + FB + ';color:' + C.g300 + '">' + icon('shield-check', 16, C.o500) + 'Free, no-obligation estimates · Fully insured</div>' +
    '</div></div></section>';
}
function dHome(X, note) {
  const cards = [[0, null], [1, IMG1], [3, null], [4, null]].map((p) => {
    const s = SERVICES[p[0]];
    return sCard(X, { href: X.svc, title: s[1], desc: s[2], ic: s[3], img: p[1] });
  }).join('');
  return dHeader(X) + dHero(X) +
    '<section style="height:760px;box-sizing:border-box;padding:72px 0;background:' + C.w + '"><div style="width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px">' +
    kicker('What we do') + '<h2 style="' + hh(40, C.n950, 12) + '">Painting &amp; Remodeling Services</h2>' +
    '<p style="margin:16px 0 0;font:400 19px/1.6 ' + FB + ';color:' + C.g600 + '">One trusted, family-owned team for the inside and outside of your home.</p>' +
    '<div style="margin-top:40px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px">' + cards + '</div>' +
    '<div style="margin-top:32px;text-align:center">' + btn(X, { href: X.svc, v: 'oDark', label: 'View all services' }) + '</div>' +
    (note ? '<p style="margin:16px 0 0;text-align:center;font:500 13px/1.45 ' + FB + ';color:' + C.g600 + '">' + note + '</p>' : '') +
    '</div></section>';
}
function dHub(X) {
  const cards = SERVICES.map((s) => sCard(X, { href: X.svc, title: s[1], desc: s[2], ic: s[3], mh: 130, img: s[0] === 'exterior-painting' ? IMG1 : null })).join('');
  return dHeader(X) + '<section style="background:' + C.n950 + ';padding:56px 0 48px"><div style="width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px">' + kicker('Services', true) + '<h1 style="' + hh(48, C.w, 12) + '">Painting &amp; Remodeling Services</h1></div></section>' +
    '<section style="padding:56px 0 72px"><div style="width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px">' + cards + '</div></section>';
}
function dService(X) {
  const inc = ['Walls & ceilings', 'Trim, doors & baseboards', 'Surface prep & patching', 'Color guidance', 'Clean-up every day'].map((t) =>
    '<li style="display:flex;align-items:center;gap:12px;font:400 16px/1.5 ' + FB + ';color:' + C.g700 + '">' + icon('check', 20, C.o600) + t + '</li>').join('');
  return dHeader(X) +
    '<section style="position:relative;height:520px;background:' + C.w + ';overflow:hidden">' +
    '<div style="position:absolute;top:0;right:0;bottom:0;width:58%;background:' + C.g100 + ';display:flex;align-items:center;justify-content:center">' + icon('paint-roller', 96, C.o700) + '<span style="position:absolute;top:16px;right:16px">' + ph() + '</span></div>' +
    '<div style="position:absolute;inset:0;background:' + GR.light + '"></div>' +
    '<div style="position:relative;width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px;height:100%;display:flex;flex-direction:column;justify-content:center"><div style="max-width:560px">' +
    '<nav aria-label="Breadcrumb" style="display:flex;align-items:center;gap:6px;font:400 14px/1.5 ' + FB + ';color:' + C.g600 + '">' + X.a(X.home, 'color:' + C.g600 + ';text-decoration:none;display:inline-flex;align-items:center;min-height:44px', 'Home') + icon('chevron-right', 14, C.g400) + '<span>Services</span>' + icon('chevron-right', 14, C.g400) + '<span style="color:' + C.n950 + '" aria-current="page">Interior Painting</span></nav>' +
    '<h1 style="' + hh(48, C.n950, 8) + '">Interior Painting in Raleigh-Durham, NC</h1>' +
    '<p style="margin:16px 0 0;font:400 19px/1.6 ' + FB + ';color:' + C.g700 + '">Interior painting for walls, ceilings, trim and doors in Raleigh-Durham. Careful prep, clean lines, 2-year workmanship warranty.</p>' +
    '<div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap">' + btn(X, { href: X.est, size: 'lg', label: 'Get a Free Estimate', trail: 'arrow-right', ring: X.ring === 'cta' }) + btn(X, { href: 'tel:+19198057952', size: 'lg', v: 'oDark', label: 'Call (919) 805-7952', lead: 'phone' }) + '</div></div></div></section>' +
    '<section style="height:480px;box-sizing:border-box;padding:72px 0"><div style="width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:7fr 5fr;gap:48px">' +
    '<div><h2 style="' + hh(40, C.n950) + '">Interior Painting Done Right</h2>' +
    '<p style="margin:16px 0 0;font:400 17px/1.65 ' + FB + ';color:' + C.g700 + '">Fresh interior paint changes how a home feels. We prep every surface, protect your floors and furniture and finish with clean, sharp lines.</p>' +
    '<p style="margin:16px 0 0;font:400 17px/1.65 ' + FB + ';color:' + C.g700 + '">We\'re family owned and fully insured, and every project is backed by our 2-year workmanship warranty.</p></div>' +
    '<div style="background:' + C.g50 + ';border:1px solid ' + C.g200 + ';border-radius:16px;padding:24px;align-self:start"><div style="font:700 22px/1.25 ' + FD + ';color:' + C.n950 + '">What\'s included</div><ul style="list-style:none;margin:16px 0 0;padding:0;display:grid;gap:12px">' + inc + '</ul>' +
    '<div style="margin-top:16px"><span style="display:inline-flex;align-items:center;gap:6px;font:500 13px ' + FB + ';color:' + C.warn + '" data-placeholder="true">Scope to be confirmed by the client</span></div></div></div></section>' +
    '<section style="background:' + C.o600 + ';padding:56px 0;height:240px;box-sizing:border-box"><div style="width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px;display:flex;align-items:center;justify-content:space-between;gap:40px"><div style="max-width:760px"><h2 style="' + hh(36, C.n950) + '">Get Your Free Estimate</h2><p style="margin:12px 0 0;font:500 17px/1.6 ' + FB + ';color:' + C.n950 + '">Contact New Valley Painting today to schedule your consultation and start the journey toward a beautifully painted home.</p></div>' + btn(X, { href: X.est, v: 'dark', size: 'lg', label: 'Get a Free Estimate', trail: 'arrow-right' }) + '</div></section>' + dFooter();
}
const dFormHero = '<section style="background:' + C.n950 + ';padding:48px 0"><div style="width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px">' + kicker('Free estimate', true) + '<h1 style="' + hh(44, C.w, 12) + '">Get Your Free Estimate</h1><p style="margin:12px 0 0;font:400 19px/1.6 ' + FB + ';color:' + C.g300 + '">Tell us about your project. It takes about a minute, and there\'s no obligation.</p></div></section>';
function dAside(X) {
  const row = (ic, t, d) => '<div style="display:flex;gap:12px;align-items:flex-start;border-top:1px solid ' + C.g200 + ';padding-top:16px"><div style="width:48px;height:48px;box-sizing:border-box;border-radius:10px;background:' + C.o50 + ';border:1px solid ' + C.o100 + ';display:flex;align-items:center;justify-content:center;flex:none">' + icon(ic, 24, C.o600) + '</div><div><div style="font:700 17px/1.3 ' + FD + ';color:' + C.n950 + '">' + t + '</div><div style="margin-top:4px;font:400 14px/1.5 ' + FB + ';color:' + C.g600 + '">' + d + '</div></div></div>';
  return '<aside style="display:flex;flex-direction:column;gap:20px"><div style="font:700 22px/1.25 ' + FD + ';color:' + C.n950 + '">Prefer to talk?</div>' +
    btn(X, { href: 'tel:+19198057952', size: 'lg', block: true, label: 'Call (919) 805-7952', lead: 'phone' }) +
    '<div style="display:flex;align-items:center;gap:8px;min-height:44px;font:400 15px ' + FB + ';color:' + C.g700 + '">' + icon('mail', 20, C.o700) + 'nvpnting@gmail.com</div>' +
    row('shield-check', 'Fully Insured', 'Protected from job-site accidents') + row('award', '2-Year Workmanship Warranty', 'On every project we complete') + row('users', 'Family Owned &amp; Operated', 'Local to Raleigh-Durham') + '</aside>';
}
function dFormStatic(X, success) {
  const f = (t) => '<div><div style="font:600 14px ' + FB + ';color:' + C.g900 + '">' + t + '</div><div style="margin-top:8px;height:52px;box-sizing:border-box;border:1px solid ' + C.g500 + ';border-radius:10px;background:' + C.w + '"></div></div>';
  const card = success ? '<div style="text-align:center;padding:40px 0"><div style="width:72px;height:72px;border-radius:50%;background:' + C.ok50 + ';margin:0 auto;display:flex;align-items:center;justify-content:center">' + icon('check-circle', 48, C.ok) + '</div><div style="' + hh(28, C.n950, 20) + '">Thanks, Jane! Your request is in.</div><p style="margin:12px auto 0;max-width:460px;font:400 17px/1.65 ' + FB + ';color:' + C.g700 + '">We\'ll reach out by phone soon to schedule your free estimate. Need us sooner? Call (919) 805-7952.</p><div style="margin-top:24px">' + btn(X, { href: X.home, v: 'oDark', label: 'Back to home' }) + '</div></div>' :
    '<div style="font:800 26px/1.25 ' + FD + ';color:' + C.n950 + '">Request your estimate</div><div style="margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:20px">' + f('Full name') + f('Phone') + f('Email (optional)') + f('ZIP code') + '</div><div style="margin-top:20px">' + f('Service needed') + '</div><div style="margin-top:24px">' + btn(X, { href: X.est, size: 'lg', block: true, label: 'Send My Free Estimate Request', trail: 'arrow-right' }) + '</div>';
  return dHeader(X) + dFormHero + '<section style="padding:56px 0"><div style="width:1280px;box-sizing:border-box;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:7fr 5fr;gap:48px"><div style="background:' + C.w + ';border:1px solid ' + C.g200 + ';border-radius:24px;box-shadow:' + SH.md + ';padding:40px">' + card + '</div>' + dAside(X) + '</div></section>';
}

/* ---------- mobile (fluid width) ---------- */
function mHeader(X) {
  return '<header style="height:64px;box-sizing:border-box;background:' + C.n950 + ';border-bottom:1px solid ' + C.n700 + ';display:flex;align-items:center;justify-content:space-between;padding:0 16px">' +
    X.a(X.home, 'display:inline-flex;align-items:center', logo(32), 'aria-label="New Valley Painting, home"') +
    '<div style="display:flex;gap:4px">' + X.a('tel:+19198057952', 'width:44px;height:44px;display:flex;align-items:center;justify-content:center;' + (X.ring === 'call' ? L.RING : ''), icon('phone', 24, C.o500), 'aria-label="Call (919) 805-7952"') +
    '<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center" role="img" aria-label="Menu">' + icon('menu', 24, C.w) + '</div></div></header>';
}
function mBar(X, start) {
  return '<div style="position:absolute;left:0;right:0;bottom:0;height:64px;box-sizing:border-box;padding:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;background:' + C.n950 + ';border-top:1px solid ' + C.n700 + ';box-shadow:' + SH.bar + '">' +
    X.a('tel:+19198057952', 'display:flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;border-radius:10px;background:' + C.n900 + ';border:2px solid ' + C.n700 + ';color:' + C.w + ';font:700 16px/1 ' + FD + ';text-decoration:none;white-space:nowrap;' + (X.ring === 'call' ? L.RING : ''), icon('phone', 20, C.o500) + 'Call Now', 'aria-label="Call New Valley Painting at (919) 805-7952"') +
    X.a(start ? '#estimate-form' : X.est, 'display:flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;border-radius:10px;background:' + C.o600 + ';border:2px solid ' + C.o600 + ';color:' + C.n950 + ';font:700 16px/1 ' + FD + ';text-decoration:none;white-space:nowrap;' + (X.ring === 'cta' ? L.RING : ''), (start ? 'Start Form' : 'Free Estimate') + icon('arrow-right', 18, C.n950)) + '</div>';
}
function mCard(X, s, img) {
  const media = img ? '<img src="' + img + '" alt="" style="display:block;width:96px;height:96px;object-fit:cover;border-radius:10px;flex:none">' :
    '<div style="width:96px;height:96px;border-radius:10px;background:' + C.g100 + ';display:flex;align-items:center;justify-content:center;flex:none">' + icon(s[3], 32, C.o700) + '</div>';
  return '<div style="display:flex;align-items:center;gap:16px;padding:12px;box-sizing:border-box;background:' + C.w + ';border:1px solid ' + C.g200 + ';border-radius:16px;box-shadow:' + SH.sm + '">' + media + '<div style="font:700 18px/1.3 ' + FD + ';color:' + C.n950 + ';min-width:0">' + s[1] + '</div></div>';
}
const mPhone = '(919) 805-7952';
function mHeroBlock(X) {
  return '<section style="position:relative;overflow:hidden;background:' + C.n950 + '"><img src="' + IMG0 + '" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:70% center"><div style="position:absolute;inset:0;background:' + GR.mob + '"></div>' +
    '<div style="position:relative;padding:32px 20px 48px">' + kicker('More than painting · Raleigh-Durham, NC', true) +
    '<h1 style="' + hh(36, C.w, 12).replace('1.12', '1.05') + '">Painting &amp; Remodeling Services in Raleigh-Durham</h1>' +
    '<p style="margin:16px 0 0;font:400 17px/1.6 ' + FB + ';color:' + C.g300 + '">From fresh interior and exterior paint to complete kitchen and bath remodels, we deliver quality, value and attention to detail. Family owned, fully insured and backed by a 2-year workmanship warranty.</p>' +
    '<div style="margin-top:24px;display:flex;flex-direction:column;gap:12px">' + btn(X, { href: X.est, size: 'lg', block: true, label: 'Get a Free Estimate', trail: 'arrow-right' }) + btn(X, { href: 'tel:+19198057952', size: 'lg', block: true, v: 'oLight', label: 'Call ' + mPhone, lead: 'phone' }) + '</div>' +
    '<div style="margin-top:16px;display:flex;align-items:center;gap:8px;font:500 13px/1.45 ' + FB + ';color:' + C.g300 + '">' + icon('shield-check', 16, C.o500) + 'Free, no-obligation estimates · Fully insured</div></div></section>';
}
function mScroll(inner, live) { return '<div style="position:absolute;top:0;left:0;right:0;bottom:64px;overflow-y:' + (live ? 'auto' : 'hidden') + ';background:' + C.w + '">' + inner + '</div>'; }
function mWrap(inner, bar) { return '<div style="position:relative;width:100%;height:100%;background:' + C.w + ';overflow:hidden">' + inner + bar + '</div>'; }
function mHome(X, live) {
  const cards = [[0, null], [1, IMG1], [3, null]].map((p) => mCard(X, SERVICES[p[0]], p[1])).join('');
  return mWrap(mScroll(mHeader(X) + mHeroBlock(X) + '<section style="padding:32px 20px">' + kicker('What we do') + '<h2 style="' + hh(28, C.n950, 12) + '">Painting &amp; Remodeling Services</h2><div style="margin-top:20px;display:grid;gap:12px">' + cards + '</div></section>', live), mBar(X));
}
function mHub(X) {
  const cards = SERVICES.map((s) => mCard(X, s, s[0] === 'exterior-painting' ? IMG1 : null)).join('');
  return mWrap(mScroll(mHeader(X) + '<section style="background:' + C.n950 + ';padding:32px 20px">' + kicker('Services', true) + '<h1 style="' + hh(32, C.w, 12) + '">Painting &amp; Remodeling Services</h1></section><section style="padding:24px 20px;display:grid;gap:12px">' + cards + '</section>'), mBar(X));
}
function mService(X) {
  const inc = ['Walls & ceilings', 'Trim, doors & baseboards', 'Surface prep & patching', 'Color guidance', 'Clean-up every day'].map((t) => '<li style="display:flex;align-items:center;gap:12px;font:400 16px/1.5 ' + FB + ';color:' + C.g700 + '">' + icon('check', 20, C.o600) + t + '</li>').join('');
  return mWrap(mScroll(mHeader(X) + '<div style="position:relative;aspect-ratio:16/9;background:' + C.g100 + ';display:flex;align-items:center;justify-content:center">' + icon('paint-roller', 56, C.o700) + '<span style="position:absolute;top:8px;left:8px">' + ph() + '</span></div>' +
    '<section style="padding:32px 20px"><h1 style="' + hh(32, C.n950) + '">Interior Painting in Raleigh-Durham, NC</h1><p style="margin:16px 0 0;font:400 17px/1.6 ' + FB + ';color:' + C.g700 + '">Interior painting for walls, ceilings, trim and doors in Raleigh-Durham. Careful prep, clean lines, 2-year workmanship warranty.</p>' +
    '<div style="margin-top:24px;display:flex;flex-direction:column;gap:12px">' + btn(X, { href: X.est, size: 'lg', block: true, label: 'Get a Free Estimate', trail: 'arrow-right', ring: X.ring === 'cta' }) + '</div>' +
    '<div style="margin-top:24px;background:' + C.g50 + ';border:1px solid ' + C.g200 + ';border-radius:16px;padding:24px"><div style="font:700 20px/1.25 ' + FD + ';color:' + C.n950 + '">What\'s included</div><ul style="list-style:none;margin:16px 0 0;padding:0;display:grid;gap:12px">' + inc + '</ul></div></section>'), mBar(X));
}
function mFormStatic(X, success) {
  const f = (t) => '<div><div style="font:600 14px ' + FB + ';color:' + C.g900 + '">' + t + '</div><div style="margin-top:8px;height:52px;box-sizing:border-box;border:1px solid ' + C.g500 + ';border-radius:10px;background:' + C.w + '"></div></div>';
  const card = success ? '<div style="text-align:center;padding:16px 0"><div style="width:72px;height:72px;border-radius:50%;background:' + C.ok50 + ';margin:0 auto;display:flex;align-items:center;justify-content:center">' + icon('check-circle', 48, C.ok) + '</div><div style="' + hh(24, C.n950, 20) + '">Thanks, Jane! Your request is in.</div><p style="margin:12px 0 0;font:400 16px/1.65 ' + FB + ';color:' + C.g700 + '">We\'ll reach out by phone soon to schedule your free estimate. Need us sooner? Call (919) 805-7952.</p><div style="margin-top:24px">' + btn(X, { href: X.home, v: 'oDark', label: 'Back to home' }) + '</div></div>' :
    '<div style="font:800 22px/1.25 ' + FD + ';color:' + C.n950 + '">Request your estimate</div><div style="margin-top:20px;display:grid;gap:20px">' + f('Full name') + f('Phone') + f('Email (optional)') + f('ZIP code') + f('Service needed') + '</div><div style="margin-top:24px">' + btn(X, { href: X.est, size: 'lg', block: true, label: 'Send My Free Estimate Request', trail: 'arrow-right' }) + '</div>';
  return mWrap(mScroll(mHeader(X) + '<section style="background:' + C.n950 + ';padding:32px 20px"><h1 style="' + hh(32, C.w) + '">Get Your Free Estimate</h1><p style="margin:12px 0 0;font:400 17px/1.6 ' + FB + ';color:' + C.g300 + '">Tell us about your project. It takes about a minute, and there\'s no obligation.</p></section><section style="padding:24px 16px"><div style="border:1px solid ' + C.g200 + ';border-radius:24px;box-shadow:' + SH.md + ';padding:24px;background:' + C.w + '">' + card + '</div></section>'), mBar(X, true));
}

/* ---------- device chrome (390x844 iOS Safari / 412x915 Android Chrome) ---------- */
function iosDevice(content) {
  return '<div style="position:relative;width:390px;height:844px;overflow:hidden;background:' + C.n950 + '"><div style="position:absolute;top:0;left:0;right:0;height:47px;display:flex;align-items:center;justify-content:space-between;padding:6px 28px 0;box-sizing:border-box;font:600 15px ' + FB + ';color:' + C.w + '"><span>9:41</span><span style="width:26px;height:12px;border:1.5px solid ' + C.w + ';border-radius:4px;display:block"></span></div>' +
    '<div style="position:absolute;top:47px;left:0;right:0;bottom:84px;background:' + C.w + '">' + content + '</div>' +
    '<div style="position:absolute;bottom:0;left:0;right:0;height:84px;box-sizing:border-box;padding-top:10px;display:flex;justify-content:center;background:' + C.g100 + ';border-top:1px solid ' + C.g200 + '"><div style="width:260px;height:36px;box-sizing:border-box;border-radius:12px;background:' + C.w + ';border:1px solid ' + C.g300 + '"></div></div></div>';
}
function androidDevice(content) {
  return '<div style="position:relative;width:412px;height:915px;overflow:hidden;background:' + C.n950 + '"><div style="position:absolute;top:0;left:0;right:0;height:28px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;box-sizing:border-box;font:500 13px ' + FB + ';color:' + C.w + '"><span>9:41</span><span style="width:18px;height:10px;border:1.5px solid ' + C.w + ';border-radius:3px;display:block"></span></div>' +
    '<div style="position:absolute;top:28px;left:0;right:0;height:56px;box-sizing:border-box;padding:8px 12px;display:flex;align-items:center;gap:12px;background:' + C.g100 + ';border-bottom:1px solid ' + C.g200 + '"><div style="flex:1;height:40px;box-sizing:border-box;border-radius:20px;background:' + C.w + ';border:1px solid ' + C.g300 + '"></div><div style="width:6px;height:24px;border-left:4px dotted ' + C.g600 + '"></div></div>' +
    '<div style="position:absolute;top:84px;left:0;right:0;bottom:24px;background:' + C.w + '">' + content + '</div>' +
    '<div style="position:absolute;bottom:0;left:0;right:0;height:24px;background:' + C.g100 + ';display:flex;justify-content:center;align-items:center"><div style="width:120px;height:4px;border-radius:2px;background:' + C.g600 + '"></div></div></div>';
}
module.exports = { logo, hh, dHeader, dFooter, dHome, dHub, dService, dFormStatic, dFormHero, dAside, sCard, mHeader, mBar, mHome, mHub, mService, mFormStatic, mScroll, mWrap, mHeroBlock, iosDevice, androidDevice };
