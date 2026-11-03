const L = require('./lib.js');
const { C, SH, FD, FB, icon, SERVICES } = L;

const SCRIPT = String.raw`class Component extends DCLogic {
  validate(f) {
    const e = {};
    const n = f.name.trim();
    if (n.length < 2 || n.length > 80) e.name = 'Please enter your name.';
    let d = f.phone.replace(/\D/g, '');
    if (d.length === 11 && d[0] === '1') d = d.slice(1);
    if (d.length !== 10) e.phone = 'Enter a 10-digit phone number.';
    const em = f.email.trim();
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) e.email = 'Enter a valid email, like name@example.com.';
    else if (!em && f.contact === 'Email') e.email = 'Add your email so we can reply.';
    if (!/^\d{5}$/.test(f.zip)) e.zip = 'Enter a 5-digit ZIP code.';
    if (!f.service) e.service = 'Choose a service.';
    return e;
  }
  renderVals() {
    const s = this.state || {};
    const f = { name: s.name || '', phone: s.phone || '', email: s.email || '', zip: s.zip || '', service: s.service || '', details: s.details || '', contact: s.contact || 'Call', time: s.time || 'Any time' };
    const phase = s.phase || 'form';
    const submitted = !!s.submitted;
    const touched = s.touched || {};
    const err = this.validate(f);
    const keys = ['name', 'phone', 'email', 'zip', 'service'];
    const labels = { name: 'Full name', phone: 'Phone', email: 'Email', zip: 'ZIP code', service: 'Service needed' };
    const show = {}; const inv = {}; const e = {}; const summary = [];
    keys.forEach((k) => {
      const on = (submitted || !!touched[k]) && !!err[k];
      show[k] = on; inv[k] = on ? 'true' : 'false'; e[k] = err[k] || '';
      if (submitted && err[k]) summary.push({ label: labels[k], msg: err[k], href: '#f-' + k });
    });
    const sending = phase === 'sending';
    const first = f.name.trim().split(/\s+/)[0];
    const methods = { Call: 'phone', Text: 'text message', Email: 'email' };
    const set = (k) => (ev) => this.setState({ [k]: ev.target.value });
    const touch = (k, extra) => { const t = Object.assign({}, (this.state || {}).touched || {}); t[k] = true; this.setState(Object.assign({ touched: t }, extra || {})); };
    const SAMPLE = { name: 'Jane Doe', phone: '(919) 555-0123', email: 'name@example.com', zip: '27601', service: 'Interior Painting', details: '', contact: 'Call', time: 'Any time' };
    const EMPTY = { name: '', phone: '', email: '', zip: '', service: '', details: '', contact: 'Call', time: 'Any time' };
    const preset = (vals, extra) => () => this.setState(Object.assign({}, vals, { phase: 'form', submitted: false, touched: {} }, extra));
    const count = Object.keys(err).length;
    return {
      f: f, show: show, inv: inv, e: e, summary: summary,
      showForm: phase !== 'success', showSuccess: phase === 'success', showSummary: summary.length > 0,
      errCountLabel: summary.length === 1 ? '1 field' : summary.length + ' fields',
      sending: sending, notSending: !sending, sendingAria: sending ? 'true' : 'false',
      btnLabel: sending ? 'Sending…' : 'Send My Free Estimate Request',
      count: f.details.length,
      r: { call: f.contact === 'Call', text: f.contact === 'Text', email: f.contact === 'Email' },
      nameSuffix: first ? ', ' + first : '', method: methods[f.contact] || 'phone',
      onName: set('name'), onEmail: set('email'), onService: set('service'), onTime: set('time'),
      onPhone: set('phone'),
      onZip: (ev) => this.setState({ zip: ev.target.value.replace(/\D/g, '').slice(0, 5) }),
      onDetails: (ev) => this.setState({ details: ev.target.value.slice(0, 1000) }),
      onCall: () => this.setState({ contact: 'Call' }), onText: () => this.setState({ contact: 'Text' }), onMail: () => this.setState({ contact: 'Email' }),
      bName: () => touch('name'), bEmail: () => touch('email'), bZip: () => touch('zip'), bService: () => touch('service'),
      bPhone: () => { let d = f.phone.replace(/\D/g, ''); if (d.length === 11 && d[0] === '1') d = d.slice(1); touch('phone', d.length === 10 ? { phone: '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6) } : {}); },
      onSubmit: (ev) => {
        if (ev && ev.preventDefault) ev.preventDefault();
        if (sending) return;
        if (count > 0) { this.setState({ submitted: true }); return; }
        this.setState({ phase: 'sending' });
        setTimeout(() => this.setState({ phase: 'success' }), 1200);
      },
      pEmpty: preset(EMPTY, {}),
      pFilled: preset(SAMPLE, {}),
      pErrors: preset({ name: 'J', phone: '919', email: '', zip: '2760', service: '', details: '', contact: 'Call', time: 'Any time' }, { submitted: true }),
      pLoading: preset(SAMPLE, { phase: 'sending' }),
      pSuccess: preset(SAMPLE, { phase: 'success' })
    };
  }
}`;

const IN = 'width:100%;height:52px;box-sizing:border-box;padding:0 16px;font:400 16px/1.4 ' + FB + ';color:' + C.g900 + ';background:' + C.w + ';border:1px solid ' + C.g500 + ';border-radius:10px';
const LBL = 'display:block;margin-bottom:8px;font:600 14px/1.5 ' + FB + ';color:' + C.g900;
const errMsg = (k) => '<sc-if value="{{show.' + k + '}}" hint-placeholder-val="{{ true }}"><div id="e-' + k + '" style="display:flex;align-items:flex-start;gap:6px;margin-top:8px;font:400 14px/1.5 ' + FB + ';color:' + C.err + '">' + icon('alert-circle', 16, C.err) + '<span>{{e.' + k + '}}</span></div></sc-if>';
const opt = ' <span style="font-weight:400;color:' + C.g600 + '">(optional)</span>';
function field(k, label, o) {
  return '<div style="min-width:0"><label for="f-' + k + '" style="' + LBL + '">' + label + (o.opt ? opt : '') + '</label>' + o.control + errMsg(k) + '</div>';
}
const dis = ' disabled="{{sending}}"';
const txt = (k, type, on, bl, extra) => '<input id="f-' + k + '" class="nvp-in" type="' + type + '" value="{{f.' + k + '}}" onChange="{{' + on + '}}"' + (bl ? ' onBlur="{{' + bl + '}}"' : '') + dis + ' aria-invalid="{{inv.' + k + '}}" aria-describedby="e-' + k + '" ' + (extra || '') + ' style="' + IN + '">';
const radio = (id, val, on, key, text) => '<label style="display:flex;align-items:center;gap:12px;min-height:44px;font:400 16px/1.4 ' + FB + ';color:' + C.g900 + ';cursor:pointer"><input type="radio" name="contact" value="' + val + '" checked="{{r.' + key + '}}" onChange="{{' + on + '}}"' + dis + ' style="width:24px;height:24px;margin:0;accent-color:' + C.o600 + '">' + text + '</label>';

function formBound(two) {
  const g = two ? 'display:grid;grid-template-columns:1fr 1fr;gap:20px' : 'display:grid;gap:20px';
  const svcOpts = SERVICES.map((s) => '<option value="' + s[1] + '">' + s[1] + '</option>').join('') + '<option value="Other / not sure">Other / not sure</option>';
  return '<sc-if value="{{showForm}}" hint-placeholder-val="{{ true }}">' +
    '<form id="estimate-form" novalidate onSubmit="{{onSubmit}}" style="display:flex;flex-direction:column;gap:20px">' +
    '<h2 style="margin:0;font:800 ' + (two ? 26 : 22) + 'px/1.25 ' + FD + ';color:' + C.n950 + '">Request your estimate</h2>' +
    '<sc-if value="{{showSummary}}" hint-placeholder-val="{{ false }}"><div role="alert" style="background:' + C.err50 + ';border-left:4px solid ' + C.err + ';border-radius:10px;padding:16px"><div style="font:700 16px/1.4 ' + FD + ';color:' + C.err + '">Please fix {{errCountLabel}}:</div><ul style="margin:8px 0 0;padding-left:20px;font:400 14px/1.7 ' + FB + ';color:' + C.err + '"><sc-for list="{{summary}}" as="item" hint-placeholder-count="2"><li><a href="{{item.href}}" style="color:' + C.err + ';display:inline-block;min-height:24px">{{item.label}}: {{item.msg}}</a></li></sc-for></ul></div></sc-if>' +
    '<div style="' + g + '">' +
    field('name', 'Full name', { control: txt('name', 'text', 'onName', 'bName', 'autocomplete="name"') }) +
    field('phone', 'Phone', { control: txt('phone', 'tel', 'onPhone', 'bPhone', 'autocomplete="tel" inputmode="tel" placeholder="(919) 555-0123"') }) +
    field('email', 'Email', { opt: true, control: txt('email', 'email', 'onEmail', 'bEmail', 'autocomplete="email"') }) +
    field('zip', 'ZIP code', { control: txt('zip', 'text', 'onZip', 'bZip', 'autocomplete="postal-code" inputmode="numeric" maxlength="5" placeholder="27601"') }) + '</div>' +
    field('service', 'Service needed', { control: '<select id="f-service" class="nvp-in" value="{{f.service}}" onChange="{{onService}}" onBlur="{{bService}}"' + dis + ' aria-invalid="{{inv.service}}" aria-describedby="e-service" style="' + IN + '"><option value="" disabled>Select a service</option>' + svcOpts + '</select>' }) +
    '<div style="min-width:0"><label for="f-details" style="' + LBL + '">Project details' + opt + '</label><textarea id="f-details" class="nvp-in" rows="5" maxlength="1000" value="{{f.details}}" onChange="{{onDetails}}"' + dis + ' style="' + IN + ';height:auto;min-height:132px;padding:12px 16px;resize:vertical"></textarea><div style="margin-top:6px;font:500 13px/1.45 ' + FB + ';color:' + C.g600 + '">{{count}} / 1000</div></div>' +
    '<fieldset style="border:0;margin:0;padding:0;min-width:0"><legend style="' + LBL + ';padding:0">Preferred contact</legend><div style="display:flex;flex-wrap:wrap;column-gap:24px">' + radio('c1', 'Call', 'onCall', 'call', 'Call') + radio('c2', 'Text', 'onText', 'text', 'Text') + radio('c3', 'Email', 'onMail', 'email', 'Email') + '</div></fieldset>' +
    '<div style="min-width:0"><label for="f-time" style="' + LBL + '">Best time to reach you' + opt + '</label><select id="f-time" class="nvp-in" value="{{f.time}}" onChange="{{onTime}}"' + dis + ' style="' + IN + '"><option value="Any time">Any time</option><option value="Morning">Morning</option><option value="Afternoon">Afternoon</option><option value="Evening">Evening</option></select></div>' +
    '<button type="submit" class="nvp-btn" aria-disabled="{{sendingAria}}" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:56px;box-sizing:border-box;padding:0 24px;border-radius:10px;background:' + C.o600 + ';border:2px solid ' + C.o600 + ';color:' + C.n950 + ';box-shadow:' + SH.cta + ';font:700 17px/1 ' + FD + ';letter-spacing:0.01em;cursor:pointer"><sc-if value="{{sending}}" hint-placeholder-val="{{ false }}">' + icon('loader', 20, 'currentColor', 'nvp-spin') + '</sc-if><span>{{btnLabel}}</span><sc-if value="{{notSending}}" hint-placeholder-val="{{ true }}">' + icon('arrow-right', 20, C.n950) + '</sc-if></button>' +
    '<p style="margin:0;font:500 13px/1.45 ' + FB + ';color:' + C.g600 + '">By submitting, you agree that New Valley Painting may contact you about your estimate by your preferred method. We never sell your information. See our Privacy Policy.</p>' +
    '<p style="margin:0;font:500 13px/1.45 ' + FB + ';color:' + C.warn + '" data-placeholder="true">Prototype: no data leaves the browser and nothing is stored.</p>' +
    '</form></sc-if>' +
    '<sc-if value="{{showSuccess}}" hint-placeholder-val="{{ false }}"><div role="status" style="text-align:center;padding:24px 0"><div style="width:72px;height:72px;border-radius:50%;background:' + C.ok50 + ';margin:0 auto;display:flex;align-items:center;justify-content:center">' + icon('check-circle', 48, C.ok) + '</div>' +
    '<h2 tabindex="-1" style="margin:20px 0 0;font:800 24px/1.25 ' + FD + ';color:' + C.n950 + '">Thanks{{nameSuffix}}! Your request is in.</h2>' +
    '<p style="margin:12px auto 0;max-width:460px;font:400 16px/1.65 ' + FB + ';color:' + C.g700 + '">We\'ll reach out by {{method}} soon to schedule your free estimate. Need us sooner? Call (919) 805-7952.</p>' +
    '<div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">@@BACK@@<button type="button" onClick="{{pEmpty}}" style="display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;border-radius:10px;background:transparent;border:2px solid ' + C.g500 + ';color:' + C.g700 + ';font:600 15px/1 ' + FD + ';cursor:pointer">Start over</button></div></div></sc-if>';
}
function presetBar(w) {
  const b = (t, fn) => '<button type="button" onClick="{{' + fn + '}}" style="min-height:44px;padding:0 14px;border-radius:999px;background:' + C.w + ';border:1px solid ' + C.g300 + ';color:' + C.n950 + ';font:600 14px/1 ' + FB + ';cursor:pointer">' + t + '</button>';
  return '<div style="width:' + w + 'px;box-sizing:border-box;padding:12px 16px;background:' + C.g100 + ';border-bottom:1px solid ' + C.g300 + ';display:flex;flex-wrap:wrap;align-items:center;gap:8px"><span style="font:600 13px ' + FB + ';color:' + C.g700 + ';margin-right:4px">Preview state</span>' + b('Empty', 'pEmpty') + b('Filled', 'pFilled') + b('Errors', 'pErrors') + b('Loading', 'pLoading') + b('Success', 'pSuccess') + '</div>';
}
module.exports = { SCRIPT, formBound, presetBar };
