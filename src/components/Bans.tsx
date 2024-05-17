import "../Styles/settings.css";
import BannedInfo from "./BannedInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GroupMembers } from "../data/types";
import useGroup from "../hooks/groupHook";

const Bans = () => {
  const [bannedMembers, setBannedMembers] = useState<GroupMembers[]>([]);
  const { id } = useParams();
  const { getBannedMembers } = useGroup();

  useEffect(() => {
    getBannedMembers(id).then((res) => setBannedMembers(res));
  }, []);

  return (
    <div>
      <h1 className="settings-header">Bans</h1>
      {bannedMembers.map((member) => (
        <BannedInfo
          username={member.username}
          imgUrl={member.profile_image}
          ban={member.ID}
        />
      ))}
    </div>
  );
};

export default Bans;
