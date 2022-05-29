import {
  Badge,
  Flex,
  Image,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Button,
  ListItem,
  UnorderedList,
  Spacer,
  ChakraProvider,
} from "@chakra-ui/react";

import { ArrowBackIcon } from '@chakra-ui/icons'


import { Rating } from "@material-ui/lab";
import React from "react";
import { IoLocation } from "react-icons/io5";
import { useEffect, useState } from "react";
import { RiAdvertisementFill } from "react-icons/ri";
import { config } from "../pages/config";
import theme from "../pages/theme";

const PlaceDetail = ({
  places,
  locations,
  directionFromOnePlaceToMultipleLocations,
  setisInDirections,
  currentPlace,
  setcurrentPlace,
  getDirectionsToCenterPoint,
}) => {
  const api_key = config.REACT_APP_MAPS_API_KEY;
  //   console.log("directionFromOnePlaceToMultipleLocations is this:");
  //   console.log(directionFromOnePlaceToMultipleLocations);
  const handlecurrentPlaceChange = (event) => {
    event.preventDefault();
    let currentPlace = getPlaceObject(event.target.textContent);
    setcurrentPlace(currentPlace);
    // console.log("current place is: " + currentPlace.name)
    getDirectionsToCenterPoint(currentPlace);
    //console.log(event.target.textContent)
    // event.preventDefault();
    // getDirectionsToCenterPoint(place)
    // setisInDirections(true)
    // setNameOfPlacePressed(place.name)
  };

  const getPlaceObject = (placeName) => {
    let temp;
    places.forEach((p) => {
      if (p.name == placeName) {
        temp = p;
      }
    });
    return temp;
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    setisInDirections(false);
  };

  return (
    <Flex overflowY={"scroll"} direction = {"column"}>
      <Flex>
        {" "}
        <Button  bg = {'white'} leftIcon = {<ArrowBackIcon />} onClick={handleGoBack}></Button>
      </Flex>
      <Tabs variant="soft-rounded" variantColor="green" defaultIndex={1}>
        <TabList>
          {places.map((place, idx) => {
            return (
              <Tab
                maxWidth={"7vw"}
                value={place.name}
                key={idx}
                onClick={handlecurrentPlaceChange}
              >
                <Text noOfLines={2}>{place.name}</Text>
              </Tab>
            );
          })}
        </TabList>
        <TabPanels>
          {places.map((place, idx) => {
            return (
              <TabPanel key={idx}>
                {/* Place summary */}
                <Flex direction={"row"}>
                  <Box w="100%" p={4} bg={"grey:10"}>
                    <Text
                      textTransform={"capitalize"}
                      width={"40"}
                      fontSize={"lg"}
                      fontWeight={"500"}
                    >
                      {place.name}
                    </Text>
                    <Flex alignItems={"center"} width={"full"}>
                      <Rating
                        size="small"
                        value={Number(place.rating)}
                        readOnly
                      />
                      <Text
                        fontSize={"sm"}
                        fontWeight={"500"}
                        color={"gray.500"}
                      >
                        {place.user_ratings_total
                          ? `(${place.user_ratings_total})`
                          : "Rating not available"}
                      </Text>
                    </Flex>
                    <Text fontSize={"sm"} fontWeight={"500"} color={"gray.400"}>
                      {place.opening_hours != null
                        ? place.opening_hours.open_now
                          ? "Open Now"
                          : "Closed Now"
                        : "Opening hours not available"}
                    </Text>

                    <Flex alignItems={"center"} width={"full"} px={1} my={2}>
                      <IoLocation fontSize={20} color="gray" />
                      <Text
                        fontSize={"small"}
                        fontWeight={500}
                        color={"gray.700"}
                        ml={1}
                      >
                        {place.vicinity}
                      </Text>
                    </Flex>
                  </Box>

                  <Box w="50%" p={4} bg={"whiteAlpha.900"}>
                    <Image
                      objectFit={"cover"}
                      width={"120px"}
                      height={"120px"}
                      rounded="lg"
                      src={
                        place.photos
                          ? "https:///maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                            place.photos[0].photo_reference +
                            "&key=" +
                            api_key
                          : "https://firebasestorage.googleapis.com/v0/b/cz3002-5e843.appspot.com/o/64818931817.png?alt=media"
                      }
                    />
                  </Box>
                </Flex>
                {/* Directions */}
                <Flex direction={"column"}>
                  <Text>Directions from</Text>
                  <Tabs size="md" variant="enclosed">
                    <TabList>
                      {locations.map((location) => {
                        return (
                          <Tab maxWidth={"7vw"}>
                            <Text noOfLines={2}>{location.name}</Text>
                          </Tab>
                        );
                      })}
                    </TabList>
                    <TabPanels>
                      {console.log(
                        "This is what directionFromOnePlaceToMultipleLocations looks like in PlaceDirections"
                      )}
                      {console.log(directionFromOnePlaceToMultipleLocations)}

                      {directionFromOnePlaceToMultipleLocations.length != 0 &&
                        directionFromOnePlaceToMultipleLocations.map((d) => {
                          return (
                            <TabPanel>
                              <Flex>
                                <Text>Total Distance: {d.total_distance}</Text>
                                <Spacer />
                                <Text>Total Duration: {d.total_duration}</Text>
                              </Flex>
                              <br />
                              <UnorderedList>
                                {d.steps.map((step) => {
                                  let instruction = step.instruction
                                    .replace(/(<([^>]+)>)/gi, "")
                                    .trim()
                                    .replace(/Toll/,'')
                                    .replace(/Ln/,'')
                                  return <ListItem>{instruction}</ListItem>;
                                })}
                              </UnorderedList>
                            </TabPanel>
                          );
                        })}
                    </TabPanels>
                  </Tabs>
                </Flex>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default PlaceDetail;
