import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function getSimpleLightBox() {
  new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: ['alt'],
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}
