// ============================================
// Cooper Yang Portfolio — Terminal Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ---- Mobile Navigation ----
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', function() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', function() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (overlay) {
    overlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Colorful Noise Background ----
  function createNoiseCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(256, 256);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Mostly dark with occasional colorful pixels
      const rand = Math.random();
      if (rand > 0.985) {
        // Bright colored noise pixel
        const hue = Math.random();
        if (hue < 0.3) {
          // Green family
          data[i] = 0;
          data[i+1] = Math.floor(Math.random() * 180 + 75);
          data[i+2] = Math.floor(Math.random() * 40);
        } else if (hue < 0.5) {
          // Cyan
          data[i] = 0;
          data[i+1] = Math.floor(Math.random() * 120 + 100);
          data[i+2] = Math.floor(Math.random() * 180 + 75);
        } else if (hue < 0.7) {
          // Magenta / pink
          data[i] = Math.floor(Math.random() * 180 + 75);
          data[i+1] = 0;
          data[i+2] = Math.floor(Math.random() * 120 + 60);
        } else if (hue < 0.85) {
          // Amber / yellow
          data[i] = Math.floor(Math.random() * 180 + 75);
          data[i+1] = Math.floor(Math.random() * 120 + 80);
          data[i+2] = 0;
        } else {
          // Blue / purple
          data[i] = Math.floor(Math.random() * 60 + 30);
          data[i+1] = Math.floor(Math.random() * 40);
          data[i+2] = Math.floor(Math.random() * 180 + 75);
        }
        data[i+3] = Math.floor(Math.random() * 80 + 30);
      } else if (rand > 0.96) {
        // Dim green speck
        data[i] = 0;
        data[i+1] = Math.floor(Math.random() * 60 + 10);
        data[i+2] = 0;
        data[i+3] = Math.floor(Math.random() * 40 + 10);
      } else {
        // Transparent
        data[i] = 0;
        data[i+1] = 0;
        data[i+2] = 0;
        data[i+3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  }

  // Apply noise overlay
  const noiseOverlay = document.createElement('div');
  noiseOverlay.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.5;
    background-image: url(${createNoiseCanvas()});
    background-repeat: repeat;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(noiseOverlay);

  // Regenerate noise periodically for subtle animation (pauses when tab hidden)
  setInterval(function() {
    if (!document.hidden) {
      noiseOverlay.style.backgroundImage = `url(${createNoiseCanvas()})`;
    }
  }, 600);

  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll('.content-row, .project-card, .about-content, .next-project');

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Stagger for grid cards
        const delay = el.classList.contains('project-card')
          ? Array.from(el.parentNode.children).indexOf(el) * 100
          : 0;
        setTimeout(function() {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  revealElements.forEach(function(el) {
    el.classList.add('reveal-ready');
    observer.observe(el);
  });

  // ---- Code Block Expand/Collapse ----
  document.querySelectorAll('.code-expand-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var block = btn.closest('.code-block');
      if (block.classList.contains('collapsed')) {
        block.classList.remove('collapsed');
        btn.textContent = '// collapse';
      } else {
        block.classList.add('collapsed');
        btn.textContent = '// expand full source';
      }
    });
  });

  // ---- Image Lightbox ----
  const images = document.querySelectorAll('.content-row img, .image-gallery img, .project-content .media img');

  if (images.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Image viewer');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML = '<div class="lb-bg"></div><button class="lb-close" aria-label="Close image viewer">&times;</button><img class="lb-img" alt="" />';
    document.body.appendChild(lightbox);

    const style = document.createElement('style');
    style.textContent = `
      #lightbox {
        display: none; position: fixed; inset: 0; z-index: 10000;
        align-items: center; justify-content: center; cursor: zoom-out;
      }
      #lightbox.active { display: flex; }
      .lb-bg {
        position: absolute; inset: 0;
        background: rgba(0, 0, 0, 0.94);
      }
      .lb-close {
        position: absolute; top: 16px; right: 16px; z-index: 10001;
        background: none; border: 1px solid #003d10; color: #00ff41;
        font-size: 24px; width: 44px; height: 44px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        font-family: var(--font, monospace);
        transition: background 0.2s ease, border-color 0.2s ease;
      }
      .lb-close:hover { background: rgba(0,255,65,0.08); border-color: #004d15; }
      .lb-img {
        position: relative; max-width: 92vw; max-height: 92vh;
        object-fit: contain;
        border: 1px solid #003d10;
        box-shadow: 0 0 60px rgba(0, 255, 65, 0.08);
        transform: scale(0.92); opacity: 0;
        transition: transform 0.25s ease, opacity 0.25s ease;
      }
      #lightbox.active .lb-img { transform: scale(1); opacity: 1; }
    `;
    document.head.appendChild(style);

    const lbImg = lightbox.querySelector('.lb-img');

    images.forEach(function(img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        lbImg.src = img.src;
        lbImg.alt = img.alt || 'Enlarged image';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightbox.querySelector('.lb-bg').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

});
