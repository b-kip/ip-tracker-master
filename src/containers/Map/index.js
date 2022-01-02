import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import * as L from 'leaflet';
import Skeleton from "react-loading-skeleton";

import iconImage from '../../assets/images/icon-location.svg';
import ChangeView from './ChangeView';


export default function Map({ coordinates, isLoading }) {
  let icon = L.icon({
    iconUrl: iconImage,
    iconSize: [46, 56],
    iconAnchor: [23, 56],
  });
  let zoom = 13;

  // console.log("Rendering maps");
  return (
    <div className="results__map-container">
      {
        isLoading
        ? (<Skeleton className="results__map__item"/>)
        : (
          (coordinates.lat && coordinates.lng) 
          ? (
            <MapContainer 
            center={coordinates} zoom={zoom} scrollWheelZoom={false} 
            className="results__map__item"
            >
              <ChangeView coordinates={coordinates} zoom={zoom}/>
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
                position={coordinates}
                icon={ icon }
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          )
          : <div className="results__map__item"></div>
        )
      }
    </div>
  );
}