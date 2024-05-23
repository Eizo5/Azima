import "../Styles/App.css";
import { useNavigate } from "react-router-dom";
// Components Imports
import NavBar from "../components/navbar";
import { Footer } from "../components/Footer";
import { IntroPicture } from "../components/IntroPicture";
import OurButton from "../components/OurButton";
import { EventSlider } from "../components/EventSlider";
import axios from "axios";
import useGroup from "../hooks/groupHook";

import { useEffect, useState } from "react";
import useEvent from "../hooks/eventHook";

//import { prefferedGroups } from "../data/helpers";
import useAuthentication from "../hooks/userHook";
// Other Imports

export default function HomePage() {
  // Variables
  const { user, preferredGroups, userGroups } = useAuthentication();
  const [comedyData, setComedyData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [religionData, setReligionData] = useState([]);
  const { events } = useEvent();
  userGroups?.map((group) => {});
  // Navigation function
  const navigate = useNavigate();

  const randomGroups = async () => {
    try {
      const response = await axios.get("http://localhost:9000/randomGroups");

      setComedyData(response.data.comedy);
      setEducationData(response.data.education);
      setSportsData(response.data.sports);
      setReligionData(response.data.religion);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    randomGroups();
  }, []);

  return (
    <div>
      <NavBar navType="Navbar" />
      <IntroPicture />
      {user && (
        <OurButton
          label="Create Group"
          position="center"
          onClick={() => navigate("/CreateGroup")}
        />
      )}

      {user && (
        <>
          {userGroups && (
            <EventSlider object={userGroups} label="Your Groups" />
          )}
          {preferredGroups && (
            <EventSlider object={preferredGroups} label="Suggested Groups" />
          )}
          {events?.length > 0 && (
            <EventSlider object={events} label="Your Events" />
          )}
        </>
      )}

      <EventSlider object={comedyData} label="Comedy Groups" />

      <EventSlider object={sportsData} label="Sports Groups" />

      <EventSlider object={educationData} label="Education Groups" />

      <EventSlider object={religionData} label="Religion Groups" />

      <Footer />
    </div>
  );
}
