import { Map } from "@vis.gl/react-google-maps";

export default function MainMap() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      />
    </div>
  );
}
