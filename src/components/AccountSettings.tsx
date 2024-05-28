import OurButton from "./OurButton";
import imgHolder from "../assets/EventImage.png";
import "../Styles/settings.css";
import useAuthentication from "../hooks/userHook";
import { InputText } from "./InputText";
import Checkbox from "./Checkbox";
import { useEffect, useState } from "react";
import CloudinaryUploadWidget from "../components/UploadImage";
import { User } from "../data/types";
import useGroup from "../hooks/groupHook";

const AccountSettings = ({}) => {
  const { user, updateUser, preferences, setPreferences, setUser } =
    useAuthentication();
  const { categories, getCategories } = useGroup();
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
  // const [preferences, setPreferences] = useState<number[]>([]);
  const handleInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value } as User);
  };

  const handleSaveClick = (e: any) => {
    console.log({ ...user, preferences });
    updateUser(user?.ID, { ...user, preferences });
  };

  /*   const handleCheckboxesChange = (value: number) => {
    if (!preferences.includes(value)) {
      // If not present, add it to the array
      setPreferences([...preferences, value]);
    } else {
      // If present, remove it from the array
      setPreferences(preferences.filter((pref) => pref !== value));
    }
  }; its
 */
  let passwordLength = user?.password?.length;

  // Get user data
  useEffect(() => {
    getCategories();
  }, []);

  // Handle user img upload
  useEffect(() => {
    if (publicId) {
      // Construct the Cloudinary image URL with the publicId
      const baseUrl = "https://res.cloudinary.com/dkgrr55re/image/upload/";
      const imageUrl = `${baseUrl}${publicId}`;

      // Update userData state using setUserData
      setUser({ ...user, profile_image: imageUrl } as User);
    }
  }, [publicId]);

  return (
    <>
      <div className="account-container">
        {" "}
        <div className="account-image">
          <img src={user?.profile_image} />
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
          />
        </div>
        <div className="info-container">
          <InputText
            placeholder={user?.name}
            label="Name"
            onChange={handleInputChange}
            defaultValue={user?.name}
            name="name"
          />

          <InputText
            placeholder={user?.surname}
            label="Surname"
            onChange={handleInputChange}
            defaultValue={user?.surname}
            name="surname"
          />
          <InputText
            placeholder={user?.username}
            label="Username"
            onChange={handleInputChange}
            defaultValue={user?.username}
            name="username"
          />
          <InputText
            placeholder={user?.birthdate}
            label="Birthdate"
            onChange={handleInputChange}
            defaultValue={user?.birthdate}
            name="birthdate"
            date
          />

          <InputText
            placeholder={user?.email}
            label="Email"
            defaultValue={user?.email}
          />
          <h3 className="bold">Password</h3>
          <h3>{"*".repeat(passwordLength)}</h3>
          <OurButton thin label="Delete Account" variant="alert" />
        </div>
      </div>
      <div className="checkboxes-signup">
        {categories &&
          categories.map((category) => (
            <Checkbox
              key={category?.category_id}
              label={category?.value}
              checked={preferences?.includes(category?.category_id)}
              onChange={() => {
                const isChecked = preferences?.includes(category?.category_id);
                isChecked && preferences
                  ? setPreferences(
                      preferences?.filter(
                        (pref) => pref !== category?.category_id
                      )
                    )
                  : setPreferences([...preferences, category?.category_id]);
              }}
            />
          ))}
      </div>
      <h1 className="bold set-label">Privacy</h1>
      <div className="checkbox-div">
        <Checkbox
          label="Display my name in groups"
          checked={user?.is_name_private}
          onChange={() =>
            setUser({
              ...user,
              is_name_private: !user?.is_name_private,
            } as User)
          }
        />
        <Checkbox
          label="Display my email in groups"
          checked={user?.is_email_private}
          onChange={() =>
            setUser({
              ...user,
              is_email_private: !user?.is_email_private,
            } as User)
          }
        />
        <Checkbox
          label="Send me notifications about updates"
          checked={user?.is_updates_notifications_on}
          onChange={() =>
            setUser({
              ...user,
              is_updates_notifications_on: !user?.is_updates_notifications_on,
            } as User)
          }
        />
      </div>

      <OurButton label="Save" onClick={handleSaveClick} />
    </>
  );
};

export default AccountSettings;
