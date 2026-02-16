import { Map } from "@vis.gl/react-google-maps";
import styles from "./map-component.module.scss";

export default function MainMap() {
  return (
    <div className={styles.mapContainer}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      />
    </div>
  );
}
