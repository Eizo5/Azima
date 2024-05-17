import "../Styles/settings.css";
import { Event } from "./Event";
import OurButton from "./OurButton";
import imgHolder from "../assets/EventImage.png";
import { InputText } from "./InputText";
import { InputDesc } from "./InputDesc";
import Checkbox from "./Checkbox";
import Dropdown from "../components/Dropdown";
import useGroup from "../hooks/groupHook";

const Overview = ({ groupData }) => {
  const { categories } = useGroup();

  return (
    <div>
      <h1 className="settings-header">Overview</h1>
      <div className="group-image-name-container">
        <div className="account-image">
          <img src={groupData ? groupData?.group_image : imgHolder} />
          <OurButton
            variant={""}
            onClick={() => {}}
            thin
            label="Upload Image"
          />
        </div>
        <div className="group-name-container">
          <InputText
            label="Group Name"
            placeholder={groupData && groupData?.name}
          />
        </div>
      </div>
      <div className="description-overview-container">
        <InputDesc
          label="Description"
          placeholder={groupData && groupData?.description}
        />
      </div>
      <div className="checkboxes-dropdowns-container">
        <div className="checkboxes-overview-container">
          <Checkbox
            label="Allow adults only"
            checked={groupData && groupData?.is_adult_only}
          />
          <Checkbox
            label="I want my group to be private"
            checked={groupData && groupData?.is_private_group}
          />
        </div>
        <div className="dropdowns-overview">
          <Dropdown
            list={[
              { value: "online", label: "Online" },
              { value: "f2f", label: "f2f" },
            ]}
            multiSelect={true}
            label="Events Type"
          />
          <Dropdown list={categories} multiSelect={true} label="Group Type" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
