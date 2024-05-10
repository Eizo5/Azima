import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

import "../Styles/Navbar.css";
import "../Styles/signin.css";
import NavBar from "../components/navbar";
import { OurButton } from "../components/OurButton";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export default function () {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/Home");
  };

  const finishSignIn = () => {
    setIsLoggedIn(true);
    handleLoginClick();
  };
  return (
    <div className="container">
      <NavBar navType="fnav" />
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <OurButton
            label={"Sign-in"}
            position="center"
            onClick={finishSignIn}
          />
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
