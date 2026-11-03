/* Behaviour: header, dropdowns, drawer, slider input, plus motion (reveals, count-up, slider peek; spec 9). */

const root = document.documentElement;
const FOCUSABLE = 'a[href], button:not([disabled]), summary, input, [tabindex]:not([tabindex="-1"])';

/* Header shadow once scrolled > 8px */
const header = document.querySelector<HTMLElement>('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Dropdowns */
const dropdowns = Array.from(document.querySelectorAll<HTMLElement>('[data-dd]'));
const setDropdown = (dd: HTMLElement, open: boolean) => {
  dd.classList.toggle('is-open', open);
  dd.querySelector('button')?.setAttribute('aria-expanded', String(open));
};
const closeDropdowns = (except?: HTMLElement) => dropdowns.forEach((d) => d !== except && setDropdown(d, false));
const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
dropdowns.forEach((dd) => {
  const trigger = dd.querySelector<HTMLButtonElement>('button');
  if (!trigger) return;
  let timer: number | undefined;
  trigger.addEventListener('click', () => {
    const open = !dd.classList.contains('is-open');
    closeDropdowns(dd);
    setDropdown(dd, open);
  });
  dd.addEventListener('mouseenter', () => {
    if (!hoverCapable.matches) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => { closeDropdowns(dd); setDropdown(dd, true); }, 150);
  });
  dd.addEventListener('mouseleave', () => {
    if (!hoverCapable.matches) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => setDropdown(dd, false), 150);
  });
  dd.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dd.classList.contains('is-open')) {
      setDropdown(dd, false);
      trigger.focus();
    }
  });
});
document.addEventListener('click', (e) => {
  if (!(e.target instanceof Node)) return;
  dropdowns.forEach((d) => { if (!d.contains(e.target as Node)) setDropdown(d, false); });
});

/* Drawer */
const drawer = document.querySelector<HTMLElement>('[data-drawer]');
const menuBtn = document.getElementById('menu-btn');
if (drawer && menuBtn) {
  menuBtn.setAttribute('role', 'button');
  const setOpen = (open: boolean) => {
    drawer.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-locked', open);
    if (open) {
      root.setAttribute('data-drawer-open', '');
      drawer.querySelector<HTMLElement>('[data-drawer-first]')?.focus();
    } else {
      root.removeAttribute('data-drawer-open');
      menuBtn.focus();
    }
  };
  menuBtn.addEventListener('click', (e) => { e.preventDefault(); setOpen(true); });
  drawer.querySelectorAll('[data-drawer-close]').forEach((el) => el.addEventListener('click', () => setOpen(false)));
  drawer.querySelectorAll('a[href]').forEach((a) => a.addEventListener('click', () => {
    drawer.classList.remove('is-open');
    root.classList.remove('is-locked');
    root.removeAttribute('data-drawer-open');
  }));
  document.addEventListener('keydown', (e) => {
    if (!drawer.classList.contains('is-open')) return;
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key !== 'Tab') return;
    const items = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && drawer.classList.contains('is-open')) setOpen(false);
  });
}

/* Before/after slider: native range input drives --pos */
document.querySelectorAll<HTMLElement>('[data-ba-slider]').forEach((slider) => {
  const input = slider.querySelector<HTMLInputElement>('input[type="range"]');
  if (!input) return;
  const update = () => {
    const n = Number(input.value);
    slider.style.setProperty('--pos', `${n}%`);
    input.setAttribute('aria-valuetext', `${n}% before`);
    slider.classList.toggle('is-near-left', n < 12);
    slider.classList.toggle('is-near-right', n > 88);
  };
  input.addEventListener('input', update);
  update();
});

/* ---- Motion (§9): reveals, count-up, slider peek. Skipped entirely under reduced motion. ---- */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cssMs = (name: string, fallback: number) => parseFloat(getComputedStyle(root).getPropertyValue(name)) || fallback;
const seen = (els: Element[], threshold: number, margin: string, cb: (el: Element) => void) => {
  if (!('IntersectionObserver' in window)) { els.forEach(cb); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); }
  }), { threshold, rootMargin: margin });
  els.forEach((el) => io.observe(el));
};

if (reduce) {
  root.classList.add('reduce-motion');
  document.querySelectorAll('[data-reveal],[data-reveal-group]').forEach((el) => el.classList.add('is-in'));
} else {
  /* 9.2 scroll reveals; group children get --i (capped) for the stagger */
  const max = cssMs('--stagger-max-items', 6);
  document.querySelectorAll('[data-reveal-group]').forEach((g) =>
    Array.from(g.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(Math.min(i, max - 1)))));
  seen(Array.from(document.querySelectorAll('[data-reveal],[data-reveal-group]')), 0.15, '0px 0px -10% 0px', (el) => el.classList.add('is-in'));

  /* 9.3 count-up in the aria-hidden visual span; sr-only span keeps the real value */
  const stats = document.querySelector('[data-stats]');
  if (stats) seen([stats], 0.5, '0px', () => {
    const dur = cssMs('--duration-count-up', 1600);
    const items = Array.from(stats.querySelectorAll<HTMLElement>('[data-count]')).map((el) => {
      const target = el.dataset.count || '0';
      return { vis: el.querySelector<HTMLElement>('[data-count-vis]'), to: parseFloat(target), dec: (target.split('.')[1] || '').length };
    });
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      items.forEach((i) => { if (i.vis) i.vis.textContent = (i.to * e).toFixed(i.dec); });
      if (p < 1) requestAnimationFrame(tick);
    };
    items.forEach((i) => { if (i.vis) i.vis.textContent = (0).toFixed(i.dec); });
    requestAnimationFrame(tick);
  });

  /* 9.4 slider peek: --pos 50 > 72 > 28 > 50, cancelled by any input */
  document.querySelectorAll<HTMLElement>('[data-ba-slider]').forEach((slider) => seen([slider], 0.6, '0px', () => {
    const dur = cssMs('--duration-slider-peek', 1800);
    let raf = 0;
    const stop = () => { cancelAnimationFrame(raf); ['pointerdown', 'keydown', 'input'].forEach((t) => slider.removeEventListener(t, stop)); };
    ['pointerdown', 'keydown', 'input'].forEach((t) => slider.addEventListener(t, stop, { passive: true }));
    const t0 = performance.now();
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const pts = [50, 72, 28, 50];
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1) * 3;
      const k = Math.min(Math.floor(p), 2);
      const v = pts[k] + (pts[k + 1] - pts[k]) * ease(p - k);
      slider.style.setProperty('--pos', `${v}%`);
      if (p < 3) raf = requestAnimationFrame(tick); else slider.style.setProperty('--pos', '50%');
    };
    raf = requestAnimationFrame(tick);
  }));
}
