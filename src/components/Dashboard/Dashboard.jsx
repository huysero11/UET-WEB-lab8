import "./Dashboard.css";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authSlice from "../../redux/authSlice";
import {
  authStatusSelector,
  authErrorSelector,
  currentUserSelector,
} from "../../redux/selectors";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutButtonClicked = () => {
    dispatch(authSlice.actions.logout());
    navigate("/");
  };

  const authStatus = useSelector(authStatusSelector);
  const authError = useSelector(authErrorSelector);
  const currentUser = useSelector(currentUserSelector);

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
        {currentUser && (
          <div className="dashboard-user-info">
            <p>
              <strong>User Info:</strong>
            </p>
            <div className="user-info-wrapper">
              <p>Email: {currentUser.email}</p>
              <p>Name: {currentUser.name}</p>
            </div>
          </div>
        )}
      </div>
      <Button type="primary" onClick={handleLogoutButtonClicked}>
        Log out
      </Button>
    </div>
  );
};

export default Dashboard;
