import React from "react";
import { useNavigate } from "react-router-dom";

export default function MembersWhoWatched(props) {
  const membersWhoWatched = props.data;

  const navigate = useNavigate();

  const handleMemberClick = (e, memberId) => {
    e.preventDefault();
    navigate(`/subscriptions?memberId=${memberId}`);
  };

  return (
    <div>
      <p>Subscriptions Watched:</p>
      <ul>
        {membersWhoWatched.map((member, index) => (
          <li key={index}>
            <a href="" onClick={(e) => handleMemberClick(e, member.memberId)}>
              {member.name}
            </a>{" "}
            , {member.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
