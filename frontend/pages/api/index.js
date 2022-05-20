// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import axios from "axios";


// const url ='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8599358%2C151.2090295&radius=50&type=restaurant&key=AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0'

// const API_KEY = "AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0";
// const LOCATION ="33.8599358%2C151.2090295";
// const PURPOSE = "restaurant";

// export async function getPlacesData({  }) {
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${API_KEY}&location=${LOCATION}&type=${PURPOSE}`;
// // const url ='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8599358%2C151.2090295&radius=50&type=restaurant&key=AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0';
// const res = await fetch( url);
// const resJson = await res.json();

// const data = {
//   status: resJson.status,
//   candidates: resJson.candidates.map(item => {
//     let image = ''

//     if ('photos' in item) {
//       image = `https://maps.googleapis.com/maps/api/place/photo?key=${API_KEY}&maxwidth=400&photoreference=${item.photos[0].photo_reference}`
//     }

//     return {
//       formatted_address: item.formatted_address,
//       icon: item.icon,
//       name: item.name,
//       place_id: item.place_id,
//       types: item.types,
//       image: image,
//     }
//   }),
// }

// return {
//   props: {
//     data,
//   }
// }
// }

// // export async function getPlacesData({  }) {

// // const proxyurl = "https://cors-anywhere.herokuapp.com/";
// // const url ='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8599358%2C151.2090295&radius=50&type=restaurant&key=AIzaSyDPRi8jxCGzccPR34SkCjnEOh8F6ZKK_q0';
// // var axios = require('axios');

// // let headers = new Headers();

// // // headers.append('Content-Type', 'application/json');
// // // headers.append('Accept', 'application/json');
// // // headers.append('Origin','http://localhost:3000');


// // var config = {
// //   method: 'get',
// //   url: url,
// //   // headers: {Access-Control-Allow-Origin: *},
// //   secure: false //important
// // };

// // axios(config)
// // .then(function (response) {
// //   console.log(JSON.stringify(response.data));
// //   return response.data


// // })
// // .catch(function (error) {
// //   console.log(error);
// // });


// // }