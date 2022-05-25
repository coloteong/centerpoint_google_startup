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
  Box
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

const Header = ({ setType, setRatings, locations, setLocations, avgcoordinates, setAvgcoordinates }) => {
  /** @type React.MutableRefObject<HTMLInputElement> */
  let enterLocation = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const restriction = { country: "sg" };
  const [loading, setLoading] = useState(false);
  const [purpose, setPurpose] = useState([]);
  const [results, setResults] = useState(null);

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
        latAll += location.geometry.location.lat()
        lngAll += location.geometry.location.lng()
      })
      setAvgcoordinates({lat: latAll/locations.length, lng: lngAll/locations.length})

    }s
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
    console.log("handleSubmit")
    fetch("http://centerpoint.lohseng.com:8000/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locations),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        //setResults(data)
      })
      .catch((error) => {
        console.error(error);
        console.log("error");
      });
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
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
          >
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
              <Menu closeOnSelect={false}>
                <BiFilter fontSize={25} />
                <MenuButton transition="all 0.2s" borderRadius={"md"}>
                  Choose Purpose
                </MenuButton>
                <MenuList alignItems={"left"}>
                  <CheckboxGroup colorScheme="green" defaultValue={purpose}>
                    <Stack ml={4} direction="column">
                      <MenuItem display={"flex"} alignItems={"left"}>
                        <Checkbox
                          fontSize={20}
                          color="gray.700"
                          mr={2}
                          value="Food"
                        >
                          Food
                        </Checkbox>
                        <BiRestaurant fontSize={25} />
                      </MenuItem>

                      <MenuItem display={"flex"} alignItems={"left"}>
                        <Checkbox
                          fontSize={20}
                          color="gray.700"
                          mr={2}
                          value="Shopping"
                        >
                          Shopping
                        </Checkbox>
                        <BiShoppingBag fontSize={25} />
                      </MenuItem>

                      <MenuItem display={"flex"} alignItems={"left"}>
                        <Checkbox
                          fontSize={20}
                          color="gray.700"
                          mr={2}
                          value="Date"
                        >
                          Date
                        </Checkbox>
                        <BiHeartCircle fontSize={25} />
                      </MenuItem>

                      <MenuItem display={"flex"} alignItems={"left"}>
                        <Checkbox
                          fontSize={20}
                          color="gray.700"
                          mr={2}
                          value="Exercise"
                        >
                          Exercise
                        </Checkbox>
                        <BiRun fontSize={25} />
                      </MenuItem>

                      <MenuItem display={"flex"} alignItems={"left"}>
                        <Checkbox
                          fontSize={20}
                          color="gray.700"
                          mr={2}
                          value="Explore"
                        >
                          Explore
                        </Checkbox>
                        <BiDirections fontSize={25} />
                      </MenuItem>
                    </Stack>
                  </CheckboxGroup>
                </MenuList>
              </Menu>

              <BiChevronDown
                fontSize={25}
                // down arrow
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex>
            {/**Submit button*/}
          <Button 
            bg={"white"} 
            ml={4} // margin left
            onClick={handleSubmit}
          >Submit</Button>
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
        {results && results.map((result, idx)=>{
          <Box key = {idx}>
            Hello
            {result.name}
          </Box>
        })}


      </Flex>
    </div>
  );
};

export default Header;

