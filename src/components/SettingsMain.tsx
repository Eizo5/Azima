import "../Styles/settings.css";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";

const SettingsMain = () => {
  return (
    <div>
      <h1 className="bold set-label">Language</h1>
      <div className="dropdown-div">
        <Dropdown />
      </div>
      <h1 className="bold set-label">Privacy</h1>
      <div className="checkbox-div">
        <Checkbox label="Display my name in groups" />
        <Checkbox label="Display my email in groups" />
      </div>

      <h1 className="bold set-label">Language</h1>

      <div className="checkbox-div">
        <Checkbox label="Send me notifications by email" />
        <Checkbox label="Send me notifications by SMS" />
        <Checkbox label="Send me notifications about updates" />
      </div>

      <h1 className="bold set-label">Theme</h1>

      <div className="dropdown-div">
        <Dropdown />
      </div>
    </div>
  );
};
export default SettingsMain;
