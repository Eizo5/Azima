import { useNavigate } from "react-router-dom";

import Comedey from "../assets/Comedy.png";
import Calendar from "../assets/Schedule.svg";
import location from "../assets/location.svg";
import queue from "../assets/queue.svg";

import { Group } from "../data/types";
import "../Styles/event.css";
import useGroup from "../hooks/groupHook";
import { useEffect, useState } from "react";

interface EventProps {
  label: string;
  imageUrl: string;
  id: number;
  isEvent?: boolean;
  isSingle?: boolean;
}

// Fixed
export const Event = ({
  label,
  imageUrl,
  id,
  isEvent = false,
  isSingle = false,
}: EventProps) => {
  const navigate = useNavigate();
  /* const { getGroupMembers, getGroup } = useGroup(); */
  const [groupData, setGroupData] = useState<Group | null>(null);

  /* useEffect(() => {
    !isEvent && getGroup(id).then((res) => setGroupData(res));
  }, []); */

  return (
    <div
      className={isSingle ? "event-single " : "event"}
      onClick={() =>
        navigate(isEvent ? `/EventPage/${id}` : `/GroupPage/${id}`)
      }
    >
      <div className="image-container-hover">
        <img
          className="event-image"
          src={imageUrl || "/src/assets/group-default-image.webp"}
          alt={label}
        />
        <div className="overlay-hover">
          <div className="hovered-items">
            <img src={Comedey} alt="event type" />
            <img src={location} alt="location" />
            <img src={Calendar} alt="date" />
            <img src={queue} alt="Members" />
          </div>
          <div className="hovered-texts">
            <p>{groupData?.categories || "-"}</p>
            <p>{groupData?.location || "-"}</p>
            <p>something3</p>
            <p>something4</p>
          </div>
        </div>
      </div>

      <label className="event-label">{label}</label>
    </div>
  );
};
