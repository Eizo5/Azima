import OurButton from "./OurButton";
import { Event } from "./Event";
import Test from "../assets/Eid.png";
import useAuthentication from "../hooks/userHook";
import { isDateInPast } from "../data/helpers";
const MyEvents = () => {
  const { userEvents } = useAuthentication();

  return (
    <div>
      <h1 className="settings-header push-down">My Events</h1>
      <h2 className="my-events-headers bold ">Scheduled Events</h2>
      <div className="events-together">
        {userEvents?.map(
          (userEvent) =>
            !isDateInPast(userEvent.event_date) && (
              <Event
                label={userEvent.name}
                isSingle
                isEvent
                imageUrl={userEvent.event_image}
                id={userEvent.event_id}
              />
            )
        )}
      </div>
      <h2 className="my-events-headers bold ">Your a Contriubtor Here</h2>
      <div className="events-together">
        {userEvents?.map(
          (userEvent) =>
            userEvent.is_contributer &&
            !isDateInPast(userEvent.event_date) && (
              <Event
                label={userEvent.name}
                isSingle
                isEvent
                imageUrl={userEvent.event_image}
                id={userEvent.event_id}
              />
            )
        )}
      </div>
      <h2 className="my-events-headers bold ">Member</h2>
      <div className="events-together">
        {userEvents?.map(
          (userEvent) =>
            isDateInPast(userEvent.event_date) && (
              <Event
                isSingle
                isEvent
                label={userEvent.name}
                imageUrl={userEvent.event_image}
                id={userEvent.event_id}
              />
            )
        )}
      </div>
    </div>
  );
};

export default MyEvents;
