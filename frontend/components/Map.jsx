import React from "react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";

import { Box, Flex, Circle, SkeletonText } from "@chakra-ui/react";

import { useRef, useState } from "react";

import { onLoad } from "./Header";

function Map({ avgcoordinates, locations, directionsResponse }) {
  const [map, setMap] = useState(/** @type google.maps.Map */(null));

  // if (!isLoaded) {
  //   return <SkeletonText />
  // }

  const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
  const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };
  const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
  };
  const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
  };

  // if (!isLoaded) {
  //   return <SkeletonText />
  // }

const colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];




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
          {avgcoordinates && (
            <>
              <Circle
                center={avgcoordinates}
                radius={1500}
                options={closeOptions}
              />
              <Circle
                center={avgcoordinates}
                radius={3000}
                options={middleOptions}
              />
              <Circle
                center={avgcoordinates}
                radius={4500}
                options={farOptions}
              />
            </>
          )}


          {directionsResponse.map((direction, idx) => {
            if (idx >= 0) {
              return (
                <DirectionsRenderer directions={direction}  
                // polylineOptions= { editable = true} 
                options={{
                  polylineOptions: {strokeColor:colours[idx]},
                  markerOptions: { icon: "null", opacaity: 0}
                }}
                />
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
                  draggable={true}
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
