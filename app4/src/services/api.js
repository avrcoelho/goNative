import axios from 'axios';

const api = axios.crate({
  baseURL: 'https://api.github.com',
});

export default api;
