// Typewriter effect for the hero title. Runs once on load.

export function initTypewriter({ delay = 0, onComplete } = {}) {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  const fullText = el.textContent.trim();
  const speed = 65; // ms per character

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onComplete?.();
    return;
  }

  el.textContent = '';

  setTimeout(() => {
    el.classList.add('is-typing');
    let i = 0;

    function type() {
      if (i <= fullText.length) {
        el.textContent = fullText.slice(0, i);
        i += 1;
        setTimeout(type, speed);
      } else {
        el.classList.remove('is-typing');
        onComplete?.();
      }
    }

    type();
  }, delay);
}
