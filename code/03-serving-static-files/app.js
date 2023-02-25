const path = require('path');
const express = require('express');
const app = express();

/*This line of code sets up a static file server in an Express.js application to serve static files from the "public" directory.
When a client makes a request to the server for a static file (e.g. an image, CSS file, or JavaScript file), 
Express.js will look for the file in the "public" directory and return it to the client if it exists.
The app.use() method in Express.js is used to add middleware to the application's request processing pipeline. 
In this case, the express.static() middleware is being added to serve static files. The argument passed to express.static() 
specifies the root directory from which the static files should be served, in this case, the "public" directory. */
app.use(express.static('public'));

app.get('/', function (req, res) {
  const htmlFilePath = path.join(__dirname, 'views', 'index.html');
  res.sendFile(htmlFilePath);
});

app.get('/restaurants', function (req, res) {
  const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
  res.sendFile(htmlFilePath);
});

app.get('/recommend', function (req, res) {
  const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
  res.sendFile(htmlFilePath);
});

app.get('/confirm', function (req, res) {
  const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
  res.sendFile(htmlFilePath);
});

app.get('/about', function (req, res) {
  const htmlFilePath = path.join(__dirname, 'views', 'about.html');
  res.sendFile(htmlFilePath);
});

app.listen(3000);
