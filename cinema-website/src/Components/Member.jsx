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
    console.log(member);
    navigate(`/subscriptions/edit_member/${member._id}`, { state: { member } });
  };

  return (
    <div style={{ border: "1px solid purple" }}>
      <h2>{member?.name}</h2>
      <span>Email: {member?.email}</span>
      <br />
      <span>City: {member?.city}</span>
      <br />
      <br />
      <button onClick={editMember}>Edit</button> <button>Delete</button>
      <br />
      <br />
      {<MoviesWatched data={member?.moviesWatched} memberId={member._id} />}
      <br />
      <br />
    </div>
  );
}
