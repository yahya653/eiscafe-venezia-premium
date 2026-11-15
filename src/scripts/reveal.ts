// GSAP ScrollTrigger Reveal Animations - Premium Edition
// Runs on client-side after Astro hydration

export function initRevealAnimations() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const initGSAP = async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Default easing
    const ease = 'expo.out';
    const duration = 1.0;

    // --- 1. Basic Reveal (data-reveal) ---
    const revealElements = document.querySelectorAll('[data-reveal]:not([data-gsap])');

    revealElements.forEach((el, index) => {
      const delay = parseFloat(el.style.transitionDelay) || index * 0.05;
      
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay: delay * 0.5,
          ease,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // --- 2. GSAP-Enhanced Reveals (data-gsap) ---
    // Fade Up
    document.querySelectorAll('[data-gsap="fadeUp"]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Fade In
    document.querySelectorAll('[data-gsap="fadeIn"]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.0,
          ease,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Scale In
    document.querySelectorAll('[data-gsap="scaleIn"]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Slide Left/Right
    document.querySelectorAll('[data-gsap="slideLeft"]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -80 },
        { opacity: 1, x: 0, duration: 1.2, ease, scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    });
    document.querySelectorAll('[data-gsap="slideRight"]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 1.2, ease, scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    });

    // --- 3. Counter Animation (data-gsap="counter") ---
    document.querySelectorAll('[data-gsap="counter"]').forEach((el) => {
      const target = parseFloat(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      const decimals = (target % 1 !== 0) ? 1 : 0;
      
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2.0,
          ease: 'expo.out',
          snap: { textContent: decimals === 0 ? 1 : 0.1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function() {
            const val = this.targets()[0].textContent;
            el.textContent = (decimals === 0 ? Math.ceil(val) : val.toFixed(1)) + suffix;
          },
        }
      );
    });

    // --- 4. Stagger Children ---
    document.querySelectorAll('[data-gsap-stagger]').forEach((container) => {
      const children = container.querySelectorAll('[data-gsap-child]');
      const stagger = parseFloat(container.dataset.gsapStagger) || 0.1;
      
      gsap.fromTo(children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // --- 5. Text Split Animation ---
    document.querySelectorAll('[data-gsap-text]').forEach((el) => {
      const split = new SplitText(el, { type: 'words,chars', wordsClass: 'split-word', charsClass: 'split-char' });
      
      gsap.fromTo(split.chars,
        { opacity: 0, y: 30, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // --- 6. Parallax Hero ---
    const heroSection = document.querySelector('section:first-of-type');
    if (heroSection) {
      gsap.to(heroSection, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // --- 7. Flavor Card Hover Lift ---
    const flavorCards = document.querySelectorAll('[data-flavor-id]');
    flavorCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -12,
          boxShadow: '0 32px 64px -16px rgba(0,0,0,0.18)',
          duration: 0.5,
          ease: 'expo.out',
        });
        
        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'expo.out' });
        }
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 4px 24px -4px rgba(0,0,0,0.1)',
          duration: 0.5,
          ease: 'expo.out',
        });
        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, { scale: 1, duration: 0.6, ease: 'expo.out' });
        }
      });
    });

    // --- 8. Scroll Progress Indicator ---
    const createScrollProgress = () => {
      const progressBar = document.createElement('div');
      progressBar.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #E86C4A, #FF9F7A, #D4A843);
        z-index: 9999;
        pointer-events: none;
        box-shadow: 0 0 20px #E86C4A;
      `;
      document.body.appendChild(progressBar);
      
      gsap.to(progressBar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.1 }
      });
    };
    // Uncomment to enable: createScrollProgress();

    // --- 9. Magnetic Buttons ---
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const strength = parseFloat(btn.dataset.magnetic) || 0.3;
      
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      });
    });

    // --- 10. Image Reveal on Scroll ---
    document.querySelectorAll('img[data-gsap-reveal]').forEach((img) => {
      gsap.fromTo(img,
        { opacity: 0, scale: 1.1, filter: 'blur(10px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease,
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // --- 11. Section Divider Animation ---
    document.querySelectorAll('hr[data-gsap-divider], .divider[data-gsap-divider]').forEach((divider) => {
      gsap.fromTo(divider,
        { scaleX: 0, transformOrigin: 'center center' },
        {
          scaleX: 1,
          duration: 1.0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: divider,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // --- 12. Floating Animation for Decorative Elements ---
    document.querySelectorAll('[data-gsap-float]').forEach((el) => {
      const intensity = parseFloat(el.dataset.gsapFloat) || 1;
      gsap.to(el, {
        y: -10 * intensity,
        x: 5 * intensity,
        rotation: 2 * intensity,
        duration: 3 + intensity,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    // --- 13. Cursor Follower (Desktop only) ---
    if (!window.matchMedia('(pointer: coarse)').matches) {
      const cursor = document.createElement('div');
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #E86C4A;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s, border-color 0.2s;
        mix-blend-mode: difference;
      `;
      document.body.appendChild(cursor);
      
      let mouseX = 0, mouseY = 0;
      let cursorX = 0, cursorY = 0;
      
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      
      function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();
      
      // Hover effects
      document.querySelectorAll('a, button, [data-flavor-id], [data-magnetic]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.style.width = '50px';
          cursor.style.height = '50px';
          cursor.style.borderColor = '#D4A843';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.width = '20px';
          cursor.style.height = '20px';
          cursor.style.borderColor = '#E86C4A';
        });
      });
    }

    // --- 14. Refresh on Image Load ---
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