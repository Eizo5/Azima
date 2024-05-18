import "../Styles/settings.css";
import OurButton from "./OurButton";

import { useParams } from "react-router-dom";
import useGroup from "../hooks/groupHook";

const AdminInfo = ({ username, imgUrl, memberId }) => {
  const { id } = useParams();
  const { removeAdmin } = useGroup();

  const removeAdminClick = (e: any) => {
    e.preventDefault();
    removeAdmin(memberId, id);
    console.log(id);
  };

  return (
    <div>
      <div className="member-container">
        <div className="image-name-container-member">
          <img src={imgUrl} className="image-member-info" />
          <h1 className="member-name bold">{username}</h1>
        </div>
        <div className="buttons-member-info">
          <OurButton label="Demote" thin onClick={removeAdminClick} />
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
