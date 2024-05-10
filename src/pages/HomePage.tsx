import "../Styles/App.css";
import { useNavigate } from "react-router-dom";
// Components Imports
import NavBar from "../components/navbar";
import { Footer } from "../components/Footer";
import { IntroPicture } from "../components/IntroPicture";
import { OurButton } from "../components/OurButton";
import { EventSlider } from "../components/EventSlider";

// Other Imports

export default function HomePage() {
  //Navigation function
  const navigate = useNavigate();
  const handleCreateGroupButtonClick = () => {
    navigate("/CreateGroup");
  };

  return (
    <div>
      <NavBar navType="Navbar" />
      <IntroPicture />
      <OurButton
        label="Create Group"
        position="center"
        onClick={handleCreateGroupButtonClick}
      />
      <EventSlider />

      <EventSlider />

      <EventSlider />

      <EventSlider />

      <Footer />
    </div>
  );
}
