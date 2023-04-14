import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MembersWhoWatched from "./MembersWhoWatched";

export default function Movie(props) {
  const [movie, setMovie] = useState(props.data);
  //   const [movie, setMovie] = useState((state) =>
  //     state?.movies?.filter((movie) => movie?.id == props.data)
  //   );
  const premieredYear = new Date(movie?.premiered).getFullYear();

  useEffect(() => {
    setMovie(props.data);
  }, [props.data]);

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const editUser = () => {
  //     navigate(`/users_management/edit_user/${user._id}`, { state: { user } });
  //   };

  //   const deleteUser = async () => {
  //     try {
  //       await crud.deleteItem("http://localhost:8000/cinema", user._id);
  //       // Dispatch the DELETE_USER action with the user id as payload
  //       dispatch({ type: "DELETE_USER", payload: user._id });
  //     } catch (error) {
  //       console.log("Error deleting user: ", error);
  //     }
  //   };

  return (
    <div className="movie-container" style={{ border: "1px solid purple" }}>
      <h2>
        {movie?.name}, {premieredYear}
      </h2>
      <br />
      <span>Genres: {movie?.genres.join(", ")}</span>
      <br />
      <br/>
      <img src={movie?.image} />
      
      {/* <button onClick={editUser}>Edit</button>{" "}
      <button onClick={deleteUser}>Delete</button> */}
      {movie?.membersWhoWatched && (
        <MembersWhoWatched data={movie.membersWhoWatched} />
      )}
      <br/>
      <br/>
      <button>Edit</button> <button>Delete</button>
    </div>
  );
}
