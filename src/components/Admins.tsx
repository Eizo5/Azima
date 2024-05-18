import "../Styles/settings.css";
import AdminInfo from "./AdminInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGroup from "../hooks/groupHook";
import { GroupMembers } from "../data/types";

const Admins = () => {
  const [admins, setAdmins] = useState<GroupMembers[]>([]);
  const { id } = useParams();
  const { getAdmins } = useGroup();

  useEffect(() => {
    getAdmins(id).then((res) => setAdmins(res));
  });
  return (
    <div>
      <h1 className="settings-header">Admins</h1>
      {admins.map((admin) => (
        <AdminInfo
          username={admin.username}
          imgUrl={admin.profile_image}
          memberId={admin.ID}
        />
      ))}
    </div>
  );
};

export default Admins;
