import { useNavigate } from "react-router-dom";

import "../Styles/event.css";

interface EventProps {
  label: string;
  imageUrl: string;
  id: number;
  isEvent?: boolean;
}

// Fixed
export const Event = ({ label, imageUrl, id, isEvent = false }: EventProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="event"
      onClick={() =>
        navigate(isEvent ? `/EventPage/${id}` : `/GroupPage/${id}`)
      }
    >
      <img
        className="event-image"
        src={imageUrl || "/group-default-image.webp"}
        alt={label}
      />
      <label className="event-label">{label}</label>
    </div>
  );
};
