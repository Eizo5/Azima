import { useNavigate } from "react-router-dom";
import "../Styles/event.css";

export const Event = ({ label, imageUrl, id, event }) => {
  const navigate = useNavigate();

  return (
    <div
      className="event"
      onClick={() =>
        navigate(event === "event" ? `/EventPage/${id}` : `GroupPage/${id}`)
      }
    >
      <img className="event-image" src={imageUrl} alt="" />
      <label className="event-label" htmlFor="img">
        {label}
      </label>
    </div>
  );
};
