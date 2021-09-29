import { useMap } from "react-leaflet";

export default function ChangeView({ coordinates, zoom }) {
  const map = useMap();
  map.setView(coordinates, zoom);
  return null;
}