import axios from 'axios';

const API_KEY = '32145956-2a93e38bd171660468b550e33';
const BASE_URL = 'https://pixabay.com/api/';

export function getPhotos(input_data) {
  const URL = `${BASE_URL}?key=${API_KEY}&q=${input_data}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;
  return axios
    .get(URL)
    .then(result => result.data)
    .then(({ hits, totalHits }) => {
      return {
        hits,
        totalHits,
      };
    })
    .catch(error => console.log('Sory, something going wrong'));
}
