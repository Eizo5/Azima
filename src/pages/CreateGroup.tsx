import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { InputText } from "../components/InputText";
import Checkbox from "../components/Checkbox";
import Dropdown from "../components/Dropdown";
import { Footer } from "../components/Footer";
import "../Styles/creategroup.css";
import { InputDesc } from "../components/InputDesc";
import { OurButton } from "../components/OurButton";

import imgHolder from "../assets/EventImage.png";

const CreateGroup = () => {
  const navigate = useNavigate();

  const handleCreateGroupClick = () => {
    navigate("/GroupPage");
  };

  return (
    <div>
      <NavBar navType="fnav" />

      <div className="create-event-container">
        <div className="form-container">
          <label className="heading">Create your group! </label>
          <InputText
            label="Group Name *"
            placeholder="Enter your group name here..."
          />
          <InputText
            label="Location *"
            placeholder="Enter your group location here..."
          />
          <div className="dropdowns">
            <Dropdown label="Events Type" />
            <Dropdown label="Group Type" />
          </div>
          <InputDesc
            label="Group Description"
            placeholder="Enter your group description here"
          />
          <div className="checkboxes">
            <Checkbox label="Allow adults only" />
            <Checkbox label="I want my group to be private" />
            <Checkbox label="Allow participant in my location only" />
          </div>

          <OurButton
            position=""
            label="Create Group"
            onClick={handleCreateGroupClick}
            variant=""
          />
        </div>

        <div className="imgHolder">
          <img src={imgHolder} />
          <OurButton
            variant={""}
            onClick={() => {}}
            position="center"
            label="Upload Image"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateGroup;
