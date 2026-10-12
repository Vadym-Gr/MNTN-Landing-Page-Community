const sectionLinks = Array.from(
  document.querySelectorAll<HTMLAnchorElement>('.section-nav-link'),
);
const sectionTargets = sectionLinks.map(link =>
  document.getElementById(link.hash.slice(1)),
);

if (sectionLinks.length && sectionTargets.every(target => target !== null)) {
  // An anchor can receive keyboard focus without entering the normal Tab order.
  sectionTargets.forEach(target => target.setAttribute('tabindex', '-1'));

  const updateCurrentSection = () => {
    const readingLine = window.innerHeight * 0.35;
    let current = 0;

    sectionTargets.forEach((target, index) => {
      if (target.getBoundingClientRect().top <= readingLine) current = index;
    });

    sectionLinks.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  let scheduled = false;
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateCurrentSection();
    });
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  updateCurrentSection();
}
