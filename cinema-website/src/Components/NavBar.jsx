import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const [isAdmins, setIsAdmin] = useState(false);

  const storeData = useSelector((state) => state);

  const verifyAdmin = () => {
    storeData?.user?.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
  };

  const handleLogout = () => {
    // Refresh the page on logout
    window.location.reload();
  };

  useEffect(() => {
    verifyAdmin();
  }, []);
  return (
    <div>
      <Link to="/movies"> Movies | </Link>
      <Link to="/subscriptions">Subscriptions | </Link>
      {isAdmins ? (
        <Link to="/users_management">Users Management | </Link>
      ) : null}
      <Link to="/" onClick={handleLogout}>
        Log Out{" "}
      </Link>
    </div>
  );
}
