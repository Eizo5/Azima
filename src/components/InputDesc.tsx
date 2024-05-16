import React from "react";
import "../Styles/inputText.css";

export const InputDesc = ({ label, placeholder, value, onChange, name }) => {
  return (
    <div className="input-text">
      <label htmlFor="input">{label}</label>
      <input
        className="desc"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
