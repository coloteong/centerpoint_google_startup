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
  //const [coordinates, setCoordinates] = useState({lat: 48.8584, lng: 2.2945});
  const [avgcoordinates, setAvgcoordinates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [type, setType] = useState('restaurants');
  const [ratings, setRatings] = useState("");
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  // fetch user current location by prompting
    // navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
    //   avgcoordinates = {lat: latitude, lng: longitude}
      avgcoordinates = {lat: 1.347, lng: 103.79}
      setAvgcoordinates(avgcoordinates);
    // });

  }, [])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/testing",{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }})
    .then(async response => {
      try {
       const data = await response.json()
       console.log( data)
     } catch(error) {
       console.log('Error happened here!')
       console.error(error)
     }
    })
  }, []);
  

  // useEffect(() => {
  //   getPlacesData().then((data) => {
  //     console.log(data);
  //   });
  // },[]);

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
      setType={setType}
      setRatings ={setRatings}
      locations = {locations}
      setLocations={setLocations}
      avgcoordinates = {avgcoordinates} 
      setAvgcoordinates = {setAvgcoordinates}
    />
    {/* <List places= {places} isLoading={isLoading} /> */}

    <Map
      avgcoordinates = {avgcoordinates} 
      locations = {locations}

    />

    {/* <PlaceDetail/> */}
  </Flex>
  );
};

export default Home;
