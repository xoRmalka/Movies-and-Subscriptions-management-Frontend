import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import crud from "../../Utils/Crud";
import User from "../../Components/User";

export default function UsersPage() {
  const users = useSelector((state) => state.users);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const { data } = await crud.getAllItems("http://localhost:8000/cinema/");
  //     dispatch({ type: "SET_USERS", payload: data });
  //   };
  //   getUsers();

  // }, []);

  // const deleteUser = (id) => {
  //   setUsers(users.filter((user) => user._id !== id));
  // };

  return (
    <div>
      {" "}
      {users?.map((user) => (
        <User data={user} key={user._id}  />//deleteUser={deleteUser}
      ))}
    </div>
  );
}
