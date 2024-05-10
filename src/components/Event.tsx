import React from "react";
import "../Styles/event.css";
export const Event = ({ label, imageUrl }) => {
  return (
    <div className="event">
      <img className="event-image" src={imageUrl} alt="" />
      <label className="event-label" htmlFor="img">
        {label}
      </label>
    </div>
  );
};
