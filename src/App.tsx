import "./App.css";
import { Route, Routes } from "react-router-dom";

// Components
import NavBar from "./pages/nav-bar/nav-bar-component";
import MainMap from "./pages/main-map/map-component";
import DustBins from "./pages/dust-bins/dust-bins.component";

function App() {
  return (
    <div id="app" className="app-container">
      <NavBar></NavBar>

      <div className="main-container">
        <Routes>
          <Route path="/map" element={<MainMap />} />
          <Route path="/bins" element={<DustBins />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
