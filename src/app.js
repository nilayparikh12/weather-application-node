const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('' , (req,res) => {
    res.render('index' , {
        title: 'Weather',
        name: 'Nilay'
    })
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title: 'About Me',
        name: 'Nilay'
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title: 'Help Page !!',
        name: 'Nilay'
    })
})


app.get('/weather' , (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'You must provide an address term.'})
    }
    geocode(req.query.address,(error,{longitude,latitude,location} = {}) => {
        if(error){
            return res.send({error:'Error finding geocode!'})
        }
        forecast(latitude,longitude , (error,forecastData) => {
            if(error) {
                return res.send({error: 'Error to get forecast temperature!'})
            }
            res.send({
                location: location,
                weather: forecastData,
                address: req.query.address
            })
        })
    })
    

    
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({ error: 'You must provide a search term.'})
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Nilay',
        message: 'Help article not found!'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Nilay',
        message: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})