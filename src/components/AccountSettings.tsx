import { OurButton } from "./OurButton";
import imgHolder from "../assets/EventImage.png";
import "../Styles/settings.css";

const AccountSettings = ({}) => {
  return (
    <div className="account-container">
      {" "}
      <div className="account-image">
        <img src={imgHolder} />
        <OurButton variant={""} onClick={() => {}} thin label="Upload Image" />
      </div>
      <div className="info-container">
        <h3 className="bold">Name</h3>
        <h3>Sama Jabri</h3>
        <h3 className="bold">Email</h3>
        <h3>Sama.Jabri@outlook.com</h3>
        <h3 className="bold">Password</h3>
        <h3>********</h3>
        <OurButton thin label="Delete Account" variant="alert" />
      </div>
    </div>
  );
};

export default AccountSettings;
