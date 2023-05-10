import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import crud from "../Utils/Crud";
import MoviesWatched from "./moviesWatched";

export default function Member(props) {
  const storeData = useSelector((state) => state);
  const permissions = storeData?.user?.permissions;

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

    navigate("/subscriptions");
  };

  return (
    <div style={{ border: "1px solid purple" }}>
      <h2>{member?.name}</h2>
      <span>Email: {member?.email}</span>
      <br />
      <span>City: {member?.city}</span>
      <br />
      <br />
      {permissions?.includes("update subscriptions") && (
        <button onClick={editMember}>Edit</button>
      )}{" "}
      {permissions?.includes("delete subscriptions") && (
        <button onClick={deleteMember}>Delete</button>
      )}
      <br />
      <br />
      {<MoviesWatched data={member?.moviesWatched} memberId={member._id} />}
      <br />
      <br />
    </div>
  );
}
