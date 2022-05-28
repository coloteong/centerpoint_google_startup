import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Checkbox,
  CheckboxGroup,
  Stack,
  Button,
  Box,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  AccordionItem,
  Accordion,
  Text,
} from "@chakra-ui/react";

import { Autocomplete } from "@react-google-maps/api";
import { React, useRef, useState } from "react";
import List from "./List";

import {
  BiSearch,
  BiFilter,
  BiChevronDown,
  BiRestaurant,
  BiShoppingBag,
  BiHeartCircle,
  BiDirections,
  BiRun,
  BiXCircle,
} from "react-icons/bi";
import { IoChevronUpSharp } from "react-icons/io5";

const Header = ({
  locations,
  setLocations,
  avgcoordinates,
  setAvgcoordinates,
  directionsResponse,
  setDirectionsResponse,
  circleoptions,
  setCircleoptions,
  results,
  setResults,
  isLoading,
  setIsLoading,
  radius,
  setRadius,
  zoomLevel,
  setZoomLevel,
  setSelectedplace
}) => {
  /** @type React.MutableRefObject<HTMLInputElement> */
  let enterLocation = useRef();

  // const defaultOptions = {
  //   strokeOpacity: 0.5,
  //   strokeWeight: 2,
  //   center: avgcoordinates,
  //   radius: radius,
  //   clickable: false,
  //   draggable: false,
  //   editable: false,
  //   visible: true,
  //   zIndex: 1,
  //   fillOpacity: 0.05,
  //   strokeColor: "#FF5252",
  //   fillColor: "#FF5252",
  // };

  const [autocomplete, setAutocomplete] = useState(null);
  const restriction = { country: "sg" };
  const [fixedresults, setFixedResults] = useState(null);
  const [displayDirections, setDisplayDirections] = useState([])

  const list_of_purpose = [
    "Activities",
    "Food",
    "Hotels & Staycations",
    "Sports & Fitness",
  ];
  const [purpose, setPurpose] = useState(list_of_purpose[1]);
  const onLoad = (autoC) => setAutocomplete(autoC);

  //Updates whenever a location is added/removed
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      let temp = locations.concat(autocomplete.getPlace());
      locations = temp;
      setLocations(locations);

      enterLocation.current.value = null;

      let latAll = null;
      let lngAll = null;
      locations.forEach((location) => {
        latAll += location.geometry.location.lat();
        lngAll += location.geometry.location.lng();
      });
      setAvgcoordinates({
        lat: latAll / locations.length,
        lng: lngAll / locations.length,
      });
    }
  };

  //Removes selected point 
  const handleDelete = (event) => {
    event.preventDefault();
    //change list of locations displayed in webapp
    let tempLocations = [];
    locations.forEach((location, idx) => {
      if (location.name != event.target.textContent) {
        tempLocations.push(location);
      } else {
        //   // js help to remove the routes
        var removeRoute = directionsResponse.splice(idx, 1);
        setDirectionsResponse(directionsResponse);
      }
    });
    setLocations(tempLocations);
    setCircleoptions(null);


    if (tempLocations.length === 0) {
      setAvgcoordinates({ lat: 1.347, lng: 103.79 });
      setDirectionsResponse([]);
      setCircleoptions(null);
    }
  };

  //Executes the algorithm to find list of suggested places
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {
      purpose: getPurposeDefinition(purpose),
      locations: locations,
    };
    setIsLoading(true)
    //  fetch("http://127.0.0.1:5000/test", {
    fetch("http://127.0.0.1:8000/test", {
      // fetch("http://centerpoint.lohseng.com:8000/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResults(data);
        setFixedResults(data);
        setIsLoading(false)
        let maxRadius = 0;
        data = JSON.parse(data)
        data.forEach((place) => {

          if (place.distance_from_center >= maxRadius) {
            maxRadius = place.distance_from_center;
          }
        });
        let newRadius = Math.ceil(maxRadius * 1000) + 5;
        setRadius(newRadius);

        if (newRadius <= 50) {
          setZoomLevel(22);
        } else if (newRadius <= 50) {
          setZoomLevel(21);
        } else if (newRadius <= 100) {
          setZoomLevel(20);
        } else if (newRadius <= 161) {
          setZoomLevel(19);
        } else if (newRadius <= 250) {
          setZoomLevel(18);
        } else if (newRadius <= 500) {
          setZoomLevel(17);
        } else if (newRadius <= 1000) {
          setZoomLevel(16);
        } else if (newRadius <= 5000) {
          setZoomLevel(15);
        } else if (newRadius <= 20000) {
          setZoomLevel(14);
        } else if (newRadius <= 200000) {
          setZoomLevel(13);
        } else {
          setZoomLevel(12);
        }
        console.log("largest radius is : " + newRadius);
        console.log("zoom level is : " + zoomLevel);
      })
      .catch((error) => {
        console.error(error);
        console.log("error");
      });


  };

  //Get list of keywords from user selected purpose
  const getPurposeDefinition = (p) => {
    let result = [];
    const purpose_definitions = [
      {
        content: [
          "amusement_park",
          "aquarium",
          "art_gallery",
          "bowling_alley",
          "cafe",
          "movie_theater",
          "museum",
          "night_club",
          "tourist_attraction",
        ],
        key: "Activities",
      },
      { content: ["cafe", "restaurant"], key: "Food" },
      { content: ["lodging"], key: "Hotels & Staycations" },
      { content: ["gym", "park"], key: "Sports & Fitness" },
    ];

    purpose_definitions.forEach((element) => {
      if (element.key == p) {
        element.content.forEach((e) => {
          result.push(e);
        });
      }
    });

    return result;
  };

  //Compute directions to centerpoint
  async function getDirectionsToCenterPoint(place) {
    let allDrawingroutes = [];
    let allInstructionroutes = []
    setDirectionsResponse([]);
    for (let i = 0; i <= locations.length - 1; i++) {
      const directionsService = new google.maps.DirectionsService();
      const direction = await directionsService.route({
        origin: locations[i].geometry.location,
        destination: place.geometry.location,

        travelMode: google.maps.TravelMode.DRIVING,
      });

      allDrawingroutes.push(direction);
      // let moves = direction.routes.legs.steps
      let moves = direction.routes[0].legs[0].steps;
      let oneRoute = []
      moves.forEach((move, idx) => {
        let step = {
          index: idx,
          instruction: move.instructions,
          distance: move.distance.text,
          duration: move.duration.text
        }
        oneRoute.push(step)
      });
      let oneInstructionRoute = {
        total_distance: direction.routes[0].legs[0].distance.text,
        total_duration: direction.routes[0].legs[0].duration.text,
        steps: oneRoute
      }
      allInstructionroutes.push(oneInstructionRoute);
    }
    setDirectionsResponse(allDrawingroutes);

    // change the selected place's marker to different marker icon
    if (typeof (fixedresults) === "string") {
      fixedresults = JSON.parse(fixedresults)
    }
    let tempResults = []
    fixedresults.forEach((result, idx) => {
      if (result.name != place.name) {
        tempResults.push(result);
      } else {
        setSelectedplace(place)
      }
    });
    setResults(tempResults);
  }

  return (
    <div>
      {/* Enter location, choose purpose and submit button*/}
      <Flex
        position={"absolute"}
        top={0}
        left={0}
        width={"full"}
        px={4}
        py={2}
        zIndex={101}
      >
        <Flex>
          {/* Location input box */}
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            restrictions={restriction}
          >
            <InputGroup width={"35vw"} shadow="lg">
              <InputRightElement
                pointerEvents={"none"}
                children={<BiSearch color="gray" fontSize={20} />}
              />

              <Input
                type={"text"}
                placeholder="Enter location.."
                variant={"filled"}
                fontSize={18}
                bg={"white"}
                color={"gray.700"}
                _hover={{ bg: "whiteAlpha.800" }}
                _focus={{ bg: "whiteAlpha.800" }}
                _placeholder={{ color: "gray.400" }}
                ref={enterLocation}
              />
            </InputGroup>
          </Autocomplete>
          {/**Purpose dropdown list*/}
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              px={4}
              py={2}
              bg={"white"}
              rounded={"md"}
              ml={5} // margin left
              shadow="lg"
              cursor={"pointer"}
            >
              <Menu>
                <MenuButton
                  //isActive={true}
                  bg={"white"}
                  as={Button}
                  rounded={"full"}
                  rightIcon={<BiChevronDown fontSize={25} />}
                >
                  {purpose}
                </MenuButton>
                <MenuList>
                  {list_of_purpose.map((purpose, idx) => {
                    return (
                      <MenuItem
                        key={idx}
                        value={purpose}
                        onClick={(event) => {
                          event.preventDefault();
                          setPurpose(event.target.value);
                        }}
                      >
                        {purpose}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>

        <Flex>
          {/**Submit button*/}
          <Button
            bg={"white"}
            ml={4} // margin left
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </Flex>
      </Flex>

      {/* Location inputs and suggested places */}
      <Accordion
        defaultIndex={[0]}
        allowMultiple
        direction={"column"}
        bg={"whiteAlpha.900"}
        width={"35vw"}
        // height="50vh"
        position={"absolute"}
        left={4}
        top={57}
        zIndex={1} // above the map
        overflow="hidden"
        rounded={"md"}
      // px={2}
      // py={12}
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize="xl">Selected Points</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/** Location*/}
            {locations.length != 0 ? (
              locations.map((location, idx) => {
                return (
                  <Button
                    rightIcon={<BiXCircle />}
                    colorScheme="blue"
                    variant="outline"
                    key={idx}
                    onClick={handleDelete}
                  >
                    {location.name}
                  </Button>
                );
              })
            ) : (
              <Text color="gray" fontSize="md">
                There are no locations selected.
              </Text>
            )}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize="xl">Suggested Places</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {fixedresults != null ? (
              <List places={fixedresults} isLoading={isLoading} getDirectionsToCenterPoint={getDirectionsToCenterPoint} />
            ) : (
              <Text fontSize="md" color="gray">
                There are no results to display.
              </Text>
            )}

          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Header;
