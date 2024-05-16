import { useEffect, useState } from "react";
import axios from "axios";
import useAuthentication from "./userHook";

const useEvent = () => {
  const [events, setEvents] = useState([]);

  const { user } = useAuthentication();

  // Get groups if user is logged in
  const getMyEvents = async () => {
    try {
      if (user) {
        const response = await axios.post("http://localhost:9000/userEvents", {
          user_id: user.ID,
        });

        setEvents(() => response.data);
      }
    } catch (error: any) {
      console.error("Couldn't get events");
    }
  };

  useEffect(() => {
    getMyEvents();
  }, [user]);

  return { events, getMyEvents };
};

export default useEvent;
