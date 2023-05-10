import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import crud from "../Utils/Crud";

export default function SubscribeToMovie(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies);
  const [subscription, setSubscription] = useState({
    id: "",
    name: "",
    date: "",
  });

  const moviesWatched = props?.data;
  const memberId = props?.memberId;

  // Filter out movies that the user has already watched
  const moviesToWatch = movies.filter((movie) => {
    if (!moviesWatched || moviesWatched.length === 0) {
      return true; // If moviesWatched is null or empty, return all movies
    } else {
      return !moviesWatched.some(
        (watchedMovie) => watchedMovie.id === movie._id
      );
    }
  });

  const handleSelectChange = (e) => {
    const selectedMovie = movies.find((movie) => movie._id === e.target.value);
    setSubscription({
      ...subscription,
      id: selectedMovie._id,
      name: selectedMovie.name,
    });
  };

  const handleDateChange = (e) => {
    setSubscription({ ...subscription, date: e.target.value });
  };

  const handleSubscribeClick = async () => {
    const subscriptionForState = {
      memberId,
      subscription,
    };
    const subscriptionForDb = {
      id: subscription?.id,
      date: subscription?.date,
    };
    try {
      await crud.updateItem(
        "http://localhost:8000/subscriptions/subscription",
        memberId,
        subscriptionForDb
      );
      dispatch({
        type: "UPDATE_MEMBER_MOVIES_WATCHED",
        payload: subscriptionForState,
      });

      const { data: movies } = await crud.getAllItems(
        "http://localhost:8000/subscriptions/movies"
      );
      dispatch({ type: "SET_MOVIES", payload: movies });
    } catch (error) {
      console.log("Error updating movie: ", error);
    }
    // redirect back to the "All Movies" page
    navigate("/subscriptions");
  };

  const isSubscribeDisabled = !subscription.id || !subscription.date; // <-- Check if movie and date are selected

  return (
    <div>
      <h3>Subscribe to a new movie</h3>
      {isSubscribeDisabled && (
        <p style={{ color: "red" }}>Please select a movie and a date</p>
      )}
      -
      <select onChange={handleSelectChange}>
        <option value="">Select a movie</option>
        {moviesToWatch.map((movie) => (
          <option key={movie._id} value={movie._id}>
            {movie.name}
          </option>
        ))}
      </select>
      <input type="date" onChange={handleDateChange} />
      <button onClick={handleSubscribeClick} disabled={isSubscribeDisabled}>
        Subscribe
      </button>
    </div>
  );
}
