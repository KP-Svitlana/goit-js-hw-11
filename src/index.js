import { getPhotos } from './JS/galleryAPI';
import { createMarkup } from './JS/markUp';
import { Notify } from 'notiflix';
import { getSimpleLightBox } from './JS/simpleLightBox';
import { clearMarkUp } from './JS/markUp';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
let page = 1;

button.classList.add('is-hidden');

form.addEventListener('submit', onFormSabmit);
button.addEventListener('click', onButtonClick);

function onFormSabmit(e) {
  e.preventDefault();
  const data = e.currentTarget.searchQuery.value;
  localStorage.setItem('data_value', data);
  reset();

  getPhotos(data, page).then(({ hits, totalHits }) => {
    if (hits.length === 0) {
      reset();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (data === '') {
      reset();
      Notify.failure('Please write something.');
    } else {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
      getSimpleLightBox();
      page += 1;
      button.classList.remove('is-hidden');
    }
  });
}

function onButtonClick() {
  const data = localStorage.getItem('data_value');

  getPhotos(data, page).then(({ hits, totalHits }) => {
    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    page += 1;
    getSimpleLightBox();

    if (totalHits / page < 40) {
      Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
      button.classList.add('is-hidden');
    }
  });
}

function reset() {
  clearMarkUp(gallery);
  page = 1;
  button.classList.add('is-hidden');
}
