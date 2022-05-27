import React from "react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";

import { Box, Flex, SkeletonText } from "@chakra-ui/react";

import { useRef, useState } from "react";

import { onLoad } from "./Header";

function Map({ avgcoordinates, locations, directionsResponse, radius, results, zoomLevel }) {
  const [map, setMap] = useState(/** @type google.maps.Map */(null));

  const colours = ["red", "black", "olive", "green", "blue", "indigo", "violet"];
  results = JSON.parse(results)

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
          zoom={zoomLevel}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            // zoomControl: false, //true
            streetViewControl: false,
            mapTypeControl: false,
            // fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >

          {directionsResponse && directionsResponse.map((direction, idx) => {
            if (idx >= 0) {
              return (
                <div key={idx}>
                  <DirectionsRenderer directions={direction}
                    options={{
                      polylineOptions: { strokeColor: colours[idx] },
                      markerOptions: { icon: "null", opacaity: 0 },
                      preserveViewport : true // disable zooming
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
                  label="😮"
                // draggable={true}
                ></Marker>
              );
            }
          })}

          {results && results.map((result, idx) => {
            if (idx >= 0) {
              return (
                <div>
                  <Marker
                    position={{
                      lat: result.geometry.location.lat,
                      lng: result.geometry.location.lng,
                    }}
                    key={idx}
                    title={result.name}
                    icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  // draggable={true}
                  ></Marker>
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
