import React, { useEffect, useState } from "react";

import "../Styles/Navbar.css";
import "../Styles/signin.css";
import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import useAuthentication from "../hooks/userHook";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, login } = useAuthentication();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    login(e, email, password);
  };

  // If user is logged in navigate to home page
  useEffect(() => {
    user && navigate("/home");
  });

  return (
    <div className="container">
      <NavBar navType="fnav" />
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <label></label>
            <a href="#">Forgot password?</a>
          </div>
          <OurButton label={"Sign-in"} position="center" type="submit" />
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/Signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>

    /*  <div className="page-container">
      
      <div className="sign-container">
        <form action="">
          <h1 className="sign-header">Login Form</h1>
          <input placeholder="Email" type="text" />
          <input placeholder="Password" type="password" />
          <p>Forgot </p>
          

          <OurButton
            label={"Sign-in"}
            margin={"0 0 0 25px"}
            height={"50px"}
            width={"200px"}
            fontSize={"25px"}
          />
        </form>
      </div>
    </div> */
  );
}
