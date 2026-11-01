(() => {
  'use strict';

  // Telegram buttons appear only once a username is set in index.html.
  const tg = (typeof TELEGRAM === 'string' ? TELEGRAM : '').replace(/^@/, '').trim();
  document.querySelectorAll('[data-tg]').forEach((a) => {
    if (!tg) return;
    a.href = `https://t.me/${tg}`;
    a.target = '_blank';
    a.rel = 'noopener';
    a.hidden = false;
  });
  if (tg) document.querySelectorAll('a[href="#contact"].btn').forEach((a) => {
    a.href = `https://t.me/${tg}`;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  document.getElementById('year').textContent = String(new Date().getFullYear());

  // Reveal on scroll.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Project filters.
  const chips = document.querySelectorAll('[data-filter]');
  const cases = document.querySelectorAll('.case');
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => {
      c.classList.toggle('active', c === chip);
      c.setAttribute('aria-selected', String(c === chip));
    });
    cases.forEach((c) => {
      const show = f === 'all' || c.dataset.kind.split(' ').includes(f);
      c.hidden = !show;
      if (show) c.classList.add('in');
    });
  }));

  // Nav background after scrolling.
  const onScroll = () => document.body.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
