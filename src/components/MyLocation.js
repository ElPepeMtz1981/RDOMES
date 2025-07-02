import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

function MyLocation() {
  const [ubicacion, setUbicacion] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAi3QKn5t2zyS1_da8FcjOfHQVJ-t4KF1M', // 🔐 Reemplaza con tu API Key
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUbicacion({ lat: latitude, lng: longitude });
      },
      (err) => console.error('Error obteniendo ubicación:', err),
      { enableHighAccuracy: true }
    );
  }, []);

  if (!isLoaded || !ubicacion) return <p>Cargando mapa...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={ubicacion}
      zoom={15}
    >
      <Marker position={ubicacion} />
    </GoogleMap>
  );
}

export default MyLocation;