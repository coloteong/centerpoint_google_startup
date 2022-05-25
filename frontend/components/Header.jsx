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
} from "@chakra-ui/react";

import { Autocomplete } from "@react-google-maps/api";
import { React, useRef, useState } from "react";

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

const Header = ({
  setType,
  setRatings,
  locations,
  setLocations,
  avgcoordinates,
  setAvgcoordinates,
}) => {
  /** @type React.MutableRefObject<HTMLInputElement> */
  let enterLocation = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const restriction = { country: "sg" };
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState(null);
  const [menuOpen, setMenuOpen] = useState();

  const list_of_purpose = [
    "Activities",
    "Food",
    "Hotels & Staycations",
    "Sports & Fitness",
  ];
  const [purpose, setPurpose] = useState(list_of_purpose[1]);
  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      // console.log(autocomplete.getPlace())
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
  const handleDelete = (event) => {
    event.preventDefault();
    //change list of locations displayed in webapp
    let tempLocations = [];
    locations.forEach((location) => {
      if (location.name != event.target.textContent) {
        tempLocations.push(location);
      }
    });
    setLocations(tempLocations);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(getPurposeDefinition(purpose));
    let formData = {
      purpose: getPurposeDefinition(purpose),
      locations: locations,
    };

    // console.log(formData)
    // console.log(locations)
    fetch("http://127.0.0.1:5000/testing", {
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
        console.log(data);
        setResults(data)
      })
      .catch((error) => {
        console.error(error);
        console.log("error");
      });
  };

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
        element.content.forEach((e)=>{
          result.push(e);
        })   
      }
    });

    return result;
  };

  return (
    <div>
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
              rounded={"full"}
              ml={8} // margin left
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
          >
            Submit
          </Button>
        </Flex>
      </Flex>
      {/**Selected locations*/}
      <Flex
        direction={"column"}
        bg={"whiteAlpha.900"}
        width={"37vw"}
        height="50vh"
        position={"absolute"}
        left={0}
        top={0}
        zIndex={1} // above the map
        overflow="hidden"
        px={2}
        py={12}
      >
        {/**Remove location*/}
        {locations.map((location, idx) => {
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
        })}

        {/* <BiXCircle fontSize={25} /> */}
      </Flex>
      {/**Results list*/}
      <Flex
        direction={"column"}
        bg={"white"}
        width={"37vw"}
        height="50vh"
        position={"absolute"}
        left={0}
        top={250}
        zIndex={1} // above the map
        overflow="hidden"
        px={2}
        py={12}
      >
        {results &&
          results.locations.map((result, idx) => {
            return(<Box key={idx}>
              {result.name}
            </Box>);
            
          })}
      </Flex>
    </div>
  );
};

export default Header;
