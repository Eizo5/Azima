import "../Styles/settings.css";
import { Event } from "./Event";
import OurButton from "./OurButton";
import imgHolder from "../assets/EventImage.png";
import { InputText } from "./InputText";
import { InputDesc } from "./InputDesc";
import Checkbox from "./Checkbox";
import Dropdown from "../components/Dropdown";

const Overview = () => {
  return (
    <div>
      <h1 className="settings-header">Overview</h1>
      <div className="group-image-name-container">
        <div className="account-image">
          <img src={imgHolder} />
          <OurButton
            variant={""}
            onClick={() => {}}
            thin
            label="Upload Image"
          />
        </div>
        <div className="group-name-container">
          <InputText label="Group Name" />
        </div>
      </div>
      <div className="description-overview-container">
        <InputDesc label="Description" />
      </div>
      <div className="checkboxes-dropdowns-container">
        <div className="checkboxes-overview-container">
          <Checkbox label="Allow adults only" />
          <Checkbox label="I want my group to be private" />
          <Checkbox label="Allow participant in my location only" />
        </div>
        <div className="dropdowns-overview">
          <Dropdown label="Event Type" />
          <Dropdown label="Group Type" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
