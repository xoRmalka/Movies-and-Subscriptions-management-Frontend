import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Movie from "../../Components/Movie";
import "./MoviesPage.css";

export default function MoviesPage() {
  const moviesTest = useSelector((state) => state.movies);
  const [movies, setMovies] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesTest);
  }, [moviesTest]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleSearch = () => {
    // console.log(searchValue);
    // console.log(filteredMovies);

    if (searchValue === "") {
      setFilteredMovies(movies);
    } else {
      const test = movies.filter((movie) =>
        movie?.name?.toLowerCase().includes(searchValue.toLowerCase())
      );

      setFilteredMovies(test);
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
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
