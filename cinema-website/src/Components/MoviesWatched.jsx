import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MoviesWatched(props) {
  const movies = useSelector((state) => state.movies);

  const moviesWatched = props?.data;

  const navigate = useNavigate();

  const handleMemberClick = (e, movieId) => {
    e.preventDefault();
    // Find the movie with the given id in the state
    navigate(`/movies?id=${movieId}`);
  };
  return (
    <div>
      <button>Subscribe to new movie</button>
      <h2>Movies Watched:</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul>
          {moviesWatched &&
            moviesWatched.map((movie, index) => (
              <li key={index}>
                <a href="" onClick={(e) => handleMemberClick(e, movie.id)}>
                  {movie.name}
                </a>{" "}
                add date
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
