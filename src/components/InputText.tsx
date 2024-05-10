import React from "react";
import "../Styles/inputText.css";
export const InputText = ({ label, placeholder, thin }) => {
  return (
    <div className="input-text">
      <label htmlFor="input">{label}</label>
      <input
        className={`text  ${thin && "inputThin"}`}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
