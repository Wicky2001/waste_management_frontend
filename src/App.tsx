import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainMap from "./pages/main-map/map-component";

function App() {
  return (
    <Routes>
      <Route path="/map" element={<MainMap />} />
    </Routes>
  );
}

export default App;
