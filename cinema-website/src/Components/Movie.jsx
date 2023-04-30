import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MembersWhoWatched from "./MembersWhoWatched";
import crud from "../Utils/Crud";

export default function Movie(props) {
  const [movie, setMovie] = useState(props.data);

  const premieredYear = new Date(movie?.premiered).getFullYear();

  useEffect(() => {
    setMovie(props.data);
  }, [props.data]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editMovie = () => {
    navigate(`/movies/edit_movie/${movie._id}`, { state: { movie } });
  };

  const deleteMovie = async () => {
    try {
      await crud.deleteItem(
        "http://localhost:8000/subscriptions/movies",
        movie._id
      );

      dispatch({ type: "DELETE_MOVIE", payload: movie._id });

      const { data: members } = await crud.getAllItems(
        "http://localhost:8000/subscriptions/members"
      );
      dispatch({ type: "SET_MEMBERS", payload: members });
    } catch (error) {
      console.log("Error deleteing movie: ", error);
    }

    // redirect back to the "All Movies" page
    navigate("/movies");
  };

  return (
    <div className="movie-container" style={{ border: "1px solid purple" }}>
      <h2>
        {movie?.name}, {premieredYear}
      </h2>
      <span>Genres: {movie?.genres.join(", ")}</span>
      <br />
      <br />
      <img src={movie?.image} />
      {movie?.membersWhoWatched && (
        <MembersWhoWatched data={movie.membersWhoWatched} />
      )}
      <br />
      <button onClick={editMovie}>Edit</button>{" "}
      <button onClick={deleteMovie}>Delete</button>
      <br />
      <br />
    </div>
  );
}
