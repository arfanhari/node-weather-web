const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/ff3c1c7ff669864e63c2ba492fa3627b/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service :(', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined,
                body.daily.data[0].summary + 
                " It is currently " +
                body.currently.temperature + 
                " degrees out. There is  a " + 
                body.currently.precipProbability + 
                '% change of rain.'
            );
        }
    })
}

module.exports = forecast;