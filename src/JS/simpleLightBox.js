import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function getSimpleLightBox() {
  const lightBox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: ['alt'],
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  return lightBox.refresh();
}
