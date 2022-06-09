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
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { RiAdvertisementFill } from "react-icons/ri";

import { Rating } from "@material-ui/lab";
import React from "react";
import { IoLocation } from "react-icons/io5";
import { useEffect, useState } from "react";

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
  const photos_api_key = config.PHOTOS_API_KEY;
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

  const colours = [
    "red.200",
    "orange.200",
    "green.200",
    "teal.200",
    "blue.200",
    "purple.200",
    "pink.200",
    "gray.200",
  ];
  
  const [tabIndex, setTabIndex] = React.useState(0);
  const bg = colours[tabIndex];
  console.log(tabIndex);

  return (
    <Flex overflowY={"scroll"} direction={"column"}>
      <Flex>
        {" "}
        <Button
          bg={"white"}
          leftIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
        ></Button>
      </Flex>
      <Flex>
        <Tabs
          variant="soft-rounded"
          variantColor="green"
          defaultIndex={tabIndex}
        >
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
              let isAd = 0;
              if (idx === 0) {
                // promoted
                isAd = 25;
              }
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

                        <RiAdvertisementFill fontSize={isAd} color="purple" />
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
                      <Text
                        fontSize={"sm"}
                        fontWeight={"500"}
                        color={"gray.400"}
                      >
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
                          {place.vicinity}s
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
                              photos_api_key
                            : "https://firebasestorage.googleapis.com/v0/b/cz3002-5e843.appspot.com/o/64818931817.png?alt=media"
                        }
                      />
                    </Box>
                  </Flex>
                  {/* Directions */}
                  <Flex direction={"column"}>
                    <Text>Directions from</Text>
                    <Tabs
                      size="md"
                      variant="enclosed"
                      // onChange={(index) => setTabIndex(index)} bg={bg}
                    >
                      <TabList>
                        {locations.map((location, id) => {
                          return (
                            <Tab maxWidth={"7vw"} bg={colours[id]}>
                              <Text noOfLines={2}>{location.name}</Text>
                            </Tab>
                          );
                        })}
                      </TabList>
                      <TabPanels>
                        {directionFromOnePlaceToMultipleLocations.length != 0 &&
                          directionFromOnePlaceToMultipleLocations.map(
                            (d, id) => {
                              return (
                                <TabPanel bg={colours[id]}>
                                  <Flex>
                                    <Text>
                                      Total Distance: {d.total_distance}
                                    </Text>
                                    <Spacer />
                                    <Text>
                                      Total Duration: {d.total_duration}
                                    </Text>
                                  </Flex>
                                  <br />
                                  <UnorderedList>
                                    {d.steps.map((step, idx) => {
                                      let instruction = step.instruction
                                        .replace(/(<([^>]+)>)/gi, "")
                                        .trim()
                                        .replace(/Toll/, "")
                                        .replace(/Ln/, "");

                                      if (idx === d.steps.length - 1) {
                                        const lastIndex =
                                          instruction.lastIndexOf(
                                            "Destination"
                                          );
                                        let firstHalf = instruction.slice(
                                          0,
                                          lastIndex
                                        ); // Turn left
                                        let secondHalf =
                                          instruction.slice(lastIndex); // Destination will be on the left

                                        if (firstHalf.length === 0) {
                                          return (
                                            <ListItem>{secondHalf}</ListItem>
                                          );
                                        } else {
                                          return (
                                            <div>
                                              <ListItem>{firstHalf}</ListItem>
                                              <ListItem>{secondHalf}</ListItem>
                                            </div>
                                          );
                                        }
                                      } else {
                                        return (
                                          <ListItem>{instruction}</ListItem>
                                        );
                                      }
                                    })}
                                  </UnorderedList>
                                </TabPanel>
                              );
                            }
                          )}
                      </TabPanels>
                    </Tabs>
                  </Flex>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default PlaceDetail;
