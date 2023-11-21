import axios from 'axios';

const KEY = '39851842-1a75475aaeb26e27697c31964';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(query, page, perPage) {
  const response = await axios(
    `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  
  return response.data;
}
