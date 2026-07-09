// Mobile hamburger nav toggle.

export function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');
  if (!toggle || !mobileNav) return;

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('data-open', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.setAttribute('data-open', String(!isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}
