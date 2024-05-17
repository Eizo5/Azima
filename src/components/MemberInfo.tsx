import "../Styles/settings.css";
import OurButton from "./OurButton";
import ImgHolder from "../assets/MartinGarrix.png";
import useGroup from "../hooks/groupHook";
import { useParams } from "react-router-dom";

const MemberInfo = ({ username, imgUrl, ban }) => {
  const { id } = useParams();
  const { banMember } = useGroup();

  const banMemberClick = (e: any) => {
    e.preventDefault();
    banMember(ban, id);
    console.log("member banned", username, id, ban);
  };
  return (
    <div className="member-container">
      <div className="image-name-container-member">
        <img src={imgUrl} className="image-member-info" />
        <h1 className="member-name bold">{username}</h1>
      </div>
      <div className="buttons-member-info">
        <OurButton label="Ban" thin variant="alert" onClick={banMemberClick} />
        <OurButton label="Assign Admin" thin />
      </div>
    </div>
  );
};

export default MemberInfo;
