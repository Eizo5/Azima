import "../Styles/settings.css";
import { Event } from "./Event";
import Test from "../assets/Eid.png";

const GroupEvents = () => {
  return (
    <div>
      <h1 className="settings-header">Group Events</h1>
      <div className="events-together">
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
        <Event label="Test" imageUrl={Test} />
      </div>
    </div>
  );
};

export default GroupEvents;
