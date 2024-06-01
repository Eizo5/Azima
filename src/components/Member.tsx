import MemberInfo from "./MemberInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGroup from "../hooks/groupHook";
import { GroupMembers } from "../data/types";
import Admins from "./Admins";

const Members = ({ owner_id }) => {
  const [groupMembers, setGroupMembers] = useState<GroupMembers[]>([]);
  const [admins, setAdmins] = useState<GroupMembers[]>([]);
  const { id } = useParams();

  const { getGroupMembers, getAdmins } = useGroup();

  const checkIsOwner = (user: GroupMembers) => {
    return owner_id === user.ID;
  };

  useEffect(() => {
    getGroupMembers(id).then((res) => setGroupMembers(res));
    getAdmins(id).then((res) => setAdmins(res));
  }, []);

  return (
    <div>
      <h1 className="settings-header">Members</h1>
      <h1 className="bold set-label">{groupMembers?.length} Members</h1>
      <div className="members-container-members">
        {groupMembers?.map(
          (member) =>
            checkIsOwner(member) && (
              <MemberInfo
                key={member.ID}
                username={member.username}
                imgUrl={member.profile_image}
                memberId={member.ID}
                isOwner={checkIsOwner(member)}
              />
            )
        )}

        {groupMembers?.map(
          (member) =>
            !checkIsOwner(member) && (
              <MemberInfo
                key={member.ID}
                username={member.username}
                imgUrl={member.profile_image}
                memberId={member.ID}
                isAdmin
              />
            )
        )}
      </div>
    </div>
  );
};

export default Members;
