import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import crud from "../../Utils/Crud";

// The LoginPage component represents the login page of the application
export default function LoginPage() {
  // Use the useState hook to manage the component's state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Use the useNavigate hook from react-router-dom to navigate to other pages
  const navigate = useNavigate();

  // Use the useDispatch hook from react-redux to update the global state of the application
  const dispatch = useDispatch();

  // The handleLogin function attempts to create a new login session
  const handleLogin = async () => {
    try {
      // Make a POST request to the server to create a new session
      const { data } = await crud.createItem(
        "http://localhost:8000/auth/login",
        {
          username,
          password,
        }
      );

      // If the request is successful, dispatch two actions to update the global state of the application
      dispatch({ type: "SET_TOKEN", payload: data.token });
      dispatch({ type: "SET_USER", payload: data.user });

      if (data?.user?.isAdmin) {
        // If the logged in user is an admin, fetch all users from the server
        const { data: users } = await crud.getAllItems(
          "http://localhost:8000/cinema/"
        );
        dispatch({ type: "SET_USERS", payload: users });

        //!!!!!!CHECK PRMISSION!!!!!
        const { data: movies } = await crud.getAllItems(
          "http://localhost:8000/subscriptions/movies"
        );
        dispatch({ type: "SET_MOVIES", payload: movies });
      }

      //!!!!!!CHECK PRMISSION!!!!!
      const { data: members } = await crud.getAllItems(
        "http://localhost:8000/subscriptions/members"
      );
      dispatch({ type: "SET_MEMBERS", payload: members });

      // Navigate to the home page
      navigate("/");
    } catch (e) {
      // If the request fails, set an error message in the component's state
      setErrorMessage(e.response?.data?.msg);
      // console.log(e);
    }
  };

  // The component renders a form with two input fields for the username and password, a login button that triggers the handleLogin function, and a link to the create account page.
  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <label htmlFor="username">User name:</label>{" "}
        <input
          id="username"
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>{" "}
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button onClick={handleLogin}>Login</button>

      {/* Display an error message if there is one */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Display a link to the create account page */}
      <div>
        <p>New user?</p>
        <Link to="/create_account">Create an account</Link>
      </div>
    </div>
  );
}
