import React from "react";
import { useSelector } from "react-redux";

import User from "../../Components/User";

export default function UsersPage() {
  const users = useSelector((state) => state.users);

  return (
    <div>
      {" "}
      {users?.map((user) => (
        <User data={user} key={user._id} />
      ))}
    </div>
  );
}
