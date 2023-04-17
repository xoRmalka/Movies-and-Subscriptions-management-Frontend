import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import crud from "../../Utils/Crud";
import NavBar from "../../Components/NavBar";

export default function HomePage() {
  const navigate = useNavigate();
  const storeData = useSelector((state) => state.user);
  // לבגדיר שיחזיר אחרי לוג אין לסלאש שזה ה APP.JSX
  const verifyToken = async () => {
    //not fast enough
    const token = storeData?.token;
    //sessionStorage.getItem("token");
    console.log(token);

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
    // verifyToken();
  }, []);

  return (
    <div>
      <h1>{`Welcome back ${storeData?.firstName}!`}</h1>
    </div>
  );
}
