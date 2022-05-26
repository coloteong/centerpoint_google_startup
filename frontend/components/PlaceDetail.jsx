import { Badge, Flex, Image, Text } from "@chakra-ui/react";
import { Rating } from "@material-ui/lab";
import React from "react";
import { IoLocation } from "react-icons/io5";
import { useEffect, useState } from "react";

const PlaceDetail = ({ place, getDirectionsToCenterPoint }) => {

  const [ isSelected, setIsSelected ] = useState(false); 
  

  let is_open = (place.opening_hours != null) ? ( (place.opening_hours.open_now)? "Open Now" : "Closed Now" ): "Opening hours not available" 

  return (
    <Flex
      bg={ isSelected ? "gray.200" : "whiteAlpha.900" }
      px={4}
      py={2}
      mb={2}
      shadow="lg"
      direction={"column"}
      alignItems={"start"}
      justifyContent="space-between"
      onMouseOver={() => {setIsSelected(true)}}
      onMouseLeave={() => {setIsSelected(false)}}
      onClick = {() => {getDirectionsToCenterPoint(place)}}
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
              isTruncated
            >
              {place.name}
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
            >{place.user_ratings_total ? `(${place.user_ratings_total})` : " Rating not available"}</Text>
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
              ? "https:///maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + place.photos[0].photo_reference + "&key=" + "AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0"
              : "https://firebasestorage.googleapis.com/v0/b/cz3002-5e843.appspot.com/o/64818931817.png?alt=media"
          }
        />
      </Flex>

      {place?.vicinity && (
        <Flex alignItems={"center"} width={"full"} px={1} my={2}>
          <IoLocation fontSize={20} color="gray" />
          <Text
            isTruncated
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
