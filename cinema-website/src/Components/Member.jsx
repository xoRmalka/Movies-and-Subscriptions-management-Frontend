import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import crud from "../Utils/Crud";
import MoviesWatched from "./moviesWatched";

export default function Member(props) {
  const [member, setMember] = useState(props.data);

  useEffect(() => {
    setMember(props.data);
  }, [props.data]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editMember = () => {
    navigate(`/subscriptions/edit_member/${member._id}`, { state: { member } });
  };

  const deleteMember = async () => {
    try {
      await crud.deleteItem(
        "http://localhost:8000/subscriptions/subscription",
        member._id
      );

      dispatch({ type: "DELETE_MEMBER", payload: member._id });

      const { data: movies } = await crud.getAllItems(
        "http://localhost:8000/subscriptions/movies"
      );
      dispatch({ type: "SET_MOVIES", payload: movies });
    } catch (error) {
      console.log("Error deleteing movie: ", error);
    }
  };

  return (
    <div style={{ border: "1px solid purple" }}>
      <h2>{member?.name}</h2>
      <span>Email: {member?.email}</span>
      <br />
      <span>City: {member?.city}</span>
      <br />
      <br />
      <button onClick={editMember}>Edit</button>{" "}
      <button onClick={deleteMember}>Delete</button>
      <br />
      <br />
      {<MoviesWatched data={member?.moviesWatched} memberId={member._id} />}
      <br />
      <br />
    </div>
  );
}
