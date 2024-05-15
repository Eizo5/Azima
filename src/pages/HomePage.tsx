import "../Styles/App.css";
import { useNavigate } from "react-router-dom";
// Components Imports
import NavBar from "../components/navbar";
import { Footer } from "../components/Footer";
import { IntroPicture } from "../components/IntroPicture";
import OurButton from "../components/OurButton";
import { EventSlider } from "../components/EventSlider";
import axios from "axios";
import { useEffect, useState } from "react";
import { prefferedGroups } from "../data/helpers";
import useAuthentication from "../hooks/userHook";
// Other Imports

export default function HomePage() {
  // Variables
  const { user } = useAuthentication();
  const [comedyData, setComedyData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [religionData, setReligionData] = useState([]);
  //Navigation function
  const navigate = useNavigate();
  const handleCreateGroupButtonClick = () => {
    navigate("/CreateGroup");
  };

  const randomGroups = async () => {
    try {
      const response = await axios.get("http://localhost:9000/randomGroups");
      console.log(response.data);
      setComedyData(response.data.comedy);
      setEducationData(response.data.education);
      setSportsData(response.data.sports);
      setReligionData(response.data.religion);
    } catch (error) {
      console.log("404 groups not found");
    }
  };

  useEffect(() => {
    randomGroups();
  }, []);

  return (
    <div>
      <NavBar navType="Navbar" />
      <IntroPicture />
      <OurButton
        label="Create Group"
        position="center"
        onClick={handleCreateGroupButtonClick}
      />

      {user && (
        <EventSlider object={prefferedGroups} label="Suggested Groups" />
      )}

      <EventSlider object={comedyData} label="Comedy Groups" />

      <EventSlider object={sportsData} label="Sports Groups" />

      <EventSlider object={educationData} label="Education Groups" />

      <EventSlider object={religionData} label="Religion Groups" />

      <Footer />
    </div>
  );
}
