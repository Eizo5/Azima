import "../Styles/Navbar.css";
import "../Styles/signin.css";
import NavBar from "../components/navbar";
import { OurButton } from "../components/OurButton";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export default function () {
  return (
    <div className="container">
      <NavBar navType="fnav" />
      <div className="wrapper-signup">
        <form action="">
          <h1>Sign up</h1>
          <div className="input-box">
            <input type="text" placeholder="Email" required />
            <CiMail className="icon" />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Re-type Password" required />
            <label>
              <input type="checkbox" />I read and accept the{" "}
              <a href="">terms and conditions</a>
            </label>
          </div>
          <OurButton
            position="center"
            label="Register"
            variant={""}
            onClick={() => {}}
          />
          <div className="register-link">
            <p>
              Already have an account? <Link to="/Signin">Sign-in!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
