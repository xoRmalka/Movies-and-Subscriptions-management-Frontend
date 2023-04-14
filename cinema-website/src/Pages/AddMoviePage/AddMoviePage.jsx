import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import crud from "../../Utils/Crud";

export default function AddMoviePage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    genres: "",
    image: "",
    premiered: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "genres") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.split(",").map((genre) => genre.trim()),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const updateState = async () => {
    try {
      const { data: newMovie } = await crud.createItem(
        "http://localhost:8000/subscriptions/movies",
        formData
      );
      console.log(newMovie)

      dispatch({ type: "ADD_MOVIE", payload: newMovie });
    } catch (error) {
      console.log("Error adding movie: ", error);
    }

    // redirect back to the "All Movies" page
    navigate("/movies")
  };

  return (
    <div>
      <label>
        Name:
        <input name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Genres:
        <input
          name="genres"
          value={formData.genres}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Premiered:
        <input
          name="premiered"
          type="date"
          value={formData.premiered}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button onClick={updateState}>Save</button>
      <button onClick={() => navigate("/movies")}>Cancel</button>
    </div>
  );
}
