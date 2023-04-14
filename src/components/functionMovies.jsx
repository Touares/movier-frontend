import paginate from "../utils/pagination";
import Filter from "./common/filtering";
import Pagination from "./common/pagination";
import LiveSearchBox from "./common/searchBox";
import _ from "lodash";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import http from '../services/httpServices'
import Table from "./table";
import React from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import './movies.css'
import config from '../services/config.json'




const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageSize, setPagesize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState();
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const navigate = useNavigate();
  const params = useParams();

  
  // const genreSchema = Joi.object({
  //   id: Joi.any().strip(),
  //   name: Joi.required().string().label("Name"),
  // });
  const mapGenresToMovies = (movies, genres) => {
    return movies.map((movie) => {
      const genre = genres.find((g) => g.id === movie.genre);
      if (genre) {
        movie.genre = genre;
      }
      return movie;
    });
  }

  const getMovieGenres = (movies, genres) => {
    const genreIds = movies.map(movie => movie.genre);
    console.log(genreIds)
    const movieGenres = [];
    for (const id of genreIds) {
      for (const genre of genres) {
        if (genre.id === id) {
          movieGenres.push(genre);
          break;
        }
      }
    }
    
    // const movieGenres = genres.filter(genre => genreIds.includes(genre.id));
    console.log(movieGenres);
    return movieGenres;
  }


  useEffect( async () => {
    // console.log(config.apiEndpoint)
    const {data:rawGenres} = await http.get(config.apiEndpoint + 'genre_get_post');
    const {data:rawMovies} = await http.get(config.apiEndpoint + 'movie_get_post');
    const movies = mapGenresToMovies(rawMovies, rawGenres);
    const genres = getMovieGenres(movies, rawGenres)
    // console.log(movies);
    setMovies( movies);
    setGenres(rawGenres );
  }
    
  , []);

  let filteredMovies = movies;
  if (search) {
    filteredMovies = movies.filter((m) => {
      return m.title.toLowerCase().includes(search.toLowerCase());
    });
  } else if (filter) {
    filteredMovies =
      filter === "all"
        ? movies
        : movies.filter((m) => m.genre.name.toLowerCase() === filter.toLowerCase());
  }

  // ;
  // we use the lodash method orderBy to sort, _.orderBy(the array to sort, [the path to sort by], [the order to sort by])
  const sorted = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    [sortColumn.order]
  );
  const pageMovies = paginate(sorted, currentPage, pageSize);

  const handleDelete = async (id) => {
    const originalMovies = movies;
    const moviesfiltered = originalMovies.filter((m) => m.id !== id);
    setMovies( moviesfiltered );

    try { await http.delete('http://127.0.0.1:8000/api/movie_pk/'+id);
    toast.success('movie deleted successfully');
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log(ex.response.status)
        toast.error('this movie does not exist or it has already been deleted');
        setMovies(originalMovies);
      }
    }

  };


  const movieNumber = () =>  {
    
    const filteredMovies =
      filter === "all" ? movies : movies.filter((m) => m.genre.name === filter);
    const number = filteredMovies.length;
    return number > 0
      ? "showing " + number + " movies in database"
      : "there is no movie in database";
  }

  const handleLike = (movie) => {
    console.log(movie);
    const moviestoLike = movies;
    const index = moviestoLike.indexOf(movie);
    moviestoLike[index] = { ...movie };
    if (movie.liked) {
      moviestoLike[index].liked = false;
    } else {
      moviestoLike[index].liked = true;
    }
    console.log(movie);

    setMovies( moviestoLike );
  };

  const handlePageChange = (page) => {
    setCurrentPage( page );
  };

  const handleFilter = (genre) => {
    setFilter(genre);
    setCurrentPage(1);
    setSearch( "" );
  };

  const handleSorting = (sortColumn) => {
    setSortColumn( sortColumn );
  };

  const handleSearch = (search) => {
    setSearch( search);
    setFilter( "all");
    setCurrentPage(1);
  };

  return (
    <React.Fragment>
    <div className="row">
      <div className="col-3">
        <Filter genres={genres} onFilter={handleFilter} filter={filter} />
      </div>
      <div className="col-sm">
        <div className="row">
          <div className="col">
            <div className="col">
              <div className="row justify-content-center">
                <div className="col-2">
                  {props.user && (<Link to="/movies/new" className="btn btn-primary w-100">
                    New Movie
                  </Link>)}
              
                </div>
                <div className="col-6">
                  <LiveSearchBox
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div className="database-movies">

            <h3 >{movieNumber()}</h3>
            </div>

            <Table
              movies={movies}
              genres={genres}
              pageMovies={pageMovies}
              sortColumn={sortColumn}
              onDelete={handleDelete}
              onLike={handleLike}
              onSort={handleSorting}
              filteredMovies={filteredMovies}
              user = {props.user}
            />
          </div>
        </div>
        <div className="row">
          <Pagination
            itemsCount={filteredMovies.length}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  </React.Fragment>
);
  
};

export default Movies;
