import React from "react";
import "../Styles/inputText.css";

export const InputDesc = ({ label, placeholder }) => {
  return (
    <div className="input-text">
      <label htmlFor="input">{label}</label>
      <input className="desc" type="text" placeholder={placeholder} />
    </div>
  );
};
