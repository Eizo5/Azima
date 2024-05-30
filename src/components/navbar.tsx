import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import useAuthentication from "../hooks/userHook";

import OurButton from "./OurButton";
import NotificationDropDown from "./NotificationDropDown";

import AzimaLogo from "../assets/AzimaLogo.png";
import AccountIcon from "../assets/AccountIcon.png";
import LogoutIcon from "../assets/Logout.png";
import Notifications from "../assets/Notifications.png";
import Settings from "../assets/Settings.png";

import "../Styles/Navbar.css";

interface NavBarProps {
  navType: string;
}

// Fixed
const NavBar = ({ navType }: NavBarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const { user, logout } = useAuthentication();

  //Navigation function
  const navigate = useNavigate();

  // Create bg color effect on scroll
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

  // Navigation options
  const options = [
    {
      to: "",
      imgSrc: Notifications,
      alt: "Notifications",
      onClick: () => setDropDown(!dropDown),
    },
    { to: `/UserProfile/${user?.ID}`, imgSrc: AccountIcon, alt: "Profile" },
    { to: "/Settings", imgSrc: Settings, alt: "Account" },
    { to: "/home", imgSrc: LogoutIcon, alt: "Logout", onClick: logout },
  ];

  return (
    <div className={`${scrolled && "scrolled"} ${navType}`}>
      <Link to="/">
        <img className="logo" src={AzimaLogo} alt="Azima Logo" />
      </Link>

      {user ? (
        <div className="temp">
          {options.map(({ to, imgSrc, alt, onClick }) => (
            <Link to={to} className="nav-item" title={alt}>
              <img src={imgSrc} alt={alt} onClick={onClick} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="loginButtons">
          <OurButton
            onClick={() => navigate("/Signin")}
            label="Login"
            variant="transparent"
          />
          <OurButton
            onClick={() => navigate("/Signup")}
            label="Register"
            variant="primary"
          />
        </div>
      )}
      {dropDown && <NotificationDropDown imgUrl={Notifications} />}
    </div>
  );
};

export default NavBar;
