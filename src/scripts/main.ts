/* Behaviour: header scroll state, dropdowns, drawer, before/after slider input. Motion effects (§9) come later. */

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
