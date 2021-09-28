// import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import * as L from 'leaflet';

import iconImage from '../../assets/images/icon-location.svg';

console.dir(TileLayer);

export default function Map() {
  let icon = L.icon({
    iconUrl: iconImage,
    iconSize: [46, 56],
    iconAnchor: [23, 56],
  });

  return (
    <MapContainer 
      center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} 
      className="results__map"
      // id="mapid"
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        accessToken="pk.eyJ1IjoiYnJ1enBrIiwiYSI6ImNrdGd1a2VjNzBseGIyd21yNzJwZXMxZjUifQ.1gRJk8ifPmWrFqGZSAQjsw"
        id='mapbox/streets-v11'
        maxZoom={18}
        tileSize={512}
        zoomOffset= {-1}
      />
      <Marker 
        position={[51.505, -0.09]}
        icon={ icon }
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* <IconImage /> */}
    </MapContainer>
  );
}