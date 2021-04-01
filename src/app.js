const path = require('path');
const express = require('express');                                 // Import webserver module.
const hbs = require('hbs');
const geocode = require('./utilities/geocode.js');
const forecast = require('./utilities/forecast.js');

const app = express();                                              // Start webserver.

// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public');      // Public files directory.
const viewsPath = path.join(__dirname, '../templates/views');       // Handlebars template files directory.
const partialsPath = path.join(__dirname, '../templates/partials'); // Handlebars partials files directory.

// Set up handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve.
app.use(express.static(publicDirectoryPath));                       // Root directory.

// Render index (root) page via handlebars.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tikaani Aurora'
    });
});

// Render about page via handlebars.
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tikaani Aurora'
    });
});

// Render help page via handlebars.
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tikaani Aurora'
    });
});

// Weather route.
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
        
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

// Help 404 page route.
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Tikaani Aurora',
        errorText: 'Page not found.'
    });
});

// 404 page route.
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Tikaani Aurora',
        errorText: 'Page not found.'
    });
});

// Console message showing server is running on specified port.
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});