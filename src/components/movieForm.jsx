import React, { Component } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { Form } from "./common/form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";
// import { useHistory, useLocation, useParams } from 'react-router-dom';

function withParams(Component) {
  return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} />
  );
}

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = Joi.object().keys({
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().integer().min(0).max(100).required(),
    dailyRentalRate: Joi.number().precision(1).min(0).max(10).required(),
  });

  doSubmit = () => {
    saveMovie(this.state.data);
    // const navigate = this.props.navigate;
    // navigate("/movies");
    this.props.history.push("/movies");
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    let { id } = this.props.params;
    const navigate = this.props.navigate;
    if (id === "new") return;
    const movie = getMovie(id);
    if (!movie) return navigate("*", { replace: true });
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  render() {
    const { data, errors } = this.state;
    let { id } = this.props.params;

    // console.log(id);

    return (
      <div className="container">
        <form onSubmit={this.handlaSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              onChange={this.handleChange}
              value={data.title}
              id="title"
              //   type="title"
              className="form-control mt-2 mb-2"
            />
            {errors.title && (
              <div className="alert alert-danger">{errors.title}</div>
            )}

            <label htmlFor="genreId">Genre</label>
            <select
              name="genreId"
              onChange={this.handleChange}
              // value={data.genreId}
              id="genreId"
              className="form-select mt-2 mb-2"
              aria-label="Default select example"
              value={data.genreId}
            >
              <option value=""></option>
              {/* <option defaultValue>Open this select menu</option> */}
              {this.state.genres.map((g) => (
                <option key={g._id} value={g.id}>
                  {g.name}
                </option>
              ))}
              {/* <option value="2">Two</option>
              <option value="3">Three</option> */}
            </select>
            {errors.genreId && (
              <div className="alert alert-danger">{errors.genreId}</div>
            )}
            <label htmlFor="numberInStock">numberInStock</label>
            <input
              name="numberInStock"
              onChange={this.handleChange}
              value={data.numberInStock}
              id="numberInStock"
              type="text"
              className="form-control mt-2 mb-2"
            />
            {errors.numberInStock && (
              <div className="alert alert-danger">{errors.numberInStock}</div>
            )}
            <label htmlFor="dailyRentalRate">Daily Rental Rate</label>
            <input
              name="dailyRentalRate"
              onChange={this.handleChange}
              value={data.dailyRentalRate}
              id="dailyRentalRate"
              type="text"
              className="form-control mt-2 mb-2"
            />
            {errors.dailyRentalRate && (
              <div className="alert alert-danger">{errors.dailyRentalRate}</div>
            )}

            <button
              // disabled  attr should be true or false, by passing this.validate,
              // this.validate() returns either null = false or an object = truthy
              //   disabled={this.validate()}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withParams(MovieForm);
