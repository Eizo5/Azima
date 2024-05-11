import "../Styles/Navbar.css";
import "../Styles/signin.css";

import NavBar from "../components/navbar";
import Checkbox from "../components/Checkbox";
import { OurButton } from "../components/OurButton";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

import { PASSWORD_REGEX } from "../data/helpers";

import { useState } from "react";

import ImgHolder from "../assets/EventImage.png";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetyped, setPasswordRetyped] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Validate the email address

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Function to handle input change
  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValid(validatePassword(newPassword));
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handleChangeRe = (e) => {
    const newPassword = e.target.value;
    setPasswordRetyped(newPassword);
  };

  const handleSubmitClick = () => {
    !isEmailValid && alert("Enter a valid Email");
    password !== passwordRetyped &&
      alert("the password you entered does not match");
    !isChecked && alert("Please agree to our terms and polices");
    password === passwordRetyped &&
      isValid &&
      isEmailValid &&
      isChecked &&
      setStepTwo(true);
  };

  // Function to validate password
  const validatePassword = (password: string) => PASSWORD_REGEX.test(password);

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (isValid) {
      console.log("Form submitted");
    }
  };

  return (
    <div className="container">
      <NavBar navType="fnav" />
      <div
        className="wrapper-signup"
        style={{
          width: `${stepTwo && "75rem"}`,
          marginTop: `${stepTwo && "11rem"} `,
        }}
      >
        {stepTwo === false ? (
          <form onSubmit={handleFormSubmission}>
            <h1>Sign up</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
                required
              />
              <CiMail className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <FaLock className="icon" />
            </div>
            {!isValid && (
              <p style={{ color: "red" }}>
                Password must contain at least one lowercase letter, one
                uppercase letter, one number, and be between 8 and 25 characters
                long.
              </p>
            )}
            <div className="input-box">
              <input
                placeholder="Re-type Password"
                type="password"
                value={passwordRetyped}
                onChange={handleChangeRe}
                required
              />
              <label>
                <input
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                />
                I read and accept the <a href="">terms and conditions</a>
              </label>
            </div>
            <div className="register-button-stepone">
              <OurButton
                position="center"
                label="Register"
                variant={""}
                disabled={!email || !password || !passwordRetyped}
                onClick={handleSubmitClick}
              />
            </div>
            <div className="register-link">
              <p>
                Already have an account? <Link to="/Signin">Sign-in!</Link>
              </p>
            </div>
          </form>
        ) : (
          <form action="">
            <h1 className="information-header">
              Let's gather more information about you
            </h1>

            <div className="img-and-extra-info-container">
              <div className="field-inputs">
                <div className="input-box">
                  <input type="text" placeholder="Name" required />
                </div>
                <div className="input-box">
                  <input type="text" placeholder="Surname" required />
                </div>
                <div className="input-box">
                  <input type="text" placeholder="Username" required />
                  <FaUser className="icon" />
                </div>

                <div className="input-box">
                  <input type="date" placeholder="Date of Birth" required />
                </div>
                <h1 className="information-header to-left">Interests</h1>
                <div className="checkboxes-signup">
                  <div className="checkboxes-left">
                    <Checkbox label="Hiking" />
                    <Checkbox label="Comedy" />
                  </div>
                  <div className="checkboxes-right">
                    <Checkbox label="Education" />
                    <Checkbox label="Religion" />
                  </div>
                </div>
              </div>

              <div className="import-image-container">
                <img src={ImgHolder} />
                <OurButton thin position="center" label="Upload" />
              </div>
            </div>
            <OurButton
              position="center"
              label="Register"
              variant={""}
              onClick={() => {}}
            />
          </form>
        )}
      </div>
    </div>
  );
}
