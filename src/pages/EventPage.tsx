import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";
import { EventSlider } from "../components/EventSlider";
import { Footer } from "../components/Footer";

import "../Styles/eventpage.css";

import Location from "../assets/Location.png";
import Description from "../assets/Description.png";
import Comedy from "../assets/Comedy.png";
import Members from "../assets/Members.png";

import "../Styles/groupPage.css";
import { useState } from "react";

const EventPage = ({
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
              <OurButton label="Join" thin variant="transparent" />
              <OurButton label="Contribute" thin variant="transparent" />
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
      </div>
      <div className="others">
        <p>
          <span className="bold">Age restriction:</span> Suitable to all ages.
        </p>
        <p>
          <span className="bold">Available tickets:</span> 100 tickets.
        </p>
        <p>
          <span className="bold">Return policy:</span> Refunds are accepted up
          to 9 days before the event.
        </p>
        <p>
          <span className="bold">Contributors:</span> Abdulaziz Faham
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
