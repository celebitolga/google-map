import React, { useState } from "react";

import "./App.scss";
import cities from "./data/cities.json";
import AppList from "./components/List/AppList";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 420px)",
};


function App() {
  const [center, setCenter] = useState({ lat: 38.5, lng: 35.5 });
  const [zoom, setZoom] = useState(6);
  const [marker, setMarker] = useState(null);

  const appHandleCityClick = (cityName) => {
    const selectedCity = cities.find((city) => city.city === cityName);

    setCenter({ lat: selectedCity.centerLat, lng: selectedCity.centerLon });
    setZoom(10);
  };

  const appHandleCountyClick = (countyName) => {
    const selectedCity = cities.find(city => city.city === countyName.city && city.county === countyName.county);
    
    setCenter({ lat: selectedCity.centerLat, lng: selectedCity.centerLon });
    setZoom(13);
  };

  const appHandleSearchClick = (cityName) => {
    const selectedCity = cities.find((city) => city.city === cityName);

    setCenter({ lat: selectedCity.centerLat, lng: selectedCity.centerLon });
    setZoom(10);
    setMarker({ lat: selectedCity.centerLat, lng: selectedCity.centerLon });
  };

  return (
    <div className="App">
      <div className="container">
        <AppList
          cities={cities}
          appHandleCityClick={appHandleCityClick}
          appHandleCountyClick={appHandleCountyClick}
          appHandleSearchClick={appHandleSearchClick}
        />

        <div className="App-map">
          <LoadScript googleMapsApiKey="">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
            >
              {marker && <Marker position={marker} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

export default App;
