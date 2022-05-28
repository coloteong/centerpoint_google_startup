import { Box, Flex, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import React, { useEffect } from 'react'
import PlaceDetail from "./PlaceDetail";


const List = ({ places, isLoading, getDirectionsToCenterPoint }) => {
  if (typeof (places) === "string") {
    places = JSON.parse(places)
  }
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
    <Flex
      direction={"column"}
      overflowY={"scroll"}
      height="71vh"
    >

      {places && places.map((place, idx) => {
        
        let firstcolour = "whiteAlpha.900";
        let secondcolour = "gray.100";
        let isAd = 0;
        if (idx === 0) { // promoted
          firstcolour = "gray.300" ;
          secondcolour = "gray.200";
          isAd = 25;
        }
        return (
          <PlaceDetail place={place} key={idx} firstcolour={firstcolour} secondcolour = {secondcolour} isAd = {isAd} getDirectionsToCenterPoint={getDirectionsToCenterPoint} />
        )
      })}
    </Flex>
    // <Flex
    //   direction={"column"}
    //   bg={"whiteAlpha.900"}
    //   width={"37vw"}
    //   height="100vh"
    //   position={"absolute"}
    //   left={0}
    //   top={40}
    //   zIndex={1}
    //   overflow="hidden"
    //   px={2}
    // >
    //   <Flex flex={1} overflowY={"scroll"} mt={16} direction={"column"}>

    //     {places  && places.map((place, idx) => {
    //       return(
    //         <PlaceDetail place = {place} key = {idx} />
    //       )
    //     })}

    //   </Flex>
    // </Flex>
  );
};


export default List;