import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import crud from "../../Utils/Crud";
import NavBar from "../../Components/NavBar";

export default function SubscriptionsPage() {
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
  return <div>SubscriptionsPage</div>;
}