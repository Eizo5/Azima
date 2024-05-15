import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";
import { EventSlider } from "../components/EventSlider";
import { Footer } from "../components/Footer";

import Location from "../assets/Location.png";
import Description from "../assets/Description.png";
import Comedy from "../assets/Comedy.png";
import Members from "../assets/Members.png";

import "../Styles/groupPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// joinStatus === "None"|"Pending"|"Member"
const GroupPage = ({
  label,
  location,
  description,
  genre,
  members,
  imgurl,
}) => {
  const [joinStatus, setJoinStatus] = useState("None");
  const [isAdmin, setIsAdmin] = useState(true);

  const eventInfo = [
    { imgSrc: Location, info: "Istanbul, Turkey" },
    {
      imgSrc: Description,
      info: "Peaceful Life is a group where you can find people who loves having a quiet and fulling life, where you can do yoga, Meditation, Park picnics and more!! Join us now.",
    },
    { imgSrc: Comedy, info: "Entertainment " },
    { imgSrc: Members, info: "10 Members " },
  ];

  const navigate = useNavigate();
  const handleAddEventClick = () => {
    navigate("/CreateEvent");
  };

  const handleSettingsClick = () => {
    navigate("/GroupSettings");
  };
  return (
    <div>
      <NavBar navType="fnav" />
      <div
        className="img-container"
        style={{
          backgroundImage: `url("${imgurl}")`,
        }}
      >
        <div className="top-part">
          <h1>{label}</h1>
          {joinStatus !== "Member" && !isAdmin && (
            <OurButton
              label={joinStatus === "None" ? "Join" : "Request Sent"}
              onClick={() => {
                setJoinStatus("Pending");
              }}
              variant="transparent"
              thin
              disabled={joinStatus === "Pending"}
            />
          )}
          {isAdmin && (
            <div className="admin-buttons">
              <OurButton label="Request" thin variant="transparent" />
              <OurButton
                label="Add Event"
                thin
                variant="transparent"
                onClick={handleAddEventClick}
              />
              <OurButton
                label="Settings"
                thin
                variant="transparent"
                onClick={handleSettingsClick}
              />
            </div>
          )}
        </div>
        <div className="info-container">
          {eventInfo.map(({ imgSrc, info }, index) => (
            <div key={index} className="info">
              <img src={imgSrc} alt="" />
              <p>{info}</p>
            </div>
          ))}
        </div>
      </div>
      <EventSlider />
      <EventSlider />
      <Footer />
    </div>
  );
};

export default GroupPage;
