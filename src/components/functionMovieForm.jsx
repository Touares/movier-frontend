import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import DjangoCSRFToken from "../services/getCSRF";
import {toast} from 'react-toastify';
import config from '../services/config.json'



const MovieForm = (props) => {
  const [data, setData] = useState({
    title: "",
    // id: "",
    genre: '',
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  // const genreSchema = Joi.object({
  //   id: Joi.any().strip(),
  //   name: Joi.required().string().label("Name"),
  // });

  const schema = Joi.object().keys({
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    id: Joi.any().strip(),
    // id: Joi.string().label("id"),
    numberInStock: Joi.number().integer().min(0).max(100).required(),
    dailyRentalRate: Joi.number().precision(1).min(0).max(10).required(),
  });

  const doSubmit = async () => {
    await saveMovie(data);
    toast.success('movie added successfully');

    // console.log(data);
    navigate("/movies");
  };

  const populateGenres = async () => {
    const {data:genresData} = await getGenres();
      setGenres(genresData);
  }
  const populateMovie = async () => {
    const { id } = params;
      if (id === "new") return;
      try {
        const {data:movie} = await getMovie(id);
        setData(mapToViewModel(movie));
      }
      catch (ex) {
        if (ex.response && ex.response.status === 404) navigate("*", { replace: true });

      }
  }

  useEffect( async () => {
    // const navigate = useNavigate();
    // const params = useParams();
    await populateGenres();
    await populateMovie();
      
      // console.log(movie)
    }
  , []);

  const mapToViewModel = (movie) => {
    // const genre = genres.find(g => g.id ===movie.genre)
    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorsData = { ...errors };
    const newData = { ...data };
    newData[input.name] = input.value;
    // const errorMessage = validateProperty(input);
    // if (errorMessage) errorsData[input.name] = errorMessage;
    // else delete errorsData[input.name];
    setData((prevState) => ({
      ...prevState,
      [input.name]: input.value,
      //   data: newData,
    }));
    // setErrors(errorsData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorsData = validate();
    setErrors(errorsData || {});
    console.log(errorsData);
    if (errorsData) return;

    doSubmit();
  };

  const validate = () => {
    const { error } = schema.validate(
      data,
      { abortEarly: false }
      //   { allowUnknown: true }
    );
    if (!error) return null;

    const errorsData = {};
    for (let item of error.details) errorsData[item.path[0]] = item.message;
    return errorsData;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <DjangoCSRFToken />
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            onChange={handleChange}
            value={data.title}
            id="title"
            className="form-control mt-2 mb-2"
          />
          {errors.title && (
            <div className="alert alert-danger">{errors.title}</div>
          )}

          <label htmlFor="genre">Genre</label>
          <select
            name="genre"
            onChange={handleChange}
            value={data.genre}
            id="genre"
            className="form-select mt-2 mb-2"
            aria-label="Default select example"
          >
            <option value=""></option>
            {/* <option defaultValue>Open this select menu</option> */}
            {genres.map((g) => (
              <option   key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
            
          </select>
          {errors.genre && (
            <div className="alert alert-danger">{errors.genre}</div>
          )}
          <label htmlFor="numberInStock">numberInStock</label>
          <input
            name="numberInStock"
            onChange={handleChange}
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
            onChange={handleChange}
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
};

export default MovieForm;
