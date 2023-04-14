import http from './httpServices'
// import config from './config.json';
import config from '../services/config.json'


export function getGenres() {
     
    return http.get(config.apiEndpoint + "genre_get_post");
  }