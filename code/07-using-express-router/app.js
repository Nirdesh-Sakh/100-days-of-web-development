//In this section, we have created a routes folder to store all related GET and POST requests to make routing more managable 
const path = require('path');

const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//The following code is defining a middleware function which will be executed when we receive all HTTP requests which has the root path "/"
//which means every path will be directed to the following middleware containing modules. For eg: localhost:3000/, localhost:3000/about, etc.
// will all be directed as both contains "/" root directory. First, it will search in the first module, if not found it will search in the
//second module
app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

app.use(function (req, res) {
  res.render('404');
});

app.use(function (error, req, res, next) {
  res.render('500');
});

app.listen(3000);
