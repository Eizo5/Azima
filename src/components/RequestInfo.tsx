import "../Styles/settings.css";
import OurButton from "./OurButton";

import { useParams } from "react-router-dom";
import useGroup from "../hooks/groupHook";

const RequestInfo = ({ username, imgUrl, memberId }) => {
  const { id } = useParams();
  const { removeAdmin } = useGroup();

  const removeAdminClick = (e: any) => {
    e.preventDefault();
    removeAdmin(memberId, id);
  };

  return (
    <div>
      <div className="member-container-group">
        <div className="image-name-container-member">
          <img src={imgUrl} className="image-member-info" />
          <h1 className="member-name bold">{username}</h1>
        </div>
        <div className="buttons-member-info">
          <OurButton label="Accept" thin onClick={() => {}} />
          <OurButton label="Reject" variant="alert" thin onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default RequestInfo;
