import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import crud from "../../Utils/Crud";

export default function EditUserPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(location.state?.user || {});
  const [permissions, setPermissions] = useState(user?.permissions || []);

  const handlePermissionChange = (e) => {
    const permission = e.target.value;
    const isChecked = e.target.checked;

    // check if permission already exists in permissions array
    const permissionExists = permissions.includes(permission);

    // update the permissions array only if permission doesn't exist
    if (isChecked && !permissionExists) {
      setPermissions((prevPermissions) => [...prevPermissions, permission]);
    } else if (!isChecked && permissionExists) {
      setPermissions((prevPermissions) =>
        prevPermissions.filter((p) => p !== permission)
      );
    }

    // automatically add the "view subscriptions" permission when creating/updating/deleting subscriptions
    if (
      (permission === "create subscriptions" ||
        permission === "update subscriptions" ||
        permission === "delete subscriptions") &&
      isChecked
    ) {
      const viewSubsExists = permissions.includes("view subscriptions");
      if (!viewSubsExists) {
        setPermissions((prevPermissions) => [
          ...prevPermissions,
          "view subscriptions",
        ]);
      }
    }

    // automatically add the "view movies" permission when creating/updating/deleting movies
    if (
      (permission === "create movies" ||
        permission === "update movies" ||
        permission === "delete movies") &&
      isChecked
    ) {
      const viewMoviesExists = permissions.includes("view movies");
      if (!viewMoviesExists) {
        setPermissions((prevPermissions) => [
          ...prevPermissions,
          "view movies",
        ]);
      }
    }
  };

  useEffect(() => {
    setUser({ ...user, permissions: permissions });
  }, [permissions]);

  const updateState = async () => {
    try {
      await crud.updateItem(
        "http://localhost:8000/cinema/update",

        user._id,
        user
      );
      dispatch({ type: "UPDATE_USER", payload: user });
    } catch (error) {
      console.log("Error updating user: ", error);
    }

    // redirect back to the "All Users" page
    navigate("/users_management/");
  };

  const handleUpdateUser = async () => {
    // update the user object with the new permissions
    setUser({ ...user, permissions: permissions });
    updateState();
  };

  return (
    <div>
      <h2>
        Edit User: {user?.firstName} {user?.lastName}
      </h2>
      <div>
        First Name:
        <input
          type={"text"}
          value={user?.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <br />
        Last Name:{" "}
        <input
          type={"text"}
          value={user?.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <br />
        Username:{" "}
        <input
          type={"text"}
          value={user?.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <br />
        <div>
          <h4>Permissions:</h4>

          <label>
            <input
              type="checkbox"
              value="view subscriptions"
              checked={permissions.includes("view subscriptions")}
              onChange={handlePermissionChange}
            />
            View Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="create subscriptions"
              checked={permissions.includes("create subscriptions")}
              onChange={handlePermissionChange}
            />
            Create Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="update subscriptions"
              checked={permissions.includes("update subscriptions")}
              onChange={handlePermissionChange}
            />
            Update Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="delete subscriptions"
              checked={permissions.includes("delete subscriptions")}
              onChange={handlePermissionChange}
            />
            Delete Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="view movies"
              checked={permissions.includes("view movies")}
              onChange={handlePermissionChange}
            />
            View Movies
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="create movies"
              checked={permissions.includes("create movies")}
              onChange={handlePermissionChange}
            />
            Create Movies
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="update movies"
              checked={permissions.includes("update movies")}
              onChange={handlePermissionChange}
            />
            Update Movies
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="delete movies"
              checked={permissions.includes("delete movies")}
              onChange={handlePermissionChange}
            />
            Delete Movies
          </label>
          <br />
        </div>
        <button onClick={handleUpdateUser}>Update</button>{" "}
        <button onClick={() => navigate("/users_management/")}>Cancel</button>
      </div>
    </div>
  );
}
