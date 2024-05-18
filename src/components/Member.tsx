import MemberInfo from "./MemberInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGroup from "../hooks/groupHook";
import { GroupMembers } from "../data/types";

const Members = () => {
  const [groupMembers, setGroupMembers] = useState<GroupMembers[]>([]);
  const { id } = useParams();
  const { getGroupMembers } = useGroup();

  useEffect(() => {
    getGroupMembers(id).then((res) => setGroupMembers(res));
  }, []);

  console.log();
  return (
    <div>
      <h1 className="settings-header">Members Management</h1>
      <h1 className="bold set-label">{groupMembers.length} Members</h1>
      {groupMembers.map((member) => (
        <MemberInfo
          username={member.name}
          imgUrl={member.profile_image}
          memberId={member.ID}
        />
      ))}
    </div>
  );
};

export default Members;
