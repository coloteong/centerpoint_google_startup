import {Flex} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';
import PlaceDetail from '../components/PlaceDetail';
import { getPlacesData } from "./api";
import Head from 'next/head';

const places = [
  {name: 'Sample Place1'},
  {name: 'Sample Place1'},
  {name: 'Sample Place1'},
  {name: 'Sample Place1'},
];

const Home = () => {
  const [avgcoordinates, setAvgcoordinates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState([]);
  const [circleoptions, setCircleoptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

useEffect(() => {
  // fetch user current location by prompting
    // navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
    //   avgcoordinates = {lat: latitude, lng: longitude}
      avgcoordinates = {lat: 1.347, lng: 103.79}
      setAvgcoordinates(avgcoordinates);
    // });

  }, [])

  return (
  <Flex
    justifyContent={'center'}
    alignItems={'center'}
    height={'100vh'}
    width={'100vw'}
    maxHeight={'100vh'}
    maxWidth={'100vw'}
    position={'relative'}
  >

    <Head>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0"></script>
    </Head>
    
    <Header 
      locations = {locations}
      setLocations={setLocations}
      avgcoordinates = {avgcoordinates} 
      setAvgcoordinates = {setAvgcoordinates}
      directionsResponse = {directionsResponse}
      setDirectionsResponse = {setDirectionsResponse}
      circleoptions = {circleoptions}
      setCircleoptions = {setCircleoptions}
      results = {results}
      setResults = {setResults}
    />
    {results && <List places= {results} isLoading={isLoading} />}

    <Map
      avgcoordinates = {avgcoordinates} 
      locations = {locations}
      directionsResponse = {directionsResponse}
      circleoptions = {circleoptions}
    />

    {/* <PlaceDetail/> */}
  </Flex>
  );
};

export default Home;
