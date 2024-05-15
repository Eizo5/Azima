//  Importing Styles
import "../Styles/Navbar.css";
import "../Styles/signin.css";

//  Importing Components
import NavBar from "../components/navbar";
import Checkbox from "../components/Checkbox";
import OurButton from "../components/OurButton";
import CloudinaryUploadWidget from "../components/UploadImage";

//  Importing Icons
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

//  Importing Data
import { PASSWORD_REGEX } from "../data/helpers";

//  Importing Packages
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState } from "react";

//  Importing Images
import ImgHolder from "../assets/EventImage.png";
import { set } from "@cloudinary/url-gen/actions/variable";
import useAuthentication from "../hooks/userHook";

export default function () {
  //  State Control for Input data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [profile_image, setProfile_image] = useState(`${ImgHolder}`);
  const [birthdate, setBirthdate] = useState("");
  const [isSportsChecked, setIsSportsChecked] = useState(false);
  const [isComedyChecked, setIsComedyChecked] = useState(false);
  const [isEducationChecked, setIsEducationChecked] = useState(false);
  const [isReligionChecked, setIsReligionChecked] = useState(false);
  const [preferences, setPreferences] = useState<number[]>([]);

  // State contorl for Cloudinary
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dkgrr55re");
  const [uploadPreset] = useState("v6wusflm");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  // States to handle stepping to the next register step
  const [stepTwo, setStepTwo] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const navigate = useNavigate();
  // Cloud init
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dkgrr55re",
    },
  });

  // Profile image instance
  const myImage = cld.image(publicId);

  const { user, register } = useAuthentication();

  // Submit click handling
  const handleSubmit = async (e: any) => {
    const formData = {
      name,
      surname,
      username,
      email,
      password,
      confirmPassword,
      profile_image,
      birthdate,
      preferences,
    };

    register(e, formData);
  };

  const Interests: number[] = [];
  // A function that should return an array to the prefrences state TBDDDDDDDDD
  const handleCheckboxesChange = (value: number) => {
    if (!preferences.includes(value)) {
      // If not present, add it to the array
      setPreferences([...preferences, value]);
    } else {
      // If present, remove it from the array
      setPreferences(preferences.filter((pref) => pref !== value));
    }

    /*  if (preferences.includes(value)) {
      // If value is already in preferences array, remove it
      setPreferences(preferences.filter((pref) => pref !== value));
      console.log("Prefrence added");
    } else {
      // If value is not in preferences array, add it
      setPreferences([...preferences, value]);
      console.log("Prefrence added new");
    }
    */
  };

  // Validate the email address

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Function to handle input change for password and validate it
  const handleChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  // Function to handle input change for Email and validate it
  const handleChangeEmail = (e: any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  // Function to handle input change for Confirmed Password and validate it
  const handleChangeComnfiremdPass = (e: any) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
  };

  // Function to move on to step two
  const handleSubmitClick = () => {
    !isEmailValid && alert("Enter a valid Email");
    password !== confirmPassword &&
      alert("the password you entered does not match");
    !isPolicyChecked && alert("Please agree to our terms and polices");
    password === confirmPassword &&
      isPasswordValid &&
      isEmailValid &&
      isPolicyChecked &&
      setStepTwo(true);
  };

  // Function to validate password
  const validatePassword = (password: string) => PASSWORD_REGEX.test(password);

  // Function to Submit the Form
  const handleFormSubmission = async (e: any) => {
    e.preventDefault();

    if (isPasswordValid) {
      console.log("Form submitted");
    }
  };

  // Function to update the profile picture
  useEffect(() => {
    // Fetch the profile image URL using the publicId and update the image source
    if (publicId) {
      // Here you can fetch the profile image URL using the publicId
      // For example, if the Cloudinary base URL is "https://res.cloudinary.com/<cloud_name>/image/upload/",
      // you can construct the image URL as `${baseUrl}${publicId}`
      const imageUrl = `https://res.cloudinary.com/dkgrr55re/image/upload/${publicId}`;

      // Update the image source
      setProfile_image(imageUrl);
    }
  }, [publicId]);

  // If user is logged in navigate to home page
  useEffect(() => {
    user && navigate("/home");
  });

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
            {!isPasswordValid && (
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
                value={confirmPassword}
                onChange={handleChangeComnfiremdPass}
                required
              />
              <label>
                <input
                  checked={isPolicyChecked}
                  onChange={() => setIsPolicyChecked(!isPolicyChecked)}
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
                disabled={!email || !password || !confirmPassword}
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
          <form onSubmit={handleSubmit}>
            <h1 className="information-header">
              Let's gather more information about you
            </h1>

            <div className="img-and-extra-info-container">
              <div className="field-inputs">
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Surname"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <FaUser className="icon" />
                </div>

                <div className="input-box">
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    required
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </div>
                <h1 className="information-header to-left">Interests</h1>
                <div className="checkboxes-signup">
                  <div className="checkboxes-left">
                    <Checkbox
                      label="Sports"
                      checked={preferences.includes(1)}
                      onChange={() => handleCheckboxesChange(1)}
                    />
                    <Checkbox
                      label="Comedy"
                      checked={preferences.includes(2)}
                      onChange={() => handleCheckboxesChange(2)}
                    />{" "}
                  </div>
                  <div className="checkboxes-right">
                    <Checkbox
                      label="Education"
                      checked={preferences.includes(3)}
                      onChange={() => handleCheckboxesChange(3)}
                    />{" "}
                    <Checkbox
                      label="Religion"
                      checked={preferences.includes(4)}
                      onChange={() => handleCheckboxesChange(4)}
                    />{" "}
                  </div>
                </div>
              </div>

              <div className="import-image-container">
                <img src={profile_image} />
                <CloudinaryUploadWidget
                  uwConfig={uwConfig}
                  setPublicId={setPublicId}
                />
              </div>
            </div>
            <OurButton
              position="center"
              label="Register"
              variant={""}
              type="submit"
            />
          </form>
        )}
      </div>
    </div>
  );
}
