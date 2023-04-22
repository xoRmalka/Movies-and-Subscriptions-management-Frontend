import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Movie from "../../Components/Movie";
import Member from "../../Components/Member";

export default function AllMembersPage() {
  const members = useSelector((state) => state.members);

  return (
    <div>
      <div>
        {members?.map((member, index) => {
          return <Member data={member} key={index} />;
        })}
      </div>
    </div>
  );
}
