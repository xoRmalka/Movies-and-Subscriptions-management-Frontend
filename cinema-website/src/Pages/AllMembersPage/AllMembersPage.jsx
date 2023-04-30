import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Member from "../../Components/Member";

export default function AllMembersPage() {
  const members = useSelector((state) => state.members);
  const [selectedMember, setSelectedMember] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check if URL contains memberId parameter
    const params = new URLSearchParams(location.search);
    const memberId = params.get("memberId");

    // Set selectedMember to the memberId or null if it's not present
    setSelectedMember(
      memberId ? members.find((m) => m._id === memberId) : null
    );
  }, [members, location]);

  return (
    <div>
      <div>
        {selectedMember ? (
          // Render the selected member if one is selected
          <Member data={selectedMember} />
        ) : (
          // Otherwise, render all members
          members?.map((member, index) => {
            return <Member data={member} key={index} />;
          })
        )}
      </div>
    </div>
  );
}
