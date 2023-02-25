const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

// Sets the 'views' configuration option for the Express app to the 'views' directory
/*In Express, the views configuration option is used to specify the directory where the application's views (i.e., HTML templates) 
are stored. Views are used to render dynamic content on the server-side and generate HTML pages that can be sent back to the client 
in response to a request.*/
app.set('views', path.join(__dirname, 'views'));

// Sets the 'view engine' configuration option for the Express app to 'ejs'
// This tells Express to use the EJS (Embedded JavaScript) templating engine to render views
// EJS allows you to embed JavaScript code directly in your HTML templates
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

/*Now, we have changed the format of the html files to .ejs in views directory. So, we can easily route the request using .render
method instead of having to calculate the path and then use res.send. Also, we don't even have to specify the extension of the
files in the views directory as they are already in .ejs extension and the view engine is set to ejs. */
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/restaurants', function (req, res) {
  res.render('restaurants');
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
