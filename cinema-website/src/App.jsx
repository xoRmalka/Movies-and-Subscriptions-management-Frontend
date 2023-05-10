import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import crud from "./Utils/Crud";

import "./App.css";
import CreateAccount from "./Pages/CreateAccount/CreateAccount";
import LoginPage from "./Pages/LoginPage/loginPage";
import HomePage from "./Pages/HomePage/HomePage";
import MoviesManagementPage from "./Pages/MoviesManagementPage/MoviesManagementPage";
import SubscriptionsPage from "./Pages/SubscriptionsManagementPage/SubscriptionsManagementPage";
import UsersManagementPage from "./Pages/UsersManagementPage/UsersManagementPage";
import AddUserPage from "./Pages/AddUserPage/AddUserPage";
import NavBar from "./Components/NavBar";
import UsersPage from "./Pages/UsersPage/UsersPage";
import EditUserPage from "./Pages/EditUserPage/EditUserPage";
import MoviesPage from "./Pages/MoviesPage/MoviesPage";
import AddMoviePage from "./Pages/AddMoviePage/AddMoviePage";
import EditMoviePage from "./Pages/EditMoviePage/EditMoviePage";
import SubscriptionsManagementPage from "./Pages/SubscriptionsManagementPage/SubscriptionsManagementPage";
import AllMembersPage from "./Pages/AllMembersPage/AllMembersPage";
import AddMemberPage from "./Pages/AddMemberPage/AddMemberPage";
import EditMemberPage from "./Pages/EditMemberPage/EditMemberPage";

function App() {
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
    <div className="App">
      <h1>Movies - Subscriptions Web Site</h1>
      {storeData?.token ? <NavBar /> : null}
      {/* //remove the homepage */}
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create_account" element={<CreateAccount />} />
        {/* MOVIES */}
        <Route path="/movies" element={<MoviesManagementPage />}>
          <Route path="" element={<MoviesPage />} />
          <Route path="add_movie" element={<AddMoviePage />} />
          <Route path="edit_movie/:id" element={<EditMoviePage />} />
        </Route>
        {/* SUBSCRIPTIONS */}
        <Route path="/subscriptions" element={<SubscriptionsManagementPage />}>
          <Route path="" element={<AllMembersPage />} />
          <Route path="add_member" element={<AddMemberPage />} />
          <Route path="edit_member/:id" element={<EditMemberPage />} />
        </Route>
        {/* USERS-MANAGMENT */}
        <Route path="/users_management" element={<UsersManagementPage />}>
          <Route path="" element={<UsersPage />} />
          <Route path="add_user" element={<AddUserPage />} />
          <Route path="edit_user/:id" element={<EditUserPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
