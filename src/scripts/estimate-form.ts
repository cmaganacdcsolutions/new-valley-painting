/* Free Estimate form (spec §6.7). Client-only: no backend in the prototype (D-13), nothing leaves the browser. */

type FieldId = 'name' | 'phone' | 'email' | 'zip' | 'service';
const SIM_MS = 1200; // --duration-form-submit-sim

const MSG = {
  name: 'Please enter your name.',
  phone: 'Enter a 10-digit phone number.',
  email: 'Enter a valid email, like name@example.com.',
  emailRequired: 'Add your email so we can reply.',
  zip: 'Enter a 5-digit ZIP code.',
  service: 'Choose a service.',
} as const;

const form = document.querySelector<HTMLFormElement>('[data-estimate-form]');
if (form) init(form);

function init(form: HTMLFormElement) {
  const q = <T extends HTMLElement>(sel: string) => form.querySelector<T>(sel);
  const inputs: Record<FieldId, HTMLInputElement | HTMLSelectElement> = {
    name: q<HTMLInputElement>('#f-name')!,
    phone: q<HTMLInputElement>('#f-phone')!,
    email: q<HTMLInputElement>('#f-email')!,
    zip: q<HTMLInputElement>('#f-zip')!,
    service: q<HTMLSelectElement>('#f-service')!,
  };
  const labels: Record<FieldId, string> = { name: 'Full name', phone: 'Phone', email: 'Email', zip: 'ZIP code', service: 'Service needed' };
  const order: FieldId[] = ['name', 'phone', 'email', 'zip', 'service'];
  const details = q<HTMLTextAreaElement>('#f-details')!;
  const counter = q<HTMLElement>('#f-details-count')!;
  const summary = q<HTMLElement>('[data-summary]')!;
  const summaryTitle = q<HTMLElement>('[data-summary-title]')!;
  const summaryList = q<HTMLUListElement>('[data-summary-list]')!;
  const submit = q<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = q<HTMLElement>('[data-submit-label]')!;
  const honeypot = q<HTMLInputElement>('input[name="company"]')!;
  const success = document.querySelector<HTMLElement>('[data-success]')!;
  const successTitle = success.querySelector<HTMLElement>('[data-success-title]')!;
  const successBody = success.querySelector<HTMLElement>('[data-success-body]')!;
  const formWrap = document.querySelector<HTMLElement>('[data-form-wrap]')!;
  const edited = new Set<FieldId>();

  const contactMethod = () => form.querySelector<HTMLInputElement>('input[name="contact"]:checked')?.value ?? 'call';
  const digits = (v: string) => v.replace(/\D/g, '');
  const phoneDigits = (v: string) => { const d = digits(v); return d.length === 11 && d.startsWith('1') ? d.slice(1) : d; };

  /* Returns the error message for a field, or '' when valid */
  const check = (id: FieldId): string => {
    const v = inputs[id].value.trim();
    switch (id) {
      case 'name': return v.length >= 2 && v.length <= 80 ? '' : MSG.name;
      case 'phone': return phoneDigits(v).length === 10 ? '' : MSG.phone;
      case 'email':
        if (!v) return contactMethod() === 'email' ? MSG.emailRequired : '';
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : MSG.email;
      case 'zip': return /^\d{5}$/.test(v) ? '' : MSG.zip;
      case 'service': return v ? '' : MSG.service;
    }
  };

  const setError = (id: FieldId, msg: string) => {
    const el = inputs[id];
    const err = form.querySelector<HTMLElement>(`#f-${id}-err`)!;
    const text = err.querySelector<HTMLElement>('span')!;
    const base = el.dataset.describedby ?? '';
    if (msg) {
      el.setAttribute('aria-invalid', 'true');
      text.textContent = msg;
      err.hidden = false;
      el.setAttribute('aria-describedby', [base, err.id].filter(Boolean).join(' '));
    } else {
      el.removeAttribute('aria-invalid');
      err.hidden = true;
      text.textContent = '';
      if (base) el.setAttribute('aria-describedby', base); else el.removeAttribute('aria-describedby');
    }
  };
  const validate = (id: FieldId) => { const m = check(id); setError(id, m); return m; };

  const formatPhone = () => {
    const d = phoneDigits(inputs.phone.value);
    if (d.length === 10) inputs.phone.value = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };

  order.forEach((id) => {
    const el = inputs[id];
    el.addEventListener('input', () => {
      edited.add(id);
      if (el.getAttribute('aria-invalid') === 'true') validate(id); // clear as soon as it is fixed
    });
    el.addEventListener('change', () => { edited.add(id); validate(id); });
    el.addEventListener('blur', () => {
      if (id === 'phone') formatPhone();
      if (edited.has(id)) validate(id);
    });
  });
  form.querySelectorAll<HTMLInputElement>('input[name="contact"]').forEach((r) =>
    r.addEventListener('change', () => {
      if (inputs.email.getAttribute('aria-invalid') === 'true' || contactMethod() !== 'email') validate('email');
      else if (edited.has('email')) validate('email');
    }));

  /* Counter: live region only at >= 900px */
  const mq = window.matchMedia('(min-width: 900px)');
  const syncLive = () => counter.setAttribute('aria-live', mq.matches ? 'polite' : 'off');
  syncLive();
  mq.addEventListener('change', syncLive);
  const updateCount = () => { counter.textContent = `${details.value.length} / 1000`; };
  details.addEventListener('input', updateCount);
  updateCount();

  const showSummary = (errors: FieldId[]) => {
    summaryTitle.textContent = `Please fix ${errors.length} field${errors.length === 1 ? '' : 's'}:`;
    summaryList.replaceChildren(...errors.map((id) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#f-${id}`;
      a.textContent = `${labels[id]}: ${check(id)}`;
      a.addEventListener('click', (e) => { e.preventDefault(); inputs[id].focus(); });
      li.append(a);
      return li;
    }));
    summary.hidden = false;
    summary.focus();
  };

  const setBusy = (busy: boolean) => {
    submit.setAttribute('aria-disabled', String(busy));
    submit.classList.toggle('is-loading', busy);
    submitLabel.textContent = busy ? 'Sending…' : 'Send My Free Estimate Request';
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea').forEach((f) => { f.disabled = busy; });
    form.setAttribute('aria-busy', String(busy));
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submit.getAttribute('aria-disabled') === 'true') return;
    summary.hidden = true;
    const errors = order.filter((id) => validate(id));
    if (errors.length) { showSummary(errors); return; }

    const first = inputs.name.value.trim().split(/\s+/)[0] ?? '';
    const method = ({ call: 'phone', text: 'text', email: 'email' } as Record<string, string>)[contactMethod()] ?? 'phone';
    setBusy(true);
    window.setTimeout(() => {
      // Honeypot filled: silently "succeed" without doing anything else.
      void honeypot.value;
      successTitle.textContent = `Thanks, ${first}! Your request is in.`;
      successBody.textContent = `We'll reach out by ${method} soon to schedule your free estimate. Need us sooner? Call (919) 805-7952.`;
      formWrap.hidden = true;
      success.hidden = false;
      successTitle.focus();
    }, SIM_MS);
  });
}
