import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

// Components
import NavBar from "./pages/nav-bar/nav-bar-component";
import MainMap from "./pages/main-map/map-component";
import DustBins from "./pages/dust-bins/dust-bins.component";
import Drivers from "./pages/drivers/drivers-component";
import Trucks from "./pages/trucks/trucks-component";
import Login from "./pages/login/login-component";
import Home from "./pages/home/home-component";
import Unauthorized from "./pages/unauthorized/unauthorized-component";
import ProtectedRoute from "./common-shared/auth/protected-route";

function App() {
  const location = useLocation();
  const hideSideBar = location.pathname === "/" || location.pathname === "/login";

  return (
    <div id="app" className="app-container">
      {!hideSideBar && <NavBar></NavBar>}

      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoute allowedRoles={["COUNCIL_ADMIN", "DRIVER"]} />}>
            <Route path="/map" element={<MainMap />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["COUNCIL_ADMIN", "SERVICE_TECH"]} />}>
            <Route path="/bins" element={<DustBins />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["COUNCIL_ADMIN"]} />}>
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/trucks" element={<Trucks />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
