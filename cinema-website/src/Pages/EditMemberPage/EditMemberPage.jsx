import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import crud from "../../Utils/Crud";

export default function EditMemberPage() {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [member, setMember] = useState(
    location.state?.member || {
      name: "",
      email: "",
      city: "",
    }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateState = async () => {
    try {
      await crud.updateItem(
        "http://localhost:8000/subscriptions/members",
        member._id,
        member
      );

      dispatch({ type: "UPDATE_MEMBER", payload: member });

      const { data: movies } = await crud.getAllItems(
        "http://localhost:8000/subscriptions/movies"
      );
      dispatch({ type: "SET_MOVIES", payload: movies });
    } catch (error) {
      console.log("Error updating movie: ", error);
    }
    // redirect back to the "All Members" page
    navigate("/subscriptions");
  };
  return (
    <div>
      <h2>Edit Member: {member.name}</h2>
      <label>
        Name:
        <input name="name" value={member.name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email:
        <input name="email" value={member.email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        City:
        <input name="city" value={member.city} onChange={handleInputChange} />
      </label>
      <br />
      <br />
      <br />
      <button onClick={updateState}>Update</button>{" "}
      <button onClick={() => navigate("/subscriptions")}>Cancel</button>
    </div>
  );
}
