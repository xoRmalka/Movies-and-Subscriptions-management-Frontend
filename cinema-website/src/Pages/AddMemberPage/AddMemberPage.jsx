import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import crud from "../../Utils/Crud";

export default function AddMemberPage() {
  const storeData = useSelector((state) => state);
  const permissions = storeData?.user?.permissions;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [member, setMember] = useState({
    name: "",
    email: "",
    city: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addMember = async () => {
    try {
      const { data: newMember } = await crud.createItem(
        "http://localhost:8000/subscriptions/members",
        member
      );

      dispatch({ type: "ADD_MEMBER", payload: newMember });
    } catch (error) {
      console.log("Error adding member: ", error);
    }
    navigate("/subscriptions");
  };

  return (
    <div>
      {permissions?.includes("create subscriptions") && (
        <div>
          <h2>Add Member</h2>
          <label>
            Name:
            <input
              name="name"
              value={member.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              value={member.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            City:
            <input
              name="city"
              value={member.city}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <br />
          <br />
          <button onClick={addMember}>Save</button>{" "}
          <button onClick={() => navigate("/subscriptions")}>Cancel</button>
        </div>
      )}
    </div>
  );
}
