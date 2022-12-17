import { getPhotos } from './JS/galleryAPI';
import { createMarkup } from './JS/markUp';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onFormSabmit);

function onFormSabmit(e) {
  e.preventDefault();
  const data = e.currentTarget.searchQuery.value;

  getPhotos(data).then(({ hits, totalHits }) => {
    clearMarkUp();

    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notify.success(`Hooray! We found ${totalHits} images.`);
    return gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
  });
}

var lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: ['alt'],
  captionPosition: 'bottom',
  captionDelay: 250,
});

function clearMarkUp() {
  gallery.innerHTML = '';
}
