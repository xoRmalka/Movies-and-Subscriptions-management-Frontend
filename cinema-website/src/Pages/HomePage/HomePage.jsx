import React from "react";
import { useSelector } from "react-redux";

export default function HomePage() {
  const storeData = useSelector((state) => state.user);

  return (
    <div>
      <h1>{`Welcome back ${storeData?.firstName}!`}</h1>
    </div>
  );
}
