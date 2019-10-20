const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYXJmYW5oYXJpIiwiYSI6ImNrMXJrMGR5MDA2MDEzYnA0cmc5NTBhaHEifQ.UX551z09cICIZXNMO5SJ9A'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;