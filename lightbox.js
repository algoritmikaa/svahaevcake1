(() => {
  'use strict';

  const selector = '.lightbox-trigger';
  let lastTrigger = null;

  function createLightbox() {
    const dialog = document.createElement('div');
    dialog.className = 'lightbox';
    dialog.id = 'imageLightbox';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Просмотр фотографии торта');
    dialog.setAttribute('aria-hidden', 'true');

    dialog.innerHTML = `
      <div class="lightbox-backdrop" data-lightbox-close></div>
      <div class="lightbox-content" role="document">
        <button class="lightbox-close" type="button" aria-label="Закрыть увеличенное изображение" data-lightbox-close>
          <span aria-hidden="true">×</span>
        </button>
        <img class="lightbox-image" src="" alt="">
        <p class="lightbox-caption" aria-live="polite"></p>
      </div>`;

    document.body.appendChild(dialog);
    return dialog;
  }

  const lightbox = createLightbox();
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');

  function openLightbox(trigger) {
    const image = trigger.querySelector('img');
    if (!image) return;

    lastTrigger = trigger;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || 'Увеличенное фото торта';
    lightboxCaption.textContent = image.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox.classList.contains('is-open')) return;

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');

    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest(selector);
    if (trigger) {
      event.preventDefault();
      openLightbox(trigger);
      return;
    }

    if (event.target.closest('[data-lightbox-close]')) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
})();
