import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

import { OurButton } from "./OurButton";

import "../Styles/Navbar.css";

import AzimaLogo from "../assets/AzimaLogo.png";
import AccountIcon from "../assets/AccountIcon.png";
import LogoutIcon from "../assets/Logout.png";
import Notifications from "../assets/Notifications.png";
import Settings from "../assets/Settings.png";
import { Link } from "react-router-dom";

const NavBar = ({ navType }) => {
  const [scrolled, setScrolled] = useState(false);
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //Navigation function
  const navigate = useNavigate();
  const handleLoginButtonClick = () => {
    navigate("/Signin");
  };

  const handleSignUpButtonClick = () => {
    navigate("/Signup");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        // Change 100 to the scroll position where you want to change the navbar color
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${scrolled && "scrolled"} ${navType}`}>
      <Link to="/">
        <img className="logo" src={AzimaLogo} alt="Azima Logo" />
      </Link>

      {isLoggedIn ? (
        <div className="temp">
          <li className="nav-item">
            <Link to="/Signup">
              <img src={Notifications} alt="Notifications" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Signin">
              <img src={AccountIcon} alt="Account Icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Settings">
              <img className="logo" src={Settings} alt="Azima Logo" />
            </Link>
          </li>
          <li className="nav-item">
            <a href="#">
              <img src={LogoutIcon} alt="Logout Icon" />
            </a>
          </li>
        </div>
      ) : (
        <div className="loginButtons">
          <OurButton
            onClick={handleLoginButtonClick}
            label="Sign in"
            variant="transparent"
          />
          <OurButton
            onClick={handleSignUpButtonClick}
            label="Sign up"
            variant="primary"
          />
        </div>
      )}
      {/* <div className="temp">
            <li className="nav-item">
              <Link to="/Signup">
                <img src={Notifications} alt="Azima Logo" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Signin">
                <img src={AccountIcon} alt="Azima Logo" />
              </Link>
            </li>
            <li className="nav-item">
              <a href="#">
                <img src={Settings} alt="Azima Logo" />
              </a>
            </li>
            <li className="nav-item">
              <a href="#">
                <img src={LogoutIcon} alt="Azima Logo" />
              </a>
            </li>
          </div> */}
    </div>
  );
};

export default NavBar;