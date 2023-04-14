import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import crud from "../../Utils/Crud";

export default function CreateAccount() {
  // Define state variables to store user input and error messages
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Handle changes to form input fields and update state accordingly
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Attempt to create a new user account using the provided username and password
  const createUser = async (e) => {
    e.preventDefault();
    try {
      if (!user.username) {
        alert("You must insert a username!");
        return;
      }
      if (!user.password) {
        alert("You must insert a password!");
        return;
      }

      // Check if a user with the same username already exists
      const { data: existingUser } = await crud.getItem(
        "http://localhost:8000/cinema",
        user.username
      );

      // If a password is already set for this user, prevent account creation and suggest contacting the administrator
      if (existingUser.password) {
        alert(
          "This user already has a password. Please contact the administrator."
        );
        navigate("/login");
        return;
      }

      // Otherwise, update the user's password and redirect to the login page
      await crud.updateItem(
        "http://localhost:8000/cinema",
        user.username,
        user
      );

      navigate("/login");
    } catch (e) {
      // If an error occurs, set an error message to display to the user
      setErrorMessage(
        `An error occurred while creating the account, ${e.response.data.msg}. Please try again.`
      );
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form>
        {/* Use "for" attribute and label element to associate input with its label */}
        <label htmlFor="username">Username:</label>{" "}
        <input
          id="username"
          onChange={handleInput}
          name="username"
          type="text"
        />
        <br />
        <label htmlFor="password">Password:</label>{" "}
        <input
          id="password"
          onChange={handleInput}
          name="password"
          type="password"
        />
        <br />
        {/* Use a button element to trigger form submission */}
        <button onClick={createUser}>Create Account</button>
        <br />
      </form>
      {/* Conditionally render error message */}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
