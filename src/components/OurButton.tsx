import React from "react";
import "../Styles/ourbutton.css";

export const OurButton = ({
  label,
  variant,
  position,
  thin,
  onClick,
  disabled,
}) => {
  return (
    <div className={`${position}`}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`button ${variant} ${thin && "thin"}`}
      >
        {label}
      </button>
    </div>
  );
};
