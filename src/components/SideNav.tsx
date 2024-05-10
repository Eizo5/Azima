import "../Styles/sidenav.css";

const SideNav = ({
  selectedButton,
  onClick1,
  onClick2,
  onClick3,
  onClick4,
  onClick5,
  label1,
  label2,
  label3,
  label4,
  label5,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  fifth,
}) => {
  return (
    <div className="side-nav">
      <div className="sidebuttons">
        <button
          onClick={onClick1}
          className={`side-nav-buttons  ${
            selectedButton === "a-selected" ? "selectedButton" : ""
          }`}
        >
          <div className="button-container ">
            <img src={icon1} />{" "}
            <label className="setting-label">{label1}</label>
          </div>
        </button>
        <button
          onClick={onClick2}
          className={`side-nav-buttons  ${
            selectedButton === "b-selected" ? "selectedButton" : ""
          }`}
        >
          <div className="button-container">
            <img src={icon2} />{" "}
            <label className="setting-label">{label2}</label>
          </div>
        </button>
        <button
          onClick={onClick3}
          className={`side-nav-buttons  ${
            selectedButton === "c-selected" ? "selectedButton" : ""
          }`}
        >
          <div className="button-container">
            <img src={icon3} />{" "}
            <label className="setting-label">{label3}</label>
          </div>
        </button>
        <button
          onClick={onClick4}
          className={`side-nav-buttons  ${
            selectedButton === "d-selected" ? "selectedButton" : ""
          }`}
        >
          <div className="button-container">
            <img src={selectedButton === "d-selected" ? icon1 : icon4} />{" "}
            <label className="setting-label">{label4}</label>
          </div>
        </button>
        {fifth === "true" ? (
          <button
            onClick={onClick5}
            className={`side-nav-buttons  ${
              selectedButton === "e-selected" ? "selectedButton" : ""
            }`}
          >
            <div className="button-container">
              <img src={icon5} />{" "}
              <label className="setting-label">{label5}</label>
            </div>
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
export default SideNav;
