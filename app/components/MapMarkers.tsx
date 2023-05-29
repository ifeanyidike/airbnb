import type { MapLocations } from "@component/utils/types";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import { useEffect, useRef } from "react";

const MapMarkers = ({ mapLocations }: { mapLocations: MapLocations[] }) => {
  const map = useGoogleMap();
  const markersRef = useRef<any>([]);

  useEffect(() => {
    if (!map || markersRef.current.length !== 0 || !window || !window?.google)
      return;

    markersRef.current = mapLocations
      .slice(0, 5)
      .map(
        (location: MapLocations) =>
          new window.google.maps.Marker({ map, position: location })
      );
  }, [map]);

  return <></>;
};

export default MapMarkers;
