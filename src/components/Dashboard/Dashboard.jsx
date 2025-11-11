// src/pages/DashboardPage.jsx
import "./Dashboard.css";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authSlice from "../../redux/authSlice";
import { api } from "../../api";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((s) => s.auth.accessToken);
  const userInStore = useSelector((s) => s.auth.user);
  const authStatus = useSelector((s) => s.auth.status);
  const authError = useSelector((s) => s.auth.error);

  const [me, setMe] = useState(null);

  useEffect(() => {
    if (!token) return;
    api
      .get("/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setMe(r.data.me))
      .catch(() => setMe(null));
  }, [token]);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <p>Only see this page after logging in successfully!</p>

      <div className="dashboard-info">
        <p>
          <strong>Authentication Status:</strong> {authStatus}
        </p>

        {authError && (
          <p className="dashboard-error">
            <strong>Error:</strong> {authError}
          </p>
        )}

        <div className="dashboard-user-info">
          <p>
            <strong>User in store:</strong>
          </p>
          <div className="user-info-wrapper">
            <pre>{JSON.stringify(userInStore, null, 2)}</pre>
          </div>
        </div>

        <div className="dashboard-user-info">
          <p>
            <strong>/me from server:</strong>
          </p>
          <div className="user-info-wrapper">
            <pre>{JSON.stringify(me, null, 2)}</pre>
          </div>
        </div>
      </div>

      <Button type="primary" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
}
