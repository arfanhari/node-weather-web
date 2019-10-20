const express = require('express');
const path = require('path');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

// Geocoding (address -> lat/long)
// Forecast  (lat/long -> weather)

const app = express();
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const patrialsPath = path.join(__dirname, '../templates/partials');



// Handlebars
// allow us to render dynamic docs as opposed to static ones
// easily create code that we can reuse across pages

// Setup handlebars engine and view location
// set allows us to set a value for a given express setting.
app.set('view engine', 'hbs'); //default path root/views
app.set('views', viewsPath);
hbs.registerPartials(patrialsPath);


// Setup Static directory to serve
// app.use is a way to customize your server
// static take the path to the folder we want to serve up
app.use(express.static(publicDirPath));


app.get('', (req, res) => {
    res.render('index', {
        titlePage: 'Home',
        title: 'Weather App',
        company: 'XSIS'
    });

});

app.get('/about', (req, res) => {
    res.render('about', {
        titlePage: 'About',
        title: 'About me',
        name: 'Arfan Anhari',
        company: 'XSIS'
    });

});

app.get('/help', (req, res) => {
    res.render('help', {
        titlePage: 'Help',
        title: 'Help',
        helpContact: '089X-XXXX-XXX',
        company: 'XSIS'
    });

});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if(!address) {
        console.log('Please provide an address')
    
        return res.send({ error: 'Please provide an address' })
    } else {
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if(error) {
                return res.send({ error })
            }
            
            forecast(latitude, longitude, (error, forecastData = {}) => {
                if(error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location: location
                })
            });
        });
    }
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arfan',
        company: 'XSIS',
        errorMessage: 'Help article not found'
    })
})

// * means match anything that hasn't match so far
// should be on the bottom
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arfan',
        company: 'XSIS',
        errorMessage: 'Page not found'
    }) 
})


// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

app.listen(port, () => {
    console.log('Server is up and Running on port ' + port);
});
