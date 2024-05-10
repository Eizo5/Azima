import { OurButton } from "./OurButton";
import { Event } from "./Event";
import Test from "../assets/Eid.png";
const MyGroups = () => {
  return (
    <div>
      <OurButton position="right" label="Create Group" />
      <h1 className="bold set-label">Owner</h1>
      <div className="events-together">
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
      </div>
      <h1 className="bold set-label">Admin</h1>
      <div className="events-together">
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
      </div>
      <h1 className="bold set-label">Admin</h1>
      <div className="events-together">
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
      </div>
    </div>
  );
};

export default MyGroups;
