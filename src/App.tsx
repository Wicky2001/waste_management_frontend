import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./pages/nav-bar/nav-bar-component";
import MainMap from "./pages/main-map/map-component";

function App() {
  return (
    <div className="app-container">
      <NavBar></NavBar>

      <div className="main-container">
        <Routes>
          <Route path="/map" element={<MainMap />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
