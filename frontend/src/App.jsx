import { useEffect } from "react";
import axios from "axios"; // Core npm library
import api from "./api/axios"; // Your explicit custom axios instance
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    // 1. Wake up main backend (Safely catches errors if server takes too long to respond)
    api.get("/")
      .catch((err) => console.log("Main backend is warming up..."));

    // 2. Wake up channel service
    const channelUrl = import.meta.env.VITE_CHANNEL_SERVICE_URL;
    if (channelUrl) {
      axios.get(channelUrl)
        .catch((err) => console.log("Channel service is warming up..."));
    }
  }, []);

  return <AppRoutes />;
}

export default App;