import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Movie from "../../Components/Movie";
import "./MoviesPage.css";

export default function MoviesPage() {
  const movies = useSelector((state) => state.movies);

  const [searchValue, setSearchValue] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const location = useLocation();
  const movieId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (movieId) {
      const filteredMovie = movies.find((movie) => movie._id === movieId);
      setFilteredMovies([filteredMovie]);
    } else {
      setFilteredMovies(movies);
    }
  }, [movies, movieId]);

  const handleSearch = () => {
    if (searchValue === "") {
      setFilteredMovies(movies);
    } else {
      const test = movies.filter((movie) =>
        movie?.name?.toLowerCase().includes(searchValue.toLowerCase())
      );

      setFilteredMovies(test);
    }
  };

  const handleAllMovies = () => {
    setSearchValue("");
    setFilteredMovies(movies);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />{" "}
        <button onClick={handleSearch}>Find</button>
      </div>
      <div className="movies-container">
        {filteredMovies.map((movie, index) => {
          return <Movie data={movie} key={index} />;
        })}
      </div>
    </div>
  );
}
