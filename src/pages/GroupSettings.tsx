import NavBar from "../components/navbar";
import SideNav from "../components/SideNav";
import Member from "../components/Member";
import Admins1 from "../components/Admins";
import Bans1 from "../components/Bans";
import Overview1 from "../components/Overview";
import GroupEvents from "../components/GroupEvents";

import "../Styles/settings.css";

import Overview from "../assets/Overview.png";
import Members from "../assets/Members.png";
import Bans from "../assets/Bans.png";
import Admins from "../assets/Admins.png";
import GroupEventsImage from "../assets/GroupEvents2.png";

import { useState } from "react";

const GroupSettings = () => {
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
  const handleSettingsClick = () => {
    setSettingStatus("d");
  };

  const handleGroupEventsClick = () => {
    setSettingStatus("e");
  };

  var selectedButton = "a";
  return (
    <div>
      {settingStatus === "a"
        ? (selectedButton = "a-selected")
        : settingStatus === "b"
        ? (selectedButton = "b-selected")
        : settingStatus === "c"
        ? (selectedButton = "c-selected")
        : settingStatus === "d"
        ? (selectedButton = "d-selected")
        : settingStatus === "e"
        ? (selectedButton = "e-selected")
        : selectedButton}
      <NavBar navType="fnav" />
      <SideNav
        label1="Overview"
        label2="Members"
        label3="Bans"
        label4="Admins"
        label5="Group Events"
        icon1={Overview}
        icon2={Members}
        icon3={Bans}
        icon4={Admins}
        icon5={GroupEventsImage}
        onClick1={handleAccountClick}
        onClick2={handleMyGroupsClick}
        onClick3={handleMyEventsClick}
        onClick4={handleSettingsClick}
        onClick5={handleGroupEventsClick}
        fifth="true"
        selectedButton={selectedButton}
      />
      <div className="inside-settings">
        {settingStatus === "a" ? (
          <Overview1 />
        ) : settingStatus === "b" ? (
          <Member />
        ) : settingStatus === "c" ? (
          <Bans1 />
        ) : settingStatus === "d" ? (
          <Admins1 />
        ) : settingStatus === "e" ? (
          <GroupEvents />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default GroupSettings;
