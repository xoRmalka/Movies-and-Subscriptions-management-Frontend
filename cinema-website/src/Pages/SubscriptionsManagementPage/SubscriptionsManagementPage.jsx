import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import crud from "../../Utils/Crud";
import NavBar from "../../Components/NavBar";

export default function SubscriptionsManagementPage() {
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
        <h2>Subscriptions</h2>{" "}
        <button onClick={() => navigate("/subscriptions")}>All Members</button>{" "}
        <button onClick={() => navigate("/subscriptions/add_member")}>
          Add Member
        </button>
        <br />
        <Outlet />
      </div>
    </div>
  );
}
