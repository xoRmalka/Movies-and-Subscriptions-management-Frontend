import React from "react";
import { useNavigate } from "react-router-dom";

export default function MembersWhoWatched(props) {
  const membersWhoWatched = props.data;

  const navigate = useNavigate();

  const handleMemberClick = (memberId) => {
    navigate(`/members/${memberId}`);
  };

  return (
    <div>
      <p>Subscriptions Watched:</p>
      <ul>
        {membersWhoWatched.map((member, index) => (
          <li key={index}>
            <a href="" onClick={() => handleMemberClick(member.id)}>
              {member.name}
            </a>{" "}
            add date
          </li>
        ))}
      </ul>
    </div>
  );
}
