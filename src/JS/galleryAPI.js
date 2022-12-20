import axios from 'axios';
import { Notify } from 'notiflix';

const API_KEY = '32145956-2a93e38bd171660468b550e33';
const BASE_URL = 'https://pixabay.com/api/';

// export function getPhotos(input_data, page) {
//   const URL = `${BASE_URL}?key=${API_KEY}&q=${input_data}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
//   return axios
//     .get(URL)
//     .then(result => result.data)
//     .then(({ hits, totalHits }) => {
//       return {
//         hits,
//         totalHits,
//       };
//     })
//     .catch(error => console.log('Sory, something going wrong'));
// }

export async function getPhotos(input_data, page) {
  const URL = `${BASE_URL}?key=${API_KEY}&q=${input_data}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  try {
    const response = await axios.get(URL);
    const hits = response.data.hits;
    const totalHits = response.data.totalHits;
    return { hits, totalHits };
  } catch (error) {
    Notify.f('Sory, something going wrong');
  }
}
