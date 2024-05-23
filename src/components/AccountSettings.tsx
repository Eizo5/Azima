import OurButton from "./OurButton";
import imgHolder from "../assets/EventImage.png";
import "../Styles/settings.css";
import useAuthentication from "../hooks/userHook";
import { InputText } from "./InputText";
import Checkbox from "./Checkbox";
import { useEffect, useState } from "react";
import CloudinaryUploadWidget from "../components/UploadImage";
import { User } from "../data/types";

const AccountSettings = ({}) => {
  const { user, updateUser } = useAuthentication();
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dkgrr55re");
  const [uploadPreset] = useState("v6wusflm");
  const [userData, setUserData] = useState({
    name: user?.name,
    surname: user?.surname,
    password: user?.password,
    birthdate: user?.birthdate,
    is_email_notifications_on: user?.is_sms_notifications_on,
    is_email_private: user?.is_name_private,
    is_name_private: user?.is_name_private,
    is_updates_notifications_on: user?.is_updates_notifications_on,
    profile_image: "",
    username: user?.username,
  });
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
  const [preferences, setPreferences] = useState<number[]>([]);
  const handleInputChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = (e: any) => {
    e.preventDefault();

    updateUser(userData?.ID, userData);
  };

  const handleCheckboxesChange = (value: number) => {
    if (!preferences.includes(value)) {
      // If not present, add it to the array
      setPreferences([...preferences, value]);
    } else {
      // If present, remove it from the array
      setPreferences(preferences.filter((pref) => pref !== value));
    }
    console.log(preferences);
  };

  let passwordLength = userData?.password?.length;

  useEffect(() => {
    user && setUserData(user);
    console.log(user);
  });
  useEffect(() => {
    if (publicId) {
      // Construct the Cloudinary image URL with the publicId
      const baseUrl = "https://res.cloudinary.com/dkgrr55re/image/upload/";
      const imageUrl = `${baseUrl}${publicId}`;

      // Update userData state using setUserData
      setUserData((prevUserData) => ({
        ...prevUserData,
        profile_image: imageUrl,
      }));
      console.log(userData.profile_image);
      console.log(imageUrl);
    }
  }, [publicId]);
  return (
    <>
      <div className="account-container">
        {" "}
        <div className="account-image">
          <img src={userData?.profile_image} />
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
          />
        </div>
        <div className="info-container">
          <InputText placeholder={userData?.name} label="Name" />

          <InputText placeholder={userData?.surname} label="Surname" />

          <InputText placeholder={userData?.email} label="Email" />
          <h3 className="bold">Password</h3>
          <h3>{"*".repeat(passwordLength)}</h3>
          <OurButton thin label="Delete Account" variant="alert" />
        </div>
      </div>
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
      <h1 className="bold set-label">Privacy</h1>
      <div className="checkbox-div">
        <Checkbox label="Display my name in groups" />
        <Checkbox label="Display my email in groups" />
        <Checkbox label="Send me notifications about updates" />
      </div>
    </>
  );
};

export default AccountSettings;
