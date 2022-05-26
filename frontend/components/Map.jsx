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

function Map({ avgcoordinates, locations, directionsResponse, circleoptions }) {
  const [map, setMap] = useState(/** @type google.maps.Map */(null));

  // if (!isLoaded) {
  //   return <SkeletonText />
  // }

  const colours = ["red", "black", "olive", "green", "blue", "indigo", "violet"];


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
            // zoomControl: false, //true
            streetViewControl: false,
            mapTypeControl: false,
            // fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}

        // onZoomChanged={ () => () => {
        //   map.getZoom();
        // }}
        >

          {directionsResponse && directionsResponse.map((direction, idx) => {
            if (idx >= 0) {
              return (
                <div>
                  <DirectionsRenderer directions={direction}
                    options={{
                      polylineOptions: { strokeColor: colours[idx] },
                      markerOptions: { icon: "null", opacaity: 0 }
                    }}
                  />
                  {circleoptions && (
                  <Circle options={circleoptions} />
                  )}
                </div>
              );
            }
          })}

          {locations.map((location, idx) => {
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
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default Map;
