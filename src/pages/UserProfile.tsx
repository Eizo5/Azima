import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";
import { EventSlider } from "../components/EventSlider";
import { Footer } from "../components/Footer";

import "../Styles/eventpage.css";

import Location from "../assets/Location.png";
import Description from "../assets/Description.png";
import Comedy from "../assets/Comedy.png";
import Members from "../assets/Members.png";
import Date from "../assets/date.png";
import GroupImage from "../assets/groupimg.png";

import "../Styles/groupPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EventType,
  EventUser,
  UserGroup,
  Group,
  User,
  UserProfiles,
} from "../data/types";
import useEvent from "../hooks/eventHook";

import useAuthentication from "../hooks/userHook";
import { formatDate } from "../data/helpers";

const UserProfile = () => {
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [userGroups, setUserGroups] = useState<UserGroup[] | null>(null);
  const [userAdminGroups, setUserAdminGroups] = useState<Group[] | null>(null);
  const [userOwnerGroups, setUserOwnerGroups] = useState<Group[] | null>(null);
  const [eventUsers, setEventUsers] = useState<EventUser[] | null>(null);
  const [eventUser, setEventUser] = useState<EventUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [conPopup, setConPopup] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { id } = useParams();
  const { getEventData, joinEvent, sendConRequest, getEventUsers } = useEvent();
  const {
    user,
    getUser,
    getUserGroupsDiff,
    getUserAdminGroupsDiff,
    getUserOwnerGroupsDiff,
  } = useAuthentication();

  const eventInfo = [
    !userData?.is_name_private && {
      imgSrc: Location,
      info: userData?.name + " " + userData?.surname,
    },
    !userData?.is_email_private && {
      imgSrc: Description,
      info: userData?.email,
    },
    { imgSrc: Comedy, info: formatDate(userData?.birthdate) },
    { imgSrc: Members, info: userGroups?.length + " Groups " },
  ];

  const handleJoinClick = (e: any) => {
    e.preventDefault();

    !isJoined && joinEvent(id, user?.ID);
    setIsJoined(true);
  };

  const handleContributeReq = (e: any) => {
    e.preventDefault();
    sendConRequest(id, user?.ID);
  };

  const toggleConPopUp = () => {
    setConPopup(!conPopup);
  };
  conPopup
    ? document.body.classList.add("active-popup")
    : document.body.classList.remove("active-popup");
  useEffect(() => {
    getEventData(id).then((res) => setEventData(res));
    if (!eventData?.event_capacity || eventData?.event_capacity <= 0) {
      // Handle the case where event_capacity is undefined or less than or equal to 0
      setIsFull(true);
    }
    getEventUsers(id).then((res) => {
      setEventUsers(res);
    });
    getUserGroupsDiff(id).then((res) => setUserGroups(res));
    getUserOwnerGroupsDiff(id).then((res) => setUserOwnerGroups(res));
    getUserAdminGroupsDiff(id).then((res) => setUserAdminGroups(res));
  }, []);
  useEffect(() => {
    eventUsers?.map((eventUser) => {
      if (eventUser.ID === user?.ID) {
        setIsJoined(true);
        setEventUser(eventUser);
      }
    });

    getUser(id).then((res) => {
      setUserData(res);
    });
  }, []);

  console.log("user", userData);
  return (
    <div>
      <NavBar navType="fnav" />
      <div
        className="img-container"
        style={{
          backgroundImage: `url("assets/groupimg.png")`,
        }}
      >
        <div className="top-part">
          <h1>{userData?.username}</h1>
        </div>
        <div className="info-container">
          {eventInfo.map(({ imgSrc, info }, index) => (
            <div key={index} className="info">
              <img src={imgSrc} alt="" />
              <p>{info}</p>
            </div>
          ))}
        </div>
        <img
          src={userData?.profile_image}
          alt="profilepic"
          className="profile-image"
        />
      </div>
      <EventSlider
        label={userData?.username + " Owned Groups"}
        object={userOwnerGroups}
      />
      <EventSlider
        label={userData?.username + " Admin Groups"}
        object={userAdminGroups}
      />
      <Footer />
    </div>
  );
};

export default UserProfile;
