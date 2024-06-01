import "../Styles/settings.css";
import OurButton from "./OurButton";
import useGroup from "../hooks/groupHook";
import { useParams } from "react-router-dom";
import { GroupMembers } from "../data/types";

const MemberInfo = ({
  username,
  imgUrl,
  memberId,
  isOwner,

  owner_id,
}) => {
  const { id } = useParams();
  const { banMember, assignAdmin } = useGroup();

  const banMemberClick = (e: any) => {
    e.preventDefault();
    banMember(memberId, id);
    window.location.reload();
  };

  const checkIsOwner = (user: GroupMembers) => {
    return owner_id === user.ID;
  };

  const assignAdminClick = () => {
    assignAdmin(memberId, id);
  };
  return (
    <div className="member-container">
      <div className="image-name-container-member">
        <img src={imgUrl} className="image-member-info" />
        <h1 className="member-name bold">{username}</h1>
      </div>
      <div className="buttons-member-info">
        {!isOwner ? (
          <>
            <OurButton
              label="Ban"
              thin
              variant="alert"
              onClick={banMemberClick}
            />
            <OurButton label="Assign Admin" thin onClick={assignAdminClick} />
          </>
        ) : (
          <p className="owner-members-settings">Owner</p>
        )}
      </div>
    </div>
  );
};

export default MemberInfo;
