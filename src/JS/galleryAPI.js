import axios from 'axios';
import { Notify } from 'notiflix';

const API_KEY = '32145956-2a93e38bd171660468b550e33';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPhotos(input_data, page) {
  const URL = `${BASE_URL}?key=${API_KEY}&q=${input_data}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  try {
    return await axios.get(URL);
  } catch (error) {
    Notify.failure('Sory, something going wrong');
  }
}
