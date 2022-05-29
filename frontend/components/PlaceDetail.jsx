import { Badge, Flex, Image, Text } from "@chakra-ui/react";
import { Rating } from "@material-ui/lab";
import React from "react";
import { IoLocation } from "react-icons/io5";
import { useEffect, useState } from "react";
import {RiAdvertisementFill} from "react-icons/ri";
import { config } from "../pages/config";

const PlaceDetail = ({ place, firstcolour, secondcolour, isAd, getDirectionsToCenterPoint, isInDirections, setisInDirections, nameOfPlacePressed, setNameOfPlacePressed}) => {

  const [isSelected, setIsSelected] = useState(false);
  let is_open = (place.opening_hours != null) ? ((place.opening_hours.open_now) ? "Open Now" : "Closed Now") : "Opening hours not available"

  const api_key = config.REACT_APP_MAPS_API_KEY;

  const handlePressed = (event) => {
    event.preventDefault();
    getDirectionsToCenterPoint(place)
    setisInDirections(true)
    setNameOfPlacePressed(place.name)
  }

  return (
    <Flex
      bg={isSelected ? secondcolour : firstcolour}
      px={4}
      py={2}
      mb={2}
      shadow="lg"
      direction={"column"}
      alignItems={"start"}
      justifyContent="space-between"
      onMouseOver={() => { setIsSelected(true) }}
      onMouseLeave={() => { setIsSelected(false) }}
      onClick={handlePressed}
    >
      <Flex justifyContent={"space-between"} width="full">
        <Flex
          direction={"column"}
          justifyContent={"start"}
          alignItems={"start"}
          width="full"
          px={2}
        >
          <Flex
            alignItems={"center"}
            width={"full"}
            justifyContent={"space-between"}
          >
            <Text
              textTransform={"capitalize"}
              width={"40"}
              fontSize={"lg"}
              fontWeight={"500"}
            >
              {place.name}
              <RiAdvertisementFill fontSize={isAd} color = "purple" />
            </Text>

            <Text fontSize={"sm"} fontWeight={"500"} color={"gray.500"}>
              {place.price}
            </Text>
          </Flex>

          {/* Ratings */}
          <Flex alignItems={"center"} width={"full"}>
            <Rating size="small" value={Number(place.rating)} readOnly />
            <Text
              fontSize={"sm"}
              fontWeight={"500"}
              color={"gray.500"}
            >{place.user_ratings_total ? `(${place.user_ratings_total})` : "Rating not available"}</Text>
            <Text
              fontSize={"sm"}
              fontWeight={"500"}
              color={"gray.500"}
              ml={"auto"}
            >
              {place.price_level}
            </Text>
          </Flex>

          {/* Ranking */}
          <Text fontSize={"sm"} fontWeight={"500"} color={"gray.400"}>
            {place.ranking}
          </Text>

          {/* Open status */}
          <Text fontSize={"sm"} fontWeight={"500"} color={"gray.600"}>
            {is_open}
          </Text>

        </Flex>
        <Image
          objectFit={"cover"}
          width={"120px"}
          height={"120px"}
          rounded="lg"
          src={
            place.photos
              ? "https:///maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + place.photos[0].photo_reference + "&key=" + api_key
              : "https://firebasestorage.googleapis.com/v0/b/cz3002-5e843.appspot.com/o/64818931817.png?alt=media"
          }
        />
      </Flex>

      {place?.vicinity && (
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
      )}
    </Flex>
  );
};

export default PlaceDetail;
