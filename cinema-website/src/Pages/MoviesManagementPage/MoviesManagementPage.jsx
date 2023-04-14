import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import crud from "../../Utils/Crud";
import NavBar from "../../Components/NavBar";

export default function MoviesManagementPage() {
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

  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div>
      <div style={{ border: "1px solid" }}>
        {/* <Link to="add_user">Add User</Link> <br />
        <Link to="">All users</Link> <br /> */}
        <h2>Movies</h2>{" "}
        <button onClick={() => navigate("/movies")}>All Movies</button>{" "}
        <button onClick={() => navigate("/movies/add_movie")}>Add Movie</button>
        <br />
        <Outlet />
      </div>
    </div>
  );
}
