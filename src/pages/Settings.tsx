import NavBar from "../components/navbar";
import SideNav from "../components/SideNav";
import AccountSettings from "../components/AccountSettings";
import MyGroups from "../components/MyGroups";
import MyEvents from "../components/MyEvents";

import AccountIconPurple from "../assets/AccountIconPurple.png";
import MyGroups1 from "../assets/MyGroups.png";
import MyEvents1 from "../assets/MyEvents.png";

import "../Styles/settings.css";

import { useState } from "react";

const Settings = () => {
  const [settingStatus, setSettingStatus] = useState("a");
  const handleAccountClick = () => {
    setSettingStatus("a");
  };
  const handleMyGroupsClick = () => {
    setSettingStatus("b");
  };
  const handleMyEventsClick = () => {
    setSettingStatus("c");
  };

  return (
    <div>
      <NavBar navType="fnav" />
      <SideNav
        label1="Account"
        label2="My Groups"
        label3="My Events"
        icon1={AccountIconPurple}
        icon2={MyGroups1}
        icon3={MyEvents1}
        onClick1={handleAccountClick}
        onClick2={handleMyGroupsClick}
        onClick3={handleMyEventsClick}
        selectedButton
      />
      <div className="inside-settings">
        {settingStatus === "a" ? (
          <AccountSettings />
        ) : settingStatus === "b" ? (
          <MyGroups />
        ) : settingStatus === "c" ? (
          <MyEvents />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Settings;
