const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmlsYXlwYXJpa2giLCJhIjoiY2wwcXZ5bjliMmJhdTNrbTk4ajd3bWtjYiJ9.lvRh82Q7RjAMiUcEAdcE2Q'

    request({url, json: true} , (error,{body}) => {
        if(error) {
            callback('Geo location service is not reachable!',undefined)
        //} else if (response.body.features.length === 0) {
        } else if (body.features.length === 0) {
            console.log()
            callback('Unable to find the location!',undefined)
        } else {
            //const latitude = response.body.features[0].center[1]
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            const data = {latitude , longitude , location}
            callback(undefined,data)
        }
    })
}

// geocode('India',(error,data) => {
//     console.log(data)
//     console.log(error)
// })

module.exports = geocode