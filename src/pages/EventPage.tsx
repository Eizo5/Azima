import "swiper/css";
import "swiper/swiper-bundle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import RatingSlide from "../components/RatingSlide";
import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";
import { Footer } from "../components/Footer";

import "../Styles/eventpage.css";
import Location from "../assets/Location.png";
import Description from "../assets/Description.png";
import Ticket from "../assets/Ticket.svg";
import Members from "../assets/Neighbor.svg";
import _Date from "../assets/date.svg";

import "../Styles/groupPage.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventType, EventUser, RatingType } from "../data/types";
import useEvent from "../hooks/eventHook";

import useAuthentication from "../hooks/userHook";

import { formatDate } from "../data/helpers";
import { InputDesc } from "../components/InputDesc";

const EventPage = () => {
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [eventUser, setEventUser] = useState<EventUser | null>(null);
  const [ratings, setRatings] = useState<RatingType[] | null>(null);

  const [conPopup, setConPopup] = useState(false);
  const [ratePopup, setRatePopup] = useState(false);

  const [didUserRate, setDidUserRate] = useState(false);
  const [isPast, setIsPast] = useState(false);
  const { id } = useParams();
  const {
    getEventData,
    joinEvent,
    leaveEvent,
    sendConRequest,
    rateEvent,
    getEventUsers,
    getEventRatings,
  } = useEvent();
  const { user } = useAuthentication();
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");

  const eventInfo = [
    { imgSrc: Location, info: eventData?.location },
    {
      imgSrc: Description,
      info: eventData?.event_capacity + " Available tickets",
    },
    { imgSrc: Members, info: eventData?.guests },
    {
      imgSrc: _Date,
      info: formatDate(eventData?.event_date) + " - " + eventData?.time,
    },
    { imgSrc: Ticket, info: eventData?.ticket_price },
  ];

  const handleRateClick = (e: any) => {
    e.preventDefault();
    rateEvent(star, comment, id, user?.ID);
    window.location.reload();
  };
  const handleJoinClick = (e: any) => {
    e.preventDefault();
    !eventUser && joinEvent(id, user?.ID);
    window.location.reload();
  };
  const handleLeaveClick = (e: any) => {
    e.preventDefault();
    leaveEvent(user?.ID, id);
    window.location.reload();
  };

  const handleContributeReq = (e: any) => {
    e.preventDefault();
    sendConRequest(id, user?.ID);
  };

  const toggleConPopUp = () => {
    setConPopup(!conPopup);
  };

  const toggleRatePopUp = () => {
    setRatePopup(!ratePopup);
  };

  conPopup
    ? document.body.classList.add("active-popup")
    : document.body.classList.remove("active-popup");

  function isDateInPast(date) {
    const inputDate = new Date(date); // Convert the input to a Date object

    const currentDate = new Date(); // Get the current date and time

    // Compare the input date with the current date
    return inputDate < currentDate;
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEventData(id);
      setEventData(data);
      const ratings = await getEventRatings(id);
      setRatings(ratings);
      if (data?.event_date && isDateInPast(data.event_date)) {
        setIsPast(true);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    getEventUsers(id).then((res) => {
      res?.map((eventUser: EventUser) => {
        if (eventUser.ID === user?.ID) {
          setEventUser(() => eventUser);
        }
      });
    });
  }, [user]);

  useEffect(() => {
    if (ratings) {
      ratings.map((rating) => {
        if (rating.user_id === user?.ID) {
          setDidUserRate(true);
        }
      });
    }
  }, [ratings]);

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
      {ratePopup && (
        <div className="popup">
          <div className="overlay">
            <div className="popup-content">
              <Box
                sx={{
                  "& > legend": {
                    mt: 2,
                    fontSize: "2.7rem",
                    marginLeft: "13.5rem",
                    width: "20rem",
                  },

                  "& .MuiRating-icon": {
                    fontSize: "4rem",
                    marginLeft: "4rem",
                  },
                }}
              >
                <Typography component="legend">Rate the event</Typography>
                <Rating
                  size="large"
                  name="simple-controlled"
                  value={star}
                  onChange={(event, newValue) => {
                    setStar(newValue || 0);
                  }}
                />
              </Box>
              <div className="rating-comment">
                <InputDesc
                  isTextArea
                  placeholder={"Leave a comment"}
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />

                <OurButton
                  label="Rate"
                  position="center"
                  thin
                  onClick={handleRateClick}
                />
              </div>

              <button className="close-popup" onClick={toggleRatePopUp}>
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
          position: "relative",
        }}
      >
        <img
          src={eventData?.event_image || "/event-default.jpg"}
          alt={eventData?.name}
          className="event-img"
        />
        <div className="top-part1">
          <h1>{eventData?.name}</h1>

          <div className="admin-buttons">
            {isPast && (
              <OurButton
                label={didUserRate ? "Rating Submited" : "Rate Event"}
                onClick={toggleRatePopUp}
                variant="transparent"
                thin
                disabled={didUserRate}
              />
            )}
            {!eventUser?.is_con_pending && !isPast && (
              <>
                <OurButton
                  label={!eventUser ? "Join" : "Leave"}
                  onClick={!eventUser ? handleJoinClick : handleLeaveClick}
                  variant="transparent"
                  thin
                />

                {eventData?.is_contribution_allowed && eventUser && (
                  <OurButton
                    label={
                      eventUser?.is_con_pending
                        ? "Request sent"
                        : eventUser?.is_contributer
                        ? "Contributer"
                        : "Contribute"
                    }
                    thin
                    variant="transparent"
                    onClick={toggleConPopUp}
                    disabled={
                      eventUser?.is_con_pending || eventUser?.is_contributer
                    }
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="info-container">
          {eventInfo.map(({ imgSrc, info }, index) => (
            <div key={index} className="info">
              <img src={imgSrc} alt="" />
              <p>{info || " -"}</p>
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
          <span className="bold">Ticket Price:</span> {eventData?.ticket_price}
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
          <span className="bold">Return policy: </span>
          {eventData?.return_policy}
        </p>
        <p>
          <span className="bold">Guests:</span> {eventData?.guests}
        </p>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {ratings?.map((group) => (
          <SwiperSlide>
            <RatingSlide rating={group} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Footer />
    </div>
  );
};

export default EventPage;
