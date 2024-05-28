import OurButton from "./OurButton";
import { Event } from "./Event";
import Test from "../assets/Eid.png";
import useAuthentication from "../hooks/userHook";
import { useEffect } from "react";
const MyGroups = () => {
  const { userOwnerGroups, userAdminGroups, userGroups } = useAuthentication();

  return (
    <div>
      <OurButton position="right" label="Create Group" />
      <h1 className="bold set-label">Owner</h1>
      <div className="events-together">
        {userOwnerGroups?.map((group) => (
          <Event
            label={group.name}
            imageUrl={group.group_image}
            id={group.group_id}
          />
        ))}
      </div>
      <h1 className="bold set-label">Admin</h1>
      <div className="events-together">
        {userAdminGroups?.map((group) => (
          <Event
            label={group.name}
            imageUrl={group.group_image}
            id={group.group_id}
          />
        ))}
      </div>
      <h1 className="bold set-label">Member</h1>
      <div className="events-together">
        {userGroups?.map((group) => (
          <Event
            label={group.name}
            imageUrl={group.group_image}
            id={group.group_id}
          />
        ))}
      </div>
    </div>
  );
};

export default MyGroups;
