import React, { useState } from "react";
import "../Styles/dropdown.css";

const Dropdown = ({ label }) => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="dropdown">{label}</label>
      <select
        className="dropdown"
        id="dropdown"
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default Dropdown;
