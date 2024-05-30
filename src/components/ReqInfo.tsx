import "../Styles/settings.css";
import OurButton from "./OurButton";
import useGroup from "../hooks/groupHook";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ReqInfo = ({ username, imgUrl, memberId }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/UserProfile/${memberId}`);
    window.location.reload();
  };
  return (
    <div className="member-container-no-buttons">
      <div className="image-name-container-member-no-buttons">
        <img
          onClick={navigateToProfile}
          src={imgUrl}
          className="image-member-info"
        />
        <h1 onClick={navigateToProfile} className="member-name bold">
          {username}
        </h1>
      </div>
    </div>
  );
};

export default ReqInfo;
