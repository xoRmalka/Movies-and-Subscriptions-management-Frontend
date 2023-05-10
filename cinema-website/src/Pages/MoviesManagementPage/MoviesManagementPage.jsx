import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import crud from "../../Utils/Crud";

export default function MoviesManagementPage() {
  const navigate = useNavigate();

  const storeData = useSelector((state) => state);
  const permissions = storeData?.user?.permissions;

  const verifyToken = async () => {
    const token = storeData?.token;

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
        <h2>Movies</h2>{" "}
        {permissions?.includes("view movies") && (
          <button onClick={() => navigate("/movies")}>All Movies</button>
        )}{" "}
        {permissions?.includes("create movies") && (
          <button onClick={() => navigate("/movies/add_movie")}>
            Add Movie
          </button>
        )}{" "}
        <br />
        <Outlet />
      </div>
    </div>
  );
}
