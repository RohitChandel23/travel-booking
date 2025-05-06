import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';


import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

interface PropsType {
  readonly cityName: string | undefined;
  readonly mapHeadingText?: string;
  readonly zoomLevel: number;
}

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function RecenterMap({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

function MapComponent({ cityName, mapHeadingText, zoomLevel }: PropsType) {
  const [center, setCenter] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
        );
        const result = await response.json();
        if (result.length > 0) {
          const { lat, lon } = result[0];
          setCenter([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error('Error fetching map coordinates:', error);
      }
    };

    if (cityName) {
      fetchData();
    }
  }, [cityName]);

  if (!center) return <p>Loading Map...</p>;

  return (
    <div className="map-container-div">
      {mapHeadingText && (
        <h5 className="detail-page-minor-title">{mapHeadingText}</h5>
      )}
      <MapContainer
        center={center}
        zoom={zoomLevel}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <RecenterMap center={center} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>{cityName ?? 'Location'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapComponent;
