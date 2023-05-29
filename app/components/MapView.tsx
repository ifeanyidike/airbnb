"use client";
import React, { useState } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import MapMarkers from "./MapMarkers";
import type { MapLocations } from "@component/utils/types";

const MapView = ({ mapLocations }: { mapLocations: MapLocations[] }) => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const firstLoc = mapLocations[0];
  const mapOptions = {
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: 3, // Right top
    },
    center: {
      lat: firstLoc.lat,
      lng: firstLoc.lng,
    },
  };
  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.GOOGLE_MAP_API_KEY || ""}
      mapOptions={mapOptions}
      mapContainer={mapContainer}
    >
      <div className="h-screen" ref={(node) => setMapContainer(node)}></div>
      <MapMarkers mapLocations={mapLocations} />
    </GoogleMapsProvider>
  );
};

export default MapView;
