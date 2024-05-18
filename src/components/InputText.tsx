import React from "react";
import "../Styles/inputText.css";

export const InputText = ({
  label,
  placeholder,
  thin,
  value,
  onChange,
  name,
  defaultValue,
  date,
}) => {
  return (
    <div className="input-text">
      <label htmlFor={name}>{label}</label>
      <input
        className={`text  ${thin && "inputThin"}`}
        type={date ? "date" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        defaultValue={defaultValue}
      />
    </div>
  );
};
