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
  Button
} from "@chakra-ui/react";

import { Autocomplete } from '@react-google-maps/api'
import { React, useRef, useState } from 'react'

import {
  BiSearch,
  BiFilter,
  BiChevronDown,
  BiRestaurant,
  BiShoppingBag,
  BiHeartCircle,
  BiDirections,
  BiRun,
  BiXCircle
} from 'react-icons/bi'



const Header = ({ setType, setRatings, coordinates, setCoordinates,locations, setLocations}) => {


  /** @type React.MutableRefObject<HTMLInputElement> */
  let location1 = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      let temp = coordinates.concat({ lat, lng })
      setCoordinates(temp)
      //setCoordinates({ lat, lng });

      // console.log(autocomplete.getPlace())
      temp = locations.concat(autocomplete.getPlace())
      locations = temp
      setLocations(locations)
      console.log(locations)
      // locations.map(e=>{
      //   console.log(e)
      // })

      location1.current.value = null;

    }

  }


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
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <InputGroup width={"35vw"} shadow="lg">
              <InputRightElement
                pointerEvents={"none"}
                children={<BiSearch color="gray" fontSize={20} />}
              />

              <Input
                type={"text"}
                placeholder="Location 1"
                variant={"filled"}
                fontSize={18}
                bg={"white"}
                color={"gray.700"}
                _hover={{ bg: "whiteAlpha.800" }}
                _focus={{ bg: "whiteAlpha.800" }}
                _placeholder={{ color: "gray.700" }}
                ref={location1}
              />
            </InputGroup>
          </Autocomplete>

          <Flex // choose purpose
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              px={4}
              py={2}
              bg={"white"}
              rounded={'full'}
              ml={4} // margin left
              shadow="lg"
              cursor={'pointer'}
            >
              <Menu closeOnSelect={false}>
                < BiFilter fontSize={25} />
                <MenuButton transition="all 0.2s" borderRadius={'md'}>
                  Choose Purpose
                </MenuButton>
                <MenuList alignItems={"left"}>
                  <CheckboxGroup colorScheme='green' defaultValue={['']}>
                    <Stack ml={4} direction='column'>
                      <MenuItem
                        display={"flex"}
                        alignItems={"left"}
                      >
                        <Checkbox fontSize={20} color='gray.700' mr={2} value='Food'>Food</Checkbox>
                        <BiRestaurant fontSize={25} />
                      </MenuItem>

                      <MenuItem
                        display={"flex"}
                        alignItems={"left"}
                      >
                        <Checkbox fontSize={20} color='gray.700' mr={2} value='Shopping'>Shopping</Checkbox>
                        <BiShoppingBag fontSize={25} />
                      </MenuItem>

                      <MenuItem
                        display={"flex"}
                        alignItems={"left"}
                      >
                        <Checkbox fontSize={20} color='gray.700' mr={2} value='Date'>Date</Checkbox>
                        <BiHeartCircle fontSize={25} />
                      </MenuItem>

                      <MenuItem
                        display={"flex"}
                        alignItems={"left"}
                      >
                        <Checkbox fontSize={20} color='gray.700' mr={2} value='Exercise'>Exercise</Checkbox>
                        <BiRun fontSize={25} />
                      </MenuItem>

                      <MenuItem
                        display={"flex"}
                        alignItems={"left"}
                      >
                        <Checkbox fontSize={20} color='gray.700' mr={2} value='Explore'>Explore</Checkbox>
                        <BiDirections fontSize={25} />
                      </MenuItem>

                    </Stack>
                  </CheckboxGroup>
                </MenuList>
              </Menu>

              <BiChevronDown fontSize={25}
              // down arrow
              />

            </Flex>
          </Flex>
        </Flex>
      </Flex>
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

        {locations.map(location => {
          return (
            <Button rightIcon={<BiXCircle />} colorScheme='blue' variant='outline'>
             {location.name}
            </Button>
          )
        })}


        {/* <BiXCircle fontSize={25} /> */}
      </Flex>
    </div>

  );
};

export default Header;