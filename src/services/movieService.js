import axios from 'axios';
import http from './httpServices';
import {toast} from 'react-toastify';
import config from '../services/config.json'





export function getMovies() {
    return http.get(config.apiEndpoint + "movie_get_post");}


export function deleteMovie(id) {
    return http.delete(config.apiEndpoint + 'movie_pk/'+id);
    }


export function getMovie(id) {
    return http.get(config.apiEndpoint + 'movie_pk/'+id);
    }


export async function saveMovie(movie) {
    if (movie.id) {
        let body = {...movie};
        // const {data:genre} = await http.get(`http://127.0.0.1:8000/api/genre_pk/${body.genre}`)
        // body.genre = genre
        // body.liked = true
        delete body.id;
        // delete body.genre.id
        // delete body.genreId;
        // console.log(body)
        return await http.put(config.apiEndpoint + `movie_pk/${movie.id}`, body)

    }
    else {
        
        return await http.post(config.apiEndpoint + 'movie_get_post', movie)

    }
    
    }
      