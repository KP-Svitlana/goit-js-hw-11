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

form.addEventListener('submit', onFormSubmit);
button.addEventListener('click', onButtonClick);

async function onFormSubmit(e) {
  e.preventDefault();
  const data = e.currentTarget.searchQuery.value.trim();
  localStorage.setItem('data_value', data);
  reset();

  if (data === '') {
    reset();
    Notify.failure('Please write something.');
    return;
  } else {
    try {
      const response = await getPhotos(data, page);
      const hits = response.data.hits;
      const totalHits = response.data.totalHits;

      if (hits.length === 0) {
        reset();
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We found ${totalHits} images.`);
        gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
        getSimpleLightBox();
        page += 1;
        button.classList.remove('is-hidden');
      }
    } catch (error) {
      Notify.failure('Sory, something going wrong');
    }
  }
}

async function onButtonClick() {
  const data = localStorage.getItem('data_value');
  try {
    const response = await getPhotos(data, page);
    const hits = response.data.hits;
    const totalHits = response.data.totalHits;

    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    page += 1;
    getSimpleLightBox();

    if (totalHits / page < 40) {
      Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
      button.classList.add('is-hidden');
    }
  } catch (error) {
    Notify.failure('Sory, something going wrong');
  }
}

function reset() {
  clearMarkUp(gallery);
  page = 1;
  button.classList.add('is-hidden');
}
