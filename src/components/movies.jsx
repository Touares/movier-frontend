import React, { Component } from "react";
// import { getMovies } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Table from "./table";
import Navbar from "./navbar";
import paginate from "../utils/pagination";
import Filter from "./common/filtering";
import Pagination from "./common/pagination";
import LiveSearchBox from "./common/searchBox";
import _ from "lodash";
import { Link } from "react-router-dom";
import { genres } from "../services/fakeGenreService";
import axios from 'axios';
import {toast} from 'react-toastify';
import http from '../services/httpServices'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 7,
    currentPage: 1,
    filter: "all",
    search: "",
    sortColumn: { path: "title", order: "asc" },
  };

   mapGenresToMovies = (movies, genres) => {
    return movies.map((movie) => {
      const genre = genres.find((g) => g.id === movie.genre);
      if (genre) {
        movie.genre = genre;
      }
      return movie;
    });
  }

  async componentDidMount() {
    const {data:genres} = await http.get("http://127.0.0.1:8000/api/genre_get_post");
    const {data:rawMovies} = await http.get("http://127.0.0.1:8000/api/movie_get_post");
    const movies = this.mapGenresToMovies(rawMovies, genres);
    // console.log(movies);
    this.setState({ movies, genres });
  }
  render() {
    const { movies, genres, pageSize, currentPage, filter, sortColumn, search } =
      this.state;

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
    console.log(this.props);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <Filter genres={genres} onFilter={this.handleFilter} filter={this.state.filter} />
          </div>
          <div className="col-sm">
            <div className="row">
              <div className="col">
                <div className="col">
                  <div className="row justify-content-center">
                    <div className="col-2">
                      {this.props.user && (<Link to="/movies/new" className="btn btn-primary w-100">
                        New Movie
                      </Link>)}
                    </div>
                    <div className="col-6">
                      <LiveSearchBox
                        value={search}
                        onChange={this.handleSearch}
                      />
                    </div>
                  </div>
                </div>
                <h3>{this.movieNumber()}</h3>
                <Table
                  movies={movies}
                  genres={genres}
                  pageMovies={pageMovies}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                  onSort={this.handleSorting}
                  filteredMovies={filteredMovies}
                />
              </div>
            </div>
            <div className="row">
              <Pagination
                itemsCount={filteredMovies.length}
                onPageChange={this.handlePageChange}
                pageSize={pageSize}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleDelete = async (id) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m.id !== id);
    this.setState({ movies });

    try { await axios.delete('http://127.0.0.1:8000/api/movie_pk/'+id);
    toast.success('movie deleted successfully');
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log(ex.response.status)
        toast.error('this movie does not exist or it has already been deleted');
        this.setState({movies:originalMovies});
      }
    }

  };

  movieNumber() {
    const { filter, movies } = this.state;
    const filteredMovies =
      filter === "all" ? movies : movies.filter((m) => m.genre.name === filter);
    const number = filteredMovies.length;
    return number > 0
      ? "showing " + number + " movies in database"
      : "there is no movie in database";
  }

  handleLike = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    if (movie.liked) {
      movies[index].liked = false;
    } else {
      movies[index].liked = true;
    }
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFilter = (genre) => {
    this.setState({ filter: genre, currentPage: 1, search: "" });
  };

  handleSorting = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (search) => {
    this.setState({ search, filter: "all", currentPage: 1 });
  };
}

export default Movies;
