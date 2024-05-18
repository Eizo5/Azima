import "../Styles/settings.css";
import OurButton from "./OurButton";
import ImgHolder from "../assets/MartinGarrix.png";
import useGroup from "../hooks/groupHook";
import { useParams } from "react-router-dom";

const MemberInfo = ({ username, imgUrl, memberId }) => {
  const { id } = useParams();
  const { banMember, assignAdmin } = useGroup();

  const banMemberClick = (e: any) => {
    banMember(memberId, id);
    console.log("member banned", username, id, memberId);
  };

  const assignAdminClick = () => {
    assignAdmin(memberId, id);
    console.log("Member assigned admin", username);
  };
  return (
    <div className="member-container">
      <div className="image-name-container-member">
        <img src={imgUrl} className="image-member-info" />
        <h1 className="member-name bold">{username}</h1>
      </div>
      <div className="buttons-member-info">
        <OurButton label="Ban" thin variant="alert" onClick={banMemberClick} />
        <OurButton label="Assign Admin" thin onClick={assignAdminClick} />
      </div>
    </div>
  );
};

export default MemberInfo;
