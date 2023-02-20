// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const galeryContainer = document.querySelector('.gallery');

const renderGaleryItems = galleryItems
  .map(({ preview, original, description }) => {
    return `
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
`;
  })
  .join('');

galeryContainer.innerHTML = renderGaleryItems;

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  showCounter: false,
  docClose: true,
  sourceAttr: 'href',
});
