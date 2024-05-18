import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";
import { EventSlider } from "../components/EventSlider";
import { Footer } from "../components/Footer";

import Location from "../assets/Location.png";
import Description from "../assets/Description.png";
import Comedy from "../assets/Comedy.png";
import Members from "../assets/Members.png";

import "../Styles/groupPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGroup from "../hooks/groupHook";

import { Group, EventType } from "../data/types";

// joinStatus === "None"|"Pending"|"Member"
const GroupPage = () => {
  const [groupEvents, setGroupEvents] = useState<EventType[]>([]);
  const [joinStatus, setJoinStatus] = useState("None");
  const [isAdmin, setIsAdmin] = useState(true);
  const [groupData, setGroupData] = useState<Group | null>(null);
  const { getGroup, getGroupEvents } = useGroup();

  const { id } = useParams();

  const eventInfo = [
    { imgSrc: Location, info: groupData?.location },
    {
      imgSrc: Description,
      info: groupData?.description,
    },
    { imgSrc: Comedy, info: groupData?.categories },
    { imgSrc: Members, info: "10 Members " },
  ];

  const navigate = useNavigate();
  const handleAddEventClick = () => {
    navigate(`/CreateEvent/${id}`);
  };

  const handleSettingsClick = () => {
    navigate(`/GroupSettings/${id}`);
  };

  useEffect(() => {
    getGroup(id).then((res) => setGroupData(res));
    getGroupEvents(id).then((res) => setGroupEvents(res));
  }, []);

  return (
    <div>
      <NavBar navType="fnav" />
      <div
        className="img-container"
        style={{
          backgroundImage: `url("${groupData?.group_image}")`,
        }}
      >
        <div className="top-part">
          <h1>{groupData?.name}</h1>
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
              <OurButton label="Requests" thin variant="transparent" />
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
      <EventSlider event object={groupEvents} label="New Events" />
      <EventSlider event object={groupEvents} label="Past Events" />
      <Footer />
    </div>
  );
};

export default GroupPage;
