import OurButton from "./OurButton";
import { Event } from "./Event";
import Test from "../assets/Eid.png";
import useAuthentication from "../hooks/userHook";
const MyEvents = () => {
  const { userEvents } = useAuthentication();
  return (
    <div>
      <OurButton position="right" label="Create Group" />
      <h1 className="bold set-label">Scheduled Events</h1>
      <div className="events-together">
        {userEvents?.map((event: any) => (
          <Event
            label={event.name}
            imageUrl={event.event_image}
            id={event.ID}
          />
        ))}
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

export default MyEvents;
