import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import crud from "../../Utils/Crud";

export default function EditMoviePage() {
  const storeData = useSelector((state) => state);
  const permissions = storeData?.user?.permissions;
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.movie) {
      setMovie((prevMovie) => ({
        ...prevMovie,
        premiered: new Date(location.state.movie.premiered)
          .toISOString()
          .substr(0, 10),
      }));
    }
  }, [location.state]);

  const [movie, setMovie] = useState(
    location.state?.movie || {
      name: "",
      genres: "",
      image: "",
      premiered: "",
    }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "genres") {
      setMovie((prevMovie) => ({
        ...prevMovie,
        [name]: value.split(",").map((genre) => genre.trim()),
      }));
    } else {
      setMovie((prevMovie) => ({
        ...prevMovie,
        [name]: value,
      }));
    }
  };

  const updateState = async () => {
    try {
      await crud.updateItem(
        "http://localhost:8000/subscriptions/movies",
        movie._id,
        movie
      );

      dispatch({ type: "UPDATE_MOVIE", payload: movie });

      const { data: members } = await crud.getAllItems(
        "http://localhost:8000/subscriptions/members"
      );
      dispatch({ type: "SET_MEMBERS", payload: members });
    } catch (error) {
      console.log("Error updating movie: ", error);
    }
    // redirect back to the "All Movies" page
    navigate("/movies");
  };

  return (
    <div>
      {permissions?.includes("update movies") && (
        <div>
          <h2>Edit Movie: {movie.name}</h2>
          <label>
            Name:
            <input
              name="name"
              value={movie.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Genres:
            <input
              name="genres"
              value={movie.genres}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Image URL:
            <input
              name="image"
              value={movie.image}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Premiered:
            <input
              name="premiered"
              type="date"
              value={movie.premiered}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <br />
          <button onClick={updateState}>Update</button>{" "}
          <button onClick={() => navigate("/movies")}>Cancel</button>
        </div>
      )}
    </div>
  );
}
