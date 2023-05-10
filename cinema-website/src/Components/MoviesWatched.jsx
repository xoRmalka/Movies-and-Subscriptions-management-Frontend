import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubscribeToMovie from "./SubscribeToMovie";

export default function MoviesWatched(props) {
  const storeData = useSelector((state) => state);
  const permissions = storeData?.user?.permissions;

  const [showSubscribe, setShowSubscribe] = useState(false);

  const moviesWatched = props?.data;
  const memberId = props?.memberId;

  const navigate = useNavigate();

  const handleMemberClick = (e, movieId) => {
    e.preventDefault();
    // Find the movie with the given id in the state
    navigate(`/movies?id=${movieId}`);
  };

  const handleSubscribeClick = () => {
    setShowSubscribe(!showSubscribe);
  };

  return (
    <div>
      {permissions?.includes("update subscriptions") && (
        <button onClick={handleSubscribeClick}>Subscribe to new movie</button>
      )}
      {showSubscribe && (
        <SubscribeToMovie data={moviesWatched} memberId={memberId} />
      )}

      <h2>Movies Watched:</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul>
          {moviesWatched &&
            moviesWatched.map((movie, index) => (
              <li key={index}>
                <a href="" onClick={(e) => handleMemberClick(e, movie.id)}>
                  {movie.name}
                </a>
                , {movie.date}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
