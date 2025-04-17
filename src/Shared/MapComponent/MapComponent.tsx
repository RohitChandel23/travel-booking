import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import './MapComponent.css';
import 'leaflet/dist/leaflet.css';

interface PropsType {
  cityName: string | '' | undefined;
  mapHeadingText: string | '';
}

function MapComponent({ cityName, mapHeadingText }: PropsType) {
  const [center, setCenter] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
        );
        const result = await response.json();
        const { lat, lon } = result[0];

        setCenter([parseFloat(lat), parseFloat(lon)]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cityName]);

  if (!center) return <p>Loading Map...</p>;

  return (
    <div className="map-container-div">
     {mapHeadingText && <h5 className="detail-page-minor-title">{mapHeadingText}</h5>}

      <MapContainer
        key={center.toString()}
        center={center}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>Location...</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
export default MapComponent;
