import type { MapLocations } from "@component/utils/types";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import { useEffect, useRef } from "react";

const MapMarkers = ({ mapLocations }: { mapLocations: MapLocations[] }) => {
  const map = useGoogleMap();
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!map || markersRef.current.length !== 0) return;

    markersRef.current = mapLocations
      .slice(0, 5)
      .map(
        (location: MapLocations) =>
          new google.maps.Marker({ map, position: location })
      );

    // return () => {
    //   markersRef.current.forEach((marker: google.maps.Marker) =>
    //     marker.setMap(null)
    //   );
    //   markersRef.current = [];
    // };
  }, [map]);

  return <></>;
};

export default MapMarkers;
