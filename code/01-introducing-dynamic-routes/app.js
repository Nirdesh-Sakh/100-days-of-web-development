const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/restaurants', function (req, res) {
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

/* The colon (:) in the route parameter :id specifies that the id value is a dynamic parameter that will be captured and stored 
as a property on the req.params object, allowing the server to serve dynamic content based on the parameter value.
So, :id is a placeholder or a variable that captures the value of the id parameter in the URL. When a user makes a request to a URL 
like /restaurants/123, the :id part in the URL pattern matches the 123 value and captures it as a variable called id. 
This variable is then passed to the function as req.params.id.*/
app.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;
  res.render('restaurant-detail', { rid: restaurantId });
});

app.get('/recommend', function (req, res) {
  res.render('recommend');
});

app.post('/recommend', function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
  res.render('confirm');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.listen(3000);
