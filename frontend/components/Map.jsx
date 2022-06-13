import React from "react";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
} from "@react-google-maps/api";

import { Box, Flex } from "@chakra-ui/react";

import { useState, useCallback, useEffect } from "react";

function Map({ avgcoordinates, locations, directionsResponse, radius, results, selectedplace }) {
  const [map, setMap] = useState(null);

  const colours = [
    "red",
    "DarkOrange",
    "green",
    "DarkTurquoise",
    "SteelBlue",
    "purple",
    "Magenta",
    "gray",
  ];
  
  if (typeof (results) === "string") {
    results = JSON.parse(results)
  }

  const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    center: avgcoordinates,
    radius: radius,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
  };

  useEffect(() => {
    if (map) {
      
      if (results && results.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        results && results.map(result => {
          bounds.extend({
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          });
          map.fitBounds(bounds);
        });
        
      }
    }
  }, [map, results]);

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={avgcoordinates}
          margin={[50, 50, 50, 50]}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={useCallback((map) => setMap(map), [])}
        >

          {directionsResponse && directionsResponse.map((direction, idx) => {
            if (idx >= 0) {
              return (
                <div key={idx}>
                  <DirectionsRenderer directions={direction}
                    options={{
                      polylineOptions: { strokeColor: colours[idx] },
                      markerOptions: { icon: "null", opacaity: 0 },
                      preserveViewport: true // disable zooming
                    }}
                    key={idx}
                  />
                </div>
              );
            }
          })}

          {locations && locations.map((location, idx) => {
            if (idx >= 0) {
              return (
                <Marker
                  position={{
                    lat: location.geometry.location.lat(),
                    lng: location.geometry.location.lng(),
                  }}
                  key={idx}
                  title={location.name}
                  icon="https://firebasestorage.googleapis.com/v0/b/cz3002-5e843.appspot.com/o/187585711810.png?alt=media"
                // draggable={true}
                ></Marker>
              );
            }
          })}

          {results && results.map((result, idx) => {
            if (idx >= 0) {
              return (
                <div key={idx}>
                  <Marker
                    position={{
                      lat: result.geometry.location.lat,
                      lng: result.geometry.location.lng,
                    }}
                    key={idx}
                    title={result.name}
                    icon="https://firebasestorage.googleapis.com/v0/b/cz3002-5e843.appspot.com/o/507985227143.png?alt=media"
                  // draggable={true}
                  ></Marker>
                  {selectedplace && (
                    <Marker
                      position={{
                        lat: selectedplace.geometry.location.lat,
                        lng: selectedplace.geometry.location.lng,
                      }}
                      title={selectedplace.name}
                      icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                    ></Marker>
                  )

                  }
                  {defaultOptions && (
                    <Circle options={defaultOptions} />
                  )}
                </div>
              );
            }
          })}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default Map;
