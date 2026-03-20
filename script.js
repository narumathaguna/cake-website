// =============================================
//  DIVINE DELIGHTS — script.js
//  Homemade Cakes & Cookies, Madurai
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR: scroll shadow ──────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  // ── MOBILE MENU ───────────────────────────
  const hbg     = document.getElementById('hbg');
  const mobMenu = document.getElementById('mob-menu');

  hbg.addEventListener('click', () => {
    mobMenu.classList.toggle('open');
  });

  window.closeMob = function () {
    mobMenu.classList.remove('open');
  };

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!hbg.contains(e.target) && !mobMenu.contains(e.target)) {
      mobMenu.classList.remove('open');
    }
  });

  // ── PRODUCT FILTER TABS ───────────────────
  window.filterProducts = function (cat, btn) {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');

    document.querySelectorAll('.pcard').forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.style.display = 'block';
        // Re-trigger the fade-up animation
        card.style.animationPlayState = 'paused';
        void card.offsetWidth; // reflow
        card.style.animationPlayState = 'running';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // ── ADD TO CART TOAST ─────────────────────
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer = null;

  window.addToCart = function (name) {
    toastMsg.textContent = name + ' added!';
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  };

  // ── ORDER FORM → WHATSAPP ─────────────────
  window.submitOrder = function () {
    const name    = document.getElementById('f-name').value.trim();
    const phone   = document.getElementById('f-phone').value.trim();
    const product = document.getElementById('f-product').value;
    const address = document.getElementById('f-address').value.trim();
    const message = document.getElementById('f-message').value.trim();

    if (!name || !phone || !product) {
      alert('⚠️ Please fill in your name, phone number and select a product!');
      return;
    }

    const wa = `Hi Divine Delights! 🍰

Name: ${name}
Phone: ${phone}
${address ? 'Address: ' + address : ''}
Product: ${product}
${message ? 'Notes: ' + message : ''}

I'd like to place an order. Please confirm availability! 🙏`;

    // ⚠️  Replace 919999999999 with the real WhatsApp number (country code + number, no spaces/+)
    window.open(`https://wa.me/917539927345?text=${encodeURIComponent(wa)}`, '_blank');
  };

  // ── INTERSECTION OBSERVER: card fade-in ───
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.pcard').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.07}s`;
    card.style.animationPlayState = 'paused';
    io.observe(card);
  });

  // ── SMOOTH ACTIVE NAV HIGHLIGHT ───────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active-nav',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));

});
