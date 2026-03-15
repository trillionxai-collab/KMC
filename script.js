const revealElements = document.querySelectorAll('.reveal');
const nav = document.getElementById('main-nav');
const menuToggle = document.getElementById('menu-toggle');
const orbs = document.querySelectorAll('.bg-orb');
const progressBar = document.getElementById('scroll-progress');
const parallaxMedia = document.querySelectorAll('.parallax-media');
const canUseParallax = window.matchMedia('(min-width: 981px)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Add slight motion depth to background elements as the user scrolls.
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min((y / docHeight) * 100, 100) : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  orbs.forEach((orb, index) => {
    const speed = index === 0 ? 0.08 : -0.06;
    orb.style.transform = `translateY(${y * speed}px)`;
  });

  if (canUseParallax) {
    parallaxMedia.forEach((media, index) => {
      const speed = 0.03 + (index % 3) * 0.01;
      media.style.transform = `translateY(${y * speed}px)`;
    });
  } else {
    parallaxMedia.forEach((media) => {
      media.style.transform = 'none';
    });
  }
});

window.dispatchEvent(new Event('scroll'));
