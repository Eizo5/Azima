import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";
import { EventSlider } from "../components/EventSlider";
import { Footer } from "../components/Footer";

import Location from "../assets/Location.png";
import Description from "../assets/Description.png";
import Comedy from "../assets/Comedy.png";
import Members from "../assets/Members.png";

import "../Styles/popup.css";
import "../Styles/groupPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGroup from "../hooks/groupHook";

import { Group, EventType, User, UserGroup } from "../data/types";
import RequestInfo from "../components/RequestInfo";

import { Link } from "react-router-dom";
import { color } from "@cloudinary/url-gen/qualifiers/background";
import MemberInfo from "../components/MemberInfo";
import useAuthentication from "../hooks/userHook";

// joinStatus === "None"|"Pending"|"Member"
const GroupPage = () => {
  const [groupEvents, setGroupEvents] = useState<EventType[]>([]);
  const [groupPastEvents, setGroupPastEvents] = useState<EventType[]>([]);
  const [groupRequests, setGroupRequests] = useState<User[]>([]);
  const [groupMembers, setGroupMembers] = useState<User[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [groupData, setGroupData] = useState<Group | null>(null);
  const {
    getGroup,
    getGroupEvents,
    getGroupPastEvents,
    getGroupRequests,
    getGroupMembers,
    joinGroup,
    leaveGroup,
  } = useGroup();
  const [popup, setPopup] = useState(false);
  const [membersPopup, setMembersPopUp] = useState(false);
  const [joinsPopup, setjoinPopUp] = useState(false);
  const [userGroup, setUserGroup] = useState<UserGroup | null>(null);
  const { userGroups, user } = useAuthentication();

  const { id } = useParams();

  const eventInfo = [
    { imgSrc: Location, info: groupData?.location },
    {
      imgSrc: Description,
      info: groupData?.description,
    },
    { imgSrc: Comedy, info: groupData?.categories },
    { imgSrc: Members, info: groupMembers.length + " Members " },
  ];

  const navigate = useNavigate();
  const handleAddEventClick = () => {
    navigate(`/CreateEvent/${id}`);
  };

  const handleLeaveClick = () => {
    leaveGroup(user?.ID, id);
  };
  const handleSettingsClick = () => {
    navigate(`/GroupSettings/${id}`);
  };

  const handleJoinClick = (e: any) => {
    e.preventDefault();

    joinGroup(user?.ID, id);
  };

  const togglePopup = (e: any) => {
    e.preventDefault();
    setPopup(!popup);
  };

  const toggleJoinPopup = (e: any) => {
    e.preventDefault();
    setjoinPopUp(!joinsPopup);
    console.log(joinsPopup);
  };

  const toggleMemberPop = (e: any) => {
    setMembersPopUp(!membersPopup);
  };

  const checkIsOwner = () => {
    groupData?.owner_id === user?.ID ? setIsOwner(true) : setIsOwner(false);
  };
  popup
    ? document.body.classList.add("active-popup")
    : document.body.classList.remove("active-popup");
  joinsPopup
    ? document.body.classList.add("active-popup")
    : document.body.classList.remove("active-popup");
  membersPopup
    ? document.body.classList.add("active-popup")
    : document.body.classList.remove("active-popup");
  useEffect(() => {
    getGroup(id).then((res) => setGroupData(res));
    getGroupEvents(id).then((res) => setGroupEvents(res));
    getGroupMembers(id).then((res) => setGroupMembers(res));
    getGroupRequests(id).then((res) => setGroupRequests(res));
    getGroupPastEvents(id).then((res) => setGroupPastEvents(res));
  }, []);

  useEffect(() => {
    userGroups?.map((group) => {
      group.group_id === Number(id) && setUserGroup(group);
    });
    checkIsOwner();
  });
  return (
    <div>
      <NavBar navType="fnav" />
      {userGroup?.is_banned ? (
        <div className="banned-group">
          <h1>You are banned from this group</h1>
          <OurButton
            label="HomePage"
            position="center"
            onClick={() => navigate("/home")}
          />
        </div>
      ) : (
        <>
          {" "}
          {popup && (
            <div className="popup">
              <div className="overlay">
                <div className="popup-content">
                  <h3>Requests: </h3>
                  {groupRequests.map((user) => (
                    <RequestInfo
                      username={user.username}
                      imgUrl={user.profile_image}
                      memberId={user.ID}
                    />
                  ))}

                  <button className="close-popup" onClick={togglePopup}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {joinsPopup && (
            <div className="popup">
              <div className="overlay">
                <div className="popup-content">
                  {groupData?.is_private_group ? (
                    <>
                      {" "}
                      <h3>{groupData?.name} is private</h3>
                    </>
                  ) : (
                    <h3>{groupData?.name} is public</h3>
                  )}

                  <OurButton
                    label={
                      groupData?.is_private_group ? "Join Request" : "Join"
                    }
                    position="center"
                    thin
                    onClick={handleJoinClick}
                  />

                  <button className="close-popup" onClick={toggleJoinPopup}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {membersPopup && (
            <div className="popup">
              <div className="overlay">
                <div className="popup-content">
                  <h3>Requests: </h3>
                  {groupMembers.map((user) => (
                    <MemberInfo
                      username={user.username}
                      imgUrl={user.profile_image}
                      memberId={user.ID}
                    />
                  ))}
                  <button className="close-popup" onClick={toggleMemberPop}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            className="img-container"
            style={{
              backgroundImage: `url("${groupData?.group_image}")`,
            }}
          >
            <div className="top-part">
              <h1>{groupData?.name}</h1>

              {userGroup && !userGroup?.is_admin && !isOwner ? (
                <OurButton
                  label={userGroup?.is_pending ? "Request Sent" : "Leave"}
                  onClick={handleLeaveClick}
                  variant="transparent"
                  thin
                  disabled={userGroup?.is_pending}
                />
              ) : (
                !userGroup &&
                !isOwner && (
                  <OurButton
                    label="Join"
                    onClick={toggleJoinPopup}
                    variant="transparent"
                    thin
                  />
                )
              )}
              {userGroup?.is_admin && !isOwner && (
                <div className="admin-buttons">
                  <OurButton
                    label="Requests"
                    thin
                    variant="transparent"
                    onClick={togglePopup}
                  />
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

                  <OurButton
                    label="Leave"
                    thin
                    variant="transparent"
                    onClick={handleLeaveClick}
                  />
                </div>
              )}
              {isOwner && (
                <div className="admin-buttons">
                  <OurButton
                    label="Requests"
                    thin
                    variant="transparent"
                    onClick={togglePopup}
                  />
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
              {eventInfo?.map(({ imgSrc, info }, index) => (
                <div key={index} className="info">
                  <img src={imgSrc} alt="" />
                  {index === 3 ? (
                    <p
                      className="member-hover"
                      onClick={toggleMemberPop}
                      style={{ color: "white", textDecoration: "underline" }}
                    >
                      {info || "-"}
                    </p>
                  ) : Array.isArray(info) && info.length > 0 ? (
                    info.map(({ category_id, name }) => (
                      <p key={category_id} style={{ width: "auto" }}>
                        {name}
                        {category_id !== info.length && ", "}
                      </p>
                    ))
                  ) : (
                    <p>{info || "-"}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {groupEvents.length !== 0 && (
            <EventSlider isEvent object={groupEvents} label="New Events" />
          )}
          {groupPastEvents && (
            <EventSlider isEvent object={groupPastEvents} label="Past Events" />
          )}
          {groupEvents.length === 0 && !groupPastEvents && (
            <label>No Events found</label>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default GroupPage;
