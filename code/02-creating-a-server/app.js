const express = require('express'); //const express holds the express function

const app = express(); //now app will create a express object and all methods of express is available on app now

//Whenever we visit a site, get request is applied by default. /currenttime is the url which is the first parameter,
// and the second parameter value is the function to be executed for the request.
//req and res are the abbreviation of the respond and request values that u always get
app.get('/currenttime', function(req, res) {
  res.send('<h1>' + new Date().toISOString() + '</h1>');
  //We used send here instead of end like in node, because req and res are created by express and we have
  //different methods that can be used on them which is defined by express.
}); 
//As a side note, I'm never setting the status code here because Express will set it to 200 as a default

app.get('/', function(req, res) {
  res.send('<h1>Hello World!</h1>');
}); // localhost:3000/

app.listen(3000)
