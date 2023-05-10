import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import crud from "../Utils/Crud";

export default function User(props) {
  const [user, setUser] = useState(props.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editUser = () => {
    navigate(`/users_management/edit_user/${user._id}`, { state: { user } });
  };

  const deleteUser = async () => {
    try {
      await crud.deleteItem("http://localhost:8000/cinema", user._id);
      dispatch({ type: "DELETE_USER", payload: user._id });
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  };

  return (
    <div style={{ border: "1px solid purple" }}>
      Name: {user?.firstName} {user?.lastName}
      <br />
      Username: {user?.username} <br />
      <br />
      Permissions:
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul style={{ listStylePosition: "inside", textAlign: "left" }}>
          {user?.permissions?.map((permission, index) => (
            <li key={index}>{permission}</li>
          ))}
        </ul>
      </div>
      <button onClick={editUser}>Edit</button>{" "}
      <button onClick={deleteUser}>Delete</button>
    </div>
  );
}
