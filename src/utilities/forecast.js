const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1201ca2b2861f4e70b1be66dbe722be7&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, `${body.location.name} is ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees Fahrenheit and feels like ${body.current.feelslike}.`);
        }
    });
}


module.exports = forecast;