//The following code will output a form where users can enter some data, let's say simply a name,and then store that data in a file 
//on my server, so on this remote machine. Also want to set up a route,so a path where we list all the submitted names.

const express = require('express');
const app = express();

/*Use also allows us to handle incoming requests,but unlike get and post,it simply doesn't care about the kind of request that it is.
It will be applied to all requests.And hence we also don't necessarily need to define a path here, though we could do that,but instead 
we can also directly just add an extra handler that should be executed on all incoming requests.

And such general handler functions which apply to more than one type of request are typically called middleware function because they are 
in the middle between Express seeing that request and our code handling that request.And here we need a middleware function that will look
if the request, the incoming request,has any kind of data and which will then extract that data.

Now, as a middleware, we will now use Express,so not the app but Express itself, and on that access to urlencoded method
which it actually is. Now, urlencoded is a method that will set up a body parser, so a incoming request data parser,
that will look at all the incoming requests.And if they carry form data, that's what urlencoded will look for,
it will parse that included data and translate it into a JavaScript object.

Now, the only thing we should also do here is, to urlencoded, to this method, we should pass a JavaScript object as an argument and 
set extended equal to false here. This option doesn't matter too much right now,but we should explicitly set it to avoid getting warnings.*/

app.use(express.urlencoded({extended: false}));

//.get to handle GET requests to localhost:3000/currenttime
app.get('/currenttime', function(req, res) {
  res.send('<h1>' + new Date().toISOString() + '</h1>');
}); 

//This to handle GET requests to localhost:3000 which will display a form to enter your name and the data is saved in the varible defined
//below as name="username"
app.get('/', function(req, res) {
  res.send('<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>');
}); 

//.post to handle the POST request where first parameter sets the route or path where the data will be stored and 2nd parameter executes the function
app.post('/store-user', function(req, res) {
  const userName = req.body.username;
  console.log(userName);
  res.send('<h1>Username stored!</h1>');
});

app.listen(3000)
