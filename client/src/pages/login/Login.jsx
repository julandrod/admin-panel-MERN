import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserInfoLogin } from "../../store/userSlice";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(getUserInfoLogin({ email, password }));
  };

  return (
    <div className="login">
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        className="loginInput"
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        className="loginInput"
      />
      <button className="loginButton" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
