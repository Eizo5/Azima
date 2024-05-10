import "../Styles/checkbox.css";

const Checkbox = ({ label }) => {
  const handleCheckedChange = (event) => {
    // Access the checkbox's checked state from the event object
    console.log("Checkbox is checked:", event.target.checked);
  };

  return (
    <div className="checkbox">
      <label>
        <input type="checkbox" onChange={handleCheckedChange} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
