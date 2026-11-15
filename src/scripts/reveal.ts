// GSAP ScrollTrigger Reveal Animations
// This runs on client-side after Astro hydration

export function initRevealAnimations() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Wait for GSAP to be available
  const initGSAP = async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Reveal elements with data-reveal attribute
    const revealElements = document.querySelectorAll('[data-reveal]');

    revealElements.forEach((el, index) => {
      const delay = parseFloat(el.style.transitionDelay) || index * 0.1;
      const stagger = el.classList.contains('stagger-1') ? 0.1 :
                      el.classList.contains('stagger-2') ? 0.2 :
                      el.classList.contains('stagger-3') ? 0.3 :
                      el.classList.contains('stagger-4') ? 0.4 :
                      el.classList.contains('stagger-5') ? 0.5 :
                      el.classList.contains('stagger-6') ? 0.6 : 0;

      gsap.fromTo(el,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay + stagger,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            once: false,
          },
        }
      );
    });

    // Hero stats counter animation
    const statNumbers = document.querySelectorAll('.font-display.text-fluid-3xl');
    statNumbers.forEach(el => {
      const text = el.textContent?.trim();
      const match = text?.match(/^(\d+)(\+?)$/);
      if (match) {
        const target = parseInt(match[1], 10);
        const suffix = match[2];
        gsap.fromTo(el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'expo.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
              el.textContent = Math.ceil(this.targets()[0].textContent) + suffix;
            },
          }
        );
      }
    });

    // Parallax effect for hero background
    const heroSection = document.querySelector('section:first-of-type');
    if (heroSection) {
      gsap.to(heroSection, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Floating animation for flavor cards on hover
    const flavorCards = document.querySelectorAll('[data-flavor-id]');
    flavorCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          boxShadow: '0 24px 48px -12px rgba(0,0,0,0.15)',
          duration: 0.4,
          ease: 'expo.out',
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 4px 24px -4px rgba(0,0,0,0.1)',
          duration: 0.4,
          ease: 'expo.out',
        });
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const lenis = (window as any).__lenis;
          if (lenis) {
            lenis.scrollTo(target, { offset: -80 });
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          target.focus({ preventScroll: true });
        }
      });
    });

    // Refresh ScrollTrigger on images load
    document.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', () => ScrollTrigger.refresh());
      }
    });

    // Initial refresh
    ScrollTrigger.refresh();
  };

  initGSAP().catch(console.error);
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRevealAnimations);
  } else {
    initRevealAnimations();
  }
}