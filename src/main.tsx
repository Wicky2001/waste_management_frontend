import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log(API_KEY);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <APIProvider
      apiKey={API_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </APIProvider>
  </StrictMode>,
);
