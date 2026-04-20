/* ================================================================
   PAGINA-VENDAS · Desafio de 5 Dias
   Interações vanilla JS
   ================================================================ */

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ── 1. Reveal on scroll (todos os [data-reveal]) ──────────── */
  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(el => {
    const delay = el.dataset.revealDelay;
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 2. Count-up nos números (.count[data-target]) ─────────── */
  const counters = document.querySelectorAll('.count[data-target]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => countObserver.observe(c));


  /* ── 3. Mouse parallax nos cards da Dobra 3 ────────────────── */
  const painThoughts = document.getElementById('pain-thoughts');
  if (painThoughts && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    const thoughts = painThoughts.querySelectorAll('.thought');
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId = null;

    painThoughts.addEventListener('mousemove', (e) => {
      const rect = painThoughts.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
      if (!rafId) rafId = requestAnimationFrame(loop);
    });
    painThoughts.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      thoughts.forEach((el, i) => {
        const depth = (i % 2 === 0) ? 1 : -1;
        el.style.setProperty('--tx', `${currentX * depth * 0.5}px`);
        el.style.setProperty('--ty', `${currentY * depth * 0.5}px`);
      });
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    };
  }


  /* ── 4. Cursor spotlight na Dobra 7 ────────────────────────── */
  const audience = document.getElementById('para-quem-e');
  if (audience && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    audience.addEventListener('mousemove', (e) => {
      const rect = audience.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      audience.style.setProperty('--cx', `${x}%`);
      audience.style.setProperty('--cy', `${y}%`);
      audience.classList.add('has-cursor');
    });
    audience.addEventListener('mouseleave', () => {
      audience.classList.remove('has-cursor');
    });
  }


  /* ── 5. Timeline + ativação dos passos (Dobra 5) ───────────── */
  const stepsList = document.querySelector('.steps__list');
  const steps = document.querySelectorAll('.step');

  if (stepsList) {
    const stepsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        stepsList.classList.add('is-drawn');
        stepsObserver.disconnect();
      }
    }, { threshold: 0.1 });
    stepsObserver.observe(stepsList);
  }

  const stepActivator = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  steps.forEach(step => stepActivator.observe(step));


  /* ── 6. Ledger strike-through + stamp (Dobra 8) ────────────── */
  const strikeEl = document.querySelector('[data-strike]');
  const ledgerTotal = document.querySelector('.ledger__total');

  if (strikeEl) {
    const strikeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => strikeEl.classList.add('is-struck'), 400);
          strikeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    strikeObserver.observe(strikeEl);
  }

  if (ledgerTotal) {
    const totalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ledgerTotal.classList.add('is-visible');
          totalObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    totalObserver.observe(ledgerTotal);
  }


  /* ── 7. FAQ accordion (abrir 1 por vez) (Dobra 13) ─────────── */
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', (e) => {
      if (!item.open) return;
      faqItems.forEach(other => {
        if (other !== item && other.open) other.open = false;
      });
    });
  });


  /* ── 8. Smooth-scroll customizado para âncoras ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── 9. Footer divider reveal ──────────────────────────────── */
  const footer = document.querySelector('.footer');
  if (footer) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add('is-visible');
          footerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    footerObserver.observe(footer);
  }
})();
