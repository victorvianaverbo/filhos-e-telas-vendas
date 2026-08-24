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


  /* ── 5. Ativação dos passos (Dobra 5) ───────────── */
  const steps = document.querySelectorAll('.step');

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


  /* ── 9. Tracking (Meta Pixel) ─────────────────────────────── */
  const PRODUTO = { content_name: 'Desafio de 5 Dias - Meus Filhos Sem Tela', content_ids: ['N105757944R'], content_type: 'product', value: 67, currency: 'BRL' };

  const track = (evento, params) => {
    if (typeof window.fbq === 'function') window.fbq('track', evento, Object.assign({}, PRODUTO, params || {}));
  };

  /* ViewContent uma vez, quando a oferta entra na tela */
  const ofertaEl = document.getElementById('oferta');
  if (ofertaEl) {
    const ofertaObserver = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        track('ViewContent');
        ofertaObserver.disconnect();
      }
    }, { threshold: 0.3 });
    ofertaObserver.observe(ofertaEl);
  }


  /* ── 10. Captura de lead + redirect Hotmart ───────────────── */
  const HOTMART_URL = 'https://pay.hotmart.com/N105757944R?off=tepc96x5';

  /* URL /exec do Apps Script (leads-planilha.gs) publicado como app da web,
     acesso "Qualquer pessoa". Vazio = não grava, só redireciona. */
  const WEBHOOK_PLANILHA = '';

  const modal = document.getElementById('lead-modal');
  const form = document.getElementById('lead-form');

  const openModal = (origem) => {
    if (!modal) return;
    modal.dataset.origem = origem || 'desconhecido';
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lead-modal-open');
    setTimeout(() => form?.querySelector('input[name="nome"]')?.focus(), 100);
  };
  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lead-modal-open');
  };

  /* Sem JS os CTAs são links diretos para a Hotmart; com JS abrem o popup */
  document.querySelectorAll('[data-checkout-cta]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      track('InitiateCheckout', { origem: el.dataset.ctaOrigem || '' });
      openModal(el.dataset.ctaOrigem);
    });
  });

  document.querySelectorAll('[data-lead-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') closeModal();
  });

  const maskPhone = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : '';
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const phoneInput = form?.querySelector('input[name="telefone"]');
  phoneInput?.addEventListener('input', (e) => {
    e.target.value = maskPhone(e.target.value);
  });

  /* UTMs + fbclid: lê da URL e guarda na sessão, para sobreviver a
     recarregamento sem query string */
  const TRACK_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
  const getTracking = () => {
    const p = new URLSearchParams(window.location.search);
    let saved = {};
    try { saved = JSON.parse(sessionStorage.getItem('lead_tracking') || '{}'); } catch (_) {}
    const out = {};
    TRACK_KEYS.forEach((k) => { out[k] = p.get(k) || saved[k] || ''; });
    try { sessionStorage.setItem('lead_tracking', JSON.stringify(out)); } catch (_) {}
    return out;
  };
  const tracking = getTracking();

  /* Pré-preenche o checkout (parâmetros aceitos pela Hotmart: name,
     phoneac, phonenumber) e repassa os UTMs para o relatório de vendas */
  const buildCheckoutURL = (nome, phoneDigits) => {
    const url = new URL(HOTMART_URL);
    url.searchParams.set('name', nome);
    url.searchParams.set('phoneac', phoneDigits.slice(0, 2));
    url.searchParams.set('phonenumber', phoneDigits.slice(2));
    TRACK_KEYS.forEach((k) => { if (tracking[k] && k !== 'fbclid') url.searchParams.set(k, tracking[k]); });
    return url.toString();
  };

  /* text/plain evita o preflight de CORS (o Apps Script não responde a ele);
     sendBeacon entrega mesmo com a página saindo para o checkout */
  const saveLead = (lead) => {
    if (!WEBHOOK_PLANILHA) return;
    const corpo = JSON.stringify(lead);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(WEBHOOK_PLANILHA, new Blob([corpo], { type: 'text/plain' }))) return;
    } catch (_) { /* segue para o fetch */ }
    if (window.fetch) {
      fetch(WEBHOOK_PLANILHA, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: corpo,
      }).catch(() => {});
    }
  };

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.elements.nome.value.trim().replace(/\s+/g, ' ');
    const telefone = form.elements.telefone.value.trim();
    const phoneDigits = telefone.replace(/\D/g, '');

    let invalid = false;
    if (nome.length < 2) {
      form.elements.nome.setAttribute('aria-invalid', 'true');
      invalid = true;
    } else form.elements.nome.removeAttribute('aria-invalid');

    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      form.elements.telefone.setAttribute('aria-invalid', 'true');
      invalid = true;
    } else form.elements.telefone.removeAttribute('aria-invalid');

    if (invalid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const submitBtn = form.querySelector('.lead-form__submit');
    const textSpan = form.querySelector('.lead-form__submit-text');
    const originalText = textSpan.textContent;
    submitBtn.disabled = true;
    textSpan.textContent = 'Redirecionando...';

    const origem = modal?.dataset.origem || '';

    track('Lead', { origem });

    saveLead(Object.assign({
      nome,
      telefone,
      telefone_digitos: phoneDigits,
      origem,
      pagina: 'vendas',
      url: window.location.href,
      referencia: document.referrer || '',
      enviado_em: new Date().toISOString(),
    }, tracking));

    window.location.href = buildCheckoutURL(nome, phoneDigits);
    setTimeout(() => {
      submitBtn.disabled = false;
      textSpan.textContent = originalText;
    }, 4000);
  });
})();
