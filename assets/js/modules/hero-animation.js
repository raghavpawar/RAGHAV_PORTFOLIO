// Hero entrance sequence, cursor-reactive grid spotlight, and magnetic hover — GSAP-driven.
import { initTypewriter } from './typewriter.js';

export function initHeroAnimation() {
  const hero = document.getElementById('hero');
  const eyebrow = document.querySelector('.hero__eyebrow');
  const linkItems = document.querySelectorAll('.hero__links a');
  const resumeBtn = hero?.querySelector('.btn--accent');
  const titleEl = document.querySelector('[data-typewriter]');

  if (!hero || !titleEl) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || typeof gsap === 'undefined') {
    initTypewriter();
    return;
  }

  // --- Staggered entrance ---
  const entranceTargets = [eyebrow, ...linkItems, resumeBtn].filter(Boolean);
  gsap.set(entranceTargets, { opacity: 0, y: 12 });

  gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

  const titleLength = titleEl.textContent.trim().length;
  const typeSpeed = 65;
  const typingDuration = titleLength * typeSpeed;

  initTypewriter({
    delay: 350,
    onComplete: () => {
      gsap.to([...linkItems, resumeBtn].filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      });
    },
  });

  // --- Cursor-reactive grid spotlight ---
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    gsap.to(hero, {
      '--spotlight-x': `${xPct}%`,
      '--spotlight-y': `${yPct}%`,
      duration: 0.6,
      ease: 'power2.out',
    });
  });

  hero.addEventListener('mouseleave', () => {
    gsap.to(hero, {
      '--spotlight-x': '50%',
      '--spotlight-y': '50%',
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // --- Magnetic hover on links + resume button ---
  const magneticTargets = [...linkItems, resumeBtn].filter(Boolean);
  magneticTargets.forEach((el) => {
    const strength = 10;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: (relX / rect.width) * strength,
        y: (relY / rect.height) * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}
