const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2f899117dd5fdb2cfb68c33191985b75&query='+longitude+','+latitude 
    //37.8267,-122.4233'

    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Weather service is not reachable!',undefined)
        } else if (body.error) {
            callback('Location not found!',undefined)
        } else {

             const currentTemperature = body.current.temperature
             const feelsTemperature = body.current.feelslike
             callback(undefined,'The current temperature is ' + currentTemperature + ' and it feels like ' + feelsTemperature + '.')
        }
    })
}

// forecast(37.8267,-122.4233 , (error,data) => {
//     console.log(error)
//     console.log(data)
// })

module.exports = forecast