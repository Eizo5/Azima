import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { InputText } from "../components/InputText";
import Checkbox from "../components/Checkbox";
import Dropdown from "../components/Dropdown";
import { Footer } from "../components/Footer";
import "../Styles/creategroup.css";
import { InputDesc } from "../components/InputDesc";
import { OurButton } from "../components/OurButton";

import imgHolder from "../assets/EventImage.png";

const CreateEvent = () => {
  const navigate = useNavigate();
  const handleCreateEventClick = () => {
    navigate("/EventPage");
  };
  return (
    <div>
      <NavBar navType="fnav" />
      <div className="create-event-container">
        <div className="form-container">
          <label className="heading">Event Info</label>
          <InputText
            label="Event Name *"
            placeholder="Enter your event name here..."
          />
          <InputText
            label="Event Location *"
            placeholder="Enter your group location here..."
          />
          <InputText
            label="Event Date *"
            placeholder="Enter your group location here..."
          />
          <div className="split-container">
            <InputText label="Start Time *" placeholder="Example: 6:00 PM" />
            <InputText label="End Time *" placeholder="Example: 11:00 PM" />
          </div>

          <div className="dropdowns" style={{ maxWidth: "47%" }}>
            <Dropdown label="Event Type" />
          </div>

          <InputDesc
            label="Event Program *"
            placeholder="Write a description..."
          />

          <InputText label="Age Restriction" placeholder="Add an age..." />
          <InputText
            label="Event Capacity (Attendees)"
            placeholder="Add a limit for number of attendees..."
          />
          <InputText
            label="Add Contributors "
            placeholder="Example: @AzizAbdulfaham"
          />

          <div className="split-container">
            <InputText label="Ticket Price" placeholder="Example: 100" />
            <InputText label="Currency" placeholder="Example: Euro, TL..." />
          </div>
          <InputText
            label="What’s included in the ticket price? "
            placeholder="Example: One Soft Drink"
          />
          <InputText
            label="What’s not included in the ticket price? "
            placeholder="Example: Food"
          />
          <InputText
            label="Return policy "
            placeholder="Example: Can return before 9 days of event"
          />
          <InputText label="Guests  " placeholder="Example: @AzizAbdulfaham" />
          <InputText
            label="Add Other Rules  "
            placeholder="Example: No entry after 8:00 PM"
          />
          <div className="checkboxes">
            <Checkbox
              label="I want my event to be private 
(If you disable this it means even people not in your group will be able to see the event and join it)"
            />
            <Checkbox label="Allow contribution requests" />
          </div>

          <OurButton
            position=""
            label="Create Event"
            onClick={handleCreateEventClick}
            variant=""
          />
        </div>

        <div className="imgHolder">
          <img src={imgHolder} />
          <OurButton
            variant={""}
            onClick={() => {}}
            position="center"
            thin
            label="Upload Image"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateEvent;
