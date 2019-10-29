const axios = require("axios");

let zip = 19106;
let keyword = "bowling alley";
let api = "AIzaSyCTA_YDf1KfYOlXtBvHgo0n5S0iXRrBpHw";

axios
  .get(
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
      keyword +
      "&input=" +
      zip +
      "&radius=10000&key=" +
      api
  )
  .then(res => {
    for (i = 0; i < res.data.results.length; i++) {
      const { lat, lng } = res.data.results[i].geometry.location;
      const { formatted_address, name } = res.data.results[i];
    }
  })
  .catch(error => {
    console.log(error);
  });
