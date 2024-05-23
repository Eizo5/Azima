import { useEffect, useState } from "react";
import axios from "axios";
import useAuthentication from "./userHook";

import { useNavigate } from "react-router-dom";

const useEvent = () => {
  const [event, setEvent] = useState([]);
  const { user } = useAuthentication();
  const navigate = useNavigate();
  // Get groups if user is logged in
  /*  const getMyEvents = async () => {
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
*/

  const createEvent = async (eventData: any) => {
    try {
      console.log("Navigated");
      const response = await axios.post(
        "http://localhost:9000/createEvent",
        eventData
      );
      console.log("Navigated2");
      setEvent(() => response.data);

      navigate(`/EventPage/${response.data.event_id}`);
      console.log("Navigated");
    } catch (error) {
      console.error(error);
    }
  };

  const getEventData = async (event_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getEventData/${event_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const joinEvent = async (event_id: string | undefined, user_id: any) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/joinEvent/${event_id}`,
        { user_id }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendConRequest = async (event_id: any, user_id: any) => {
    try {
      const response = await axios.put(`http://localhost:9000/sendConRequest`, {
        event_id,
        user_id,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { event, createEvent, getEventData, joinEvent, sendConRequest };
};

export default useEvent;
