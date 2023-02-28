const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

//For code refactoring, we have created a util file to store code functions which are repeated often 
//this code allows the current file to access the functions and variables defined in the restaurant-data module by importing it
//restuarant-data contains code to read and write to the JSON file
//In browser side JS, we could use another JS file without mentioning anything, but here, we have to use require keyword and also use
//module.export in the restaurant-data.js to export the functions to use in app.js and we can use const resData.functionName to use the function
//In NodeJS, for file path, . (dot) means current file location and .. (2 dots) means 1 directory above 
const resData = require('./util/restaurant-data');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/restaurants', function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants(); //Using resData.functionName

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-detail', { restaurant: restaurant });
    }
  }

  res.render('404');
});

app.get('/recommend', function (req, res) {
  res.render('recommend');
});

app.post('/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
  res.render('confirm');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.use(function (req, res) {
  res.render('404');
});

app.use(function (error, req, res, next) {
  res.render('500');
});

app.listen(3000);
