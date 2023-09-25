const request = require('request')

const geocode = (address, callback) => {

  const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYml6enp6enp6byIsImEiOiJjbGhqZnYwczkwaHAzM2pwMTB0dGx5dm1jIn0.jM8vdv7SIaeKl3QLh5W-Ng'

  request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
      callback("Low Level Error");
    } else if (response.body.message, undefined) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length == 0) {
      callback("You didn't enter any available    location", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1]
      }
      );
      // You can use the "longitude" variable here for further processing
    }
  })
}
module.exports = geocode;