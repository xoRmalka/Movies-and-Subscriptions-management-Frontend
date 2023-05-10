import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import crud from "../../Utils/Crud";

export default function SubscriptionsManagementPage() {
  const navigate = useNavigate();

  const storeData = useSelector((state) => state);
  const permissions = storeData?.user?.permissions;

  const verifyToken = async () => {
    const token = storeData?.token;

    try {
      const { data } = await crud.createItem(
        "http://localhost:8000/auth/verify",
        {
          token: token,
        }
      );

      if (!data.auth) navigate("/login");
    } catch (e) {
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div>
      <div style={{ border: "1px solid" }}>
        <h2>Subscriptions</h2>{" "}
        {permissions?.includes("view subscriptions") && (
          <button onClick={() => navigate("/subscriptions")}>
            All Members
          </button>
        )}{" "}
        {permissions?.includes("create subscriptions") && (
          <button onClick={() => navigate("/subscriptions/add_member")}>
            Add Member
          </button>
        )}
        <br />
        <Outlet />
      </div>
    </div>
  );
}
