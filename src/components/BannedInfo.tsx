import "../Styles/settings.css";
import OurButton from "./OurButton";
import ImgHolder from "../assets/MartinGarrix.png";
import useGroup from "../hooks/groupHook";
import { useParams } from "react-router-dom";

const BannedInfo = ({ username, imgUrl, ban }) => {
  const { id } = useParams();
  const { removeBan } = useGroup();

  const removeBanClick = (e: any) => {
    e.preventDefault();
    removeBan(ban, id);
    console.log("Member Unbanned");
  };

  return (
    <div className="member-container">
      <div className="image-name-container-member">
        <img src={imgUrl} className="image-member-info" />
        <h1 className="member-name bold">{username}</h1>
      </div>
      <div className="buttons-member-info">
        <OurButton label="Remove Ban" thin onClick={removeBanClick} />
      </div>
    </div>
  );
};

export default BannedInfo;
