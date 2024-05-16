import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";

import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import GroupPage from "./pages/GroupPage";
import CreateGroup from "./pages/CreateGroup";
import AuthProvider from "./components/AuthProvider";
import CreateEvent from "./pages/CreateEvent";
import Settings from "./pages/Settings";
import EventPage from "./pages/EventPage";
import ImageBackground from "./assets/ImageBackground.png";
import GroupImage from "./assets/groupimg.png";
import GroupSettings from "./pages/GroupSettings";

export default function App() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dkgrr55re",
    },
  });
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/CreateGroup" element={<CreateGroup />} />
          <Route
            path="/GroupPage/:id"
            element={<GroupPage imgurl={GroupImage} label="Peaceful life" />}
          />
          <Route path="/CreateEvent" element={<CreateEvent />} />
          <Route
            path="/EventPage"
            element={
              <EventPage label="Marmara Trip" imgurl={ImageBackground} />
            }
          />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/GroupSettings" element={<GroupSettings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
