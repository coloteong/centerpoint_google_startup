import { Flex, requiredChakraThemeKeys } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import Head from "next/head";
import {config} from "./config";

const places = [
  { name: "Sample Place1" },
  { name: "Sample Place1" },
  { name: "Sample Place1" },
  { name: "Sample Place1" },
];

const Home = () => {
  const [avgcoordinates, setAvgcoordinates] = useState({ lat: 1.347, lng: 103.79 });
  const [locations, setLocations] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedplace, setSelectedplace] = useState(null);
  const [radius, setRadius] = useState(500);


  useEffect(() => {
    //console.log('type of results: ',typeof(results))
    // });
  }, [results]);

  const api_key = config.MAIN_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${api_key}`;

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      width={"100vw"}
      maxHeight={"100vh"}
      maxWidth={"100vw"}
      position={"relative"}
    >
      <Head>
        <script src={url}></script>
      </Head>

      <Header
        locations={locations}
        setLocations={setLocations}
        avgcoordinates={avgcoordinates}
        setAvgcoordinates={setAvgcoordinates}
        directionsResponse={directionsResponse}
        setDirectionsResponse={setDirectionsResponse}
        setResults={setResults}
        isLoading = {isLoading}
        setIsLoading = {setIsLoading}
        setRadius = {setRadius}
        setSelectedplace = {setSelectedplace}
      />

      <Map
        avgcoordinates={avgcoordinates}
        locations={locations}
        directionsResponse={directionsResponse}
        radius = {radius}
        results = {results}
        selectedplace = {selectedplace}
      />

    </Flex>
  );
};

export default Home;
