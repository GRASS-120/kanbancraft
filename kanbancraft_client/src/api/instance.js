import axios from 'axios';

export const api = axios.create({
  baseURL: '',
  // headers: {'X-Custom-Header': 'foobar'}
});