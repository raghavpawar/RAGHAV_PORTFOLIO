// Raghav Pawar — Portfolio
// Entry point. Imports feature modules and wires them up on load.

import { initProjectModal } from './modules/project-modal.js';
import { initNavToggle } from './modules/nav-toggle.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initHeroAnimation } from './modules/hero-animation.js';

document.addEventListener('DOMContentLoaded', () => {
  initProjectModal();
  initNavToggle();
  initScrollReveal();
  initHeroAnimation();

  const moreBtn = document.getElementById('view-more-projects');
  const extra = document.getElementById('work-extra');
  moreBtn?.addEventListener('click', () => {
    const isHidden = extra.hasAttribute('hidden');
    if (isHidden) {
      extra.removeAttribute('hidden');
      moreBtn.textContent = 'View fewer projects';
    } else {
      extra.setAttribute('hidden', '');
      moreBtn.textContent = 'View more projects';
    }
  });
});
