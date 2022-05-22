
import React from 'react'
import GoogleMapReact from 'google-map-react'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow
} from '@react-google-maps/api'


import {
  Box,
  Flex,
  SkeletonText

} from '@chakra-ui/react'

import { useRef, useState } from 'react'


import {onLoad} from "./Header";

function Map({coordinates, setCoordinates,locations}) {

  // const { isLoaded } = useJsApiLoader({
  //   // googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  //   googleMapsApiKey: 'AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0',
  //   libraries: ['places'],
  // })
      // locations.map(e=>{
      //   console.log(e.geometry.location.lat())
      // })


  const [map, setMap] = useState(/** @type google.maps.Map */ (null))

  // if (!isLoaded) {
  //   return <SkeletonText />
  // }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={{lat : 1.3496, lng: 103.8198}}
          defaultCenter={{lat : 1.3496, lng: 103.8198}}
          margin={[50, 50, 50, 50]}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            // zoomControl: false, //true
            streetViewControl: false,
            mapTypeControl: false,
            // fullscreenControl: false,
          }}
          onLoad={map => setMap(map)} 
        >

          {locations.map((location, idx) => {
      
            if(idx >= 0){
              console.log(location.geometry.location)
              return (
                <div>
              <Marker position={{lat: location.geometry.location.lat(), lng:location.geometry.location.lng() }} id = {idx} title = {location.name } label = '😮' draggable = {true} >

              </Marker>
              </div>
              )
 
            }
          })}

           
     
        </GoogleMap>
        </Box>
    </Flex>
  )
}



export default Map;
