import "./LoginForm.css";
import { Button } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { isAuthSelector } from "../../redux/selectors";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const hanldePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();
  const hanldeSubmitButtonClicked = () => {
    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }
    dispatch(login({ email, password }));
  };

  const navigate = useNavigate();
  const isAuth = useSelector(isAuthSelector);
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  return (
    <div className="loginForm-container">
      <div className="loginForm-title">Sign in</div>
      <div className="loginForm-email-contain">
        <div className="loginForm-email-title">Your email</div>
        <input
          className="loginForm-email-input"
          placeholder="enter your email..."
          value={email}
          onChange={hanldeEmailChange}
        ></input>
      </div>
      <div className="loginForm-password-container">
        <div className="loginForm-password-title">Your password</div>
        <input
          className="loginForm-password-input"
          placeholder="enter your password..."
          type="password"
          value={password}
          onChange={hanldePasswordChange}
        ></input>
      </div>
      <Button
        className="loginForm-submit-button"
        type="primary"
        onClick={hanldeSubmitButtonClicked}
      >
        Submit
      </Button>
    </div>
  );
};

export default LoginForm;
