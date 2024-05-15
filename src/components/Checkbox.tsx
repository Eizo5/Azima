import "../Styles/checkbox.css";

const Checkbox = ({ label, checked, onChange }) => {
  const handleCheckedChange = (event: any) => {
    // Access the checkbox's checked state from the event object
    console.log("Checkbox is checked:", event.target.checked);
  };

  return (
    <div className="checkbox">
      <label>
        <input type="checkbox" onChange={onChange} checked={checked} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
