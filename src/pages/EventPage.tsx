import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";
import { Footer } from "../components/Footer";

import "../Styles/eventpage.css";

import Location from "../assets/Location.png";
import Description from "../assets/Description.png";
import Comedy from "../assets/Comedy.png";
import Members from "../assets/Members.png";
import Date from "../assets/date.png";

import "../Styles/groupPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventType, EventUser } from "../data/types";
import useEvent from "../hooks/eventHook";

import useAuthentication from "../hooks/userHook";

import { formatDate } from "../data/helpers";
const EventPage = () => {
  const [eventData, setEventData] = useState<EventType | null>(null);
  //const [eventUsers, setEventUsers] = useState<EventUser[] | null>(null);
  const [eventUser, setEventUser] = useState<EventUser | null>(null);
  const [groupPastEvents, setGroupPastEvents] = useState<EventType[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [conPopup, setConPopup] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { id } = useParams();
  const { getEventData, joinEvent, sendConRequest, getEventUsers } = useEvent();
  const { user } = useAuthentication();

  const eventInfo = [
    { imgSrc: Location, info: eventData?.location },
    {
      imgSrc: Description,
      info: "Peaceful Life is a group where you can find people who loves having a quiet and fulling life, where you can do yoga, Meditation, Park picnics and more!! Join us now.",
    },
    { imgSrc: Comedy, info: "Entertainment " },
    { imgSrc: Members, info: "10 Members " },
    {
      imgSrc: Date,
      info: formatDate(eventData?.event_date) + " - " + eventData?.time,
    },
  ];

  const handleJoinClick = (e: any) => {
    e.preventDefault();
    /*     console.log("eventData?.event_capacity", eventData?.event_capacity);
    console.log("id", id);
    console.log("user?.ID", user?.ID); */
    !eventUser && joinEvent(id, user?.ID);
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
  }, []);

  useEffect(() => {
    getEventUsers(id).then((res) => {
      res?.map((eventUser: EventUser) => {
        if (eventUser.ID === user?.ID) {
          setEventUser(() => eventUser);
        }
      });
    });
  }, [user]);

  return (
    <div>
      {conPopup && (
        <div className="popup">
          <div className="overlay">
            <div className="popup-content">
              <h1>Do you want to help orignize this event</h1>
              <p>
                By clicking on the button below you will send a request to the
                event owner to help organize the event.
              </p>
              <OurButton
                label="Send Request"
                position="center"
                thin
                onClick={handleContributeReq}
              />

              <button className="close-popup" onClick={toggleConPopUp}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <NavBar navType="fnav" />
      <div
        className="img-container"
        style={{
          backgroundImage: `url("${eventData?.event_image}")`,
        }}
      >
        <div className="top-part">
          <h1>{eventData?.name}</h1>
          {!isAdmin && (
            <div className="admin-buttons">
              <OurButton
                label={!eventUser ? "Join" : "Joined"}
                onClick={handleJoinClick}
                variant="transparent"
                thin
                disabled={eventUser}
              />

              {eventData?.is_contribution_allowed && eventUser && (
                <OurButton
                  label={
                    eventUser?.is_con_pending ? "Request sent" : "Contribute"
                  }
                  thin
                  variant="transparent"
                  onClick={toggleConPopUp}
                  disabled={
                    eventUser?.is_con_pending || eventUser?.is_contributor
                  }
                />
              )}
            </div>
          )}
          {isAdmin && (
            <div className="admin-buttons">
              <OurButton label="Join" thin variant="transparent" />
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
      <div className="event-description">
        <h3>Event Program</h3>
        <p>
          A wonderful way to discover three of the most stunning beaches of
          Crete. A convenient way to discover the unique beaches of Glyka Nera
          and Marmara, where you will have enough time to enjoy the turquoise
          waters as well as the secluded fishing village of Loutro, with no
          roads, only accessible by the sea! We take you from Sfakia to Glyka
          Nera (Sweet Water beach) where you have free time to enjoy a swim in
          the clear turquoise water. Then at the time you arrange with your
          captain, you will be picked up and taken to Marmara (marble) beach,
          where you also have free time to enjoy the area. There is a wonderful
          restaurant overlooking the beach which it's our top recommendation for
          a lunch stop. You arrange a time with your captain again to be picked
          up and he will take you to your 3rd stop, the small, picturesque
          village of Loutro, the ideal location for an afternoon coffee and
          swim. You can be picked up at your preferred time and brought back to
          Sfakia.
        </p>
        <h3>Rules: </h3>
        <p>{eventData?.rules}</p>
      </div>
      <div className="others">
        <p>
          <span className="bold">Ticket Price:</span>{" "}
          {eventData?.ticket_price + " " + eventData?.currency}
        </p>
        <p>
          <span className="bold">Included:</span>{" "}
          {eventData?.ticket_included_items}
        </p>
        <p>
          <span className="bold">Not Included:</span>{" "}
          {eventData?.ticket_not_included_items}
        </p>
        <p>
          <span className="bold">Age restriction:</span>{" "}
          {eventData?.age_restriction}
        </p>
        <p>
          <span className="bold">Available tickets:</span>{" "}
          {eventData?.event_capacity}
        </p>
        <p>
          <span className="bold">Return policy:</span>
          {eventData?.return_policy}
        </p>
        <p>
          <span className="bold">Guests:</span> {eventData?.guests}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
