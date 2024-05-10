import "../Styles/settings.css";
import { OurButton } from "./OurButton";
import ImgHolder from "../assets/MartinGarrix.png";

const MemberInfo = () => {
  return (
    <div className="member-container">
      <div className="image-name-container-member">
        <img src={ImgHolder} className="image-member-info" />
        <h1 className="member-name bold">Abdulaziz Faham</h1>
      </div>
      <div className="buttons-member-info">
        <OurButton label="Ban" thin variant="alert" />
        <OurButton label="Assign Admin" thin />
      </div>
    </div>
  );
};

export default MemberInfo;
