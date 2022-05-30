import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Text,
  Image,
  Grid,
  GridItem,
  Spacer,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import PlaceDetail from "./PlaceDetail";
import PlaceDirections from "./PlaceDirections";
import { config } from "../pages/config";


const List = ({
  places,
  isLoading,
  getDirectionsToCenterPoint,
  directionFromOnePlaceToMultipleLocations,
  locations,
}) => {
  const [isInDirections, setisInDirections] = useState(null);
  const [nameOfPlacePressed, setNameOfPlacePressed] = useState(null);
  const [currentPlace, setcurrentPlace] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const api_key = config.REACT_APP_MAPS_API_KEY;

  if (typeof places === "string") {
    places = JSON.parse(places);
  }

  useEffect(() => {
    places.map((p) => {
      if (p.name == nameOfPlacePressed) {
        setcurrentPlace(p);
      }
    });
  }, [nameOfPlacePressed]);

  if (isLoading)
    return (
      <Flex
        direction={"column"}
        bg={"whiteAlpha.900"}
        width={"37vw"}
        height="100vh"
        position={"absolute"}
        left={0}
        top={0}
        zIndex={1} // above the map
        overflow="hidden"
        px={2}
      >
        <Box padding="6" boxShadow="lg" bg="white" mt={16}>
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      </Flex>
    );

  return (
    <React.Fragment>
      {/**WHen user selects one of the suggested place */}
      {isInDirections ? (
        <Flex
          direction={"column"}
          oplacePressedverflowY={"scroll"}
          height="71vh"
        >
          {currentPlace != null ?
            < PlaceDirections places = {places} 
            locations = {locations} 
            directionFromOnePlaceToMultipleLocations = {directionFromOnePlaceToMultipleLocations} 
            setisInDirections = {setisInDirections}
            currentPlace = {currentPlace}
            setcurrentPlace = {setcurrentPlace}
            getDirectionsToCenterPoint={getDirectionsToCenterPoint}/>
           : (
            <Text>Loading</Text>
          )}
        </Flex>
      ) : (
        <Flex direction={"column"} overflowY={"scroll"} height="71vh">
          {places &&
            places.map((place, idx) => {
              let firstcolour = "whiteAlpha.900";
              let secondcolour = "gray.100";
              let isAd = 0;
              if (idx === 0) {
                // promoted
                firstcolour = "gray.300";
                secondcolour = "gray.200";
                isAd = 25;
              }
              return (
                <PlaceDetail
                  place={place}
                  key={idx}
                  firstcolour={firstcolour}
                  secondcolour={secondcolour}
                  isAd={isAd}
                  getDirectionsToCenterPoint={getDirectionsToCenterPoint}
                  isInDirections={isInDirections}
                  setisInDirections={setisInDirections}
                  nameOfPlacePressed={nameOfPlacePressed}
                  setNameOfPlacePressed={setNameOfPlacePressed}
                />
              );
            })}
        </Flex>
      )}
    </React.Fragment>
  );
};

export default List;
