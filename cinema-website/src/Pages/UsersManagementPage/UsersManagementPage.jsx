import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import crud from "../../Utils/Crud";
import NavBar from "../../Components/NavBar";
import User from "../../Components/User";

export default function UsersManagementPage() {
  const navigate = useNavigate();
  const storeData = useSelector((state) => state);

  const verifyToken = async () => {
    const token = storeData?.token;
    //sessionStorage.getItem("token");

    try {
      const { data } = await crud.createItem(
        "http://localhost:8000/auth/verify",
        {
          token: token,
        }
      );

      if (!data.auth) navigate("/login");
    } catch (e) {
      navigate("/login");
    }
  };

  const verifyAdmin = () => {
    const admin = storeData?.user?.isAdmin;
    admin ? null : navigate("/");
  };

  useEffect(() => {
    verifyAdmin();
    verifyToken();
  }, []);
  return (
    <div>
      
      <div style={{ border: "1px solid" }}>
        {/* <Link to="add_user">Add User</Link> <br />
        <Link to="">All users</Link> <br /> */}
        <h2>Users</h2>{" "}
        <button onClick={() => navigate("/users_management")}>All Users</button>{" "}
        <button onClick={() => navigate("/users_management/add_user")}>
          Add User
        </button>
        <br />
        <Outlet />
      </div>
    </div>
  );
}
