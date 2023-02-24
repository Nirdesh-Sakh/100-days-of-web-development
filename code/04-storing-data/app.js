/*In this code, store the usernames, which are submitted by users in an actual text file. We added a new data folder with the filename 
users.json as json file type is easily readable by the computer, and we just include [] in the file and save it. 
In this file, we will store the username. */

//file system package required from the nodejs
const fs = require('fs'); 

//Now, to construct that path where the file is stored in a way that will work on all operating systems,I will require another core package called path
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/currenttime', function(req, res) {
  res.send('<h1>' + new Date().toISOString() + '</h1>');
}); 

app.get('/', function(req, res) {
  res.send('<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>');
}); 

app.post('/store-user', function(req, res) {
  const userName = req.body.username;
  
  //the file path should be the absolute path, here __dirname is globally available nodeJS variable holds the path where the project is saved.
  const filePath = path.join(__dirname, 'data', 'users.json'); //-> C:\Users\shakh\Music\Back End Practise\NodeJS\data\users.json

  /*we actually, first of all, need to read that file so that we can extract existing data out of it.
  Then we need to add userName to that existing data, and then write the updated existing data back into the file.*/
  const fileData = fs.readFileSync(filePath);

  /* As users.json has [] stored in the json format, it will be treated as text that contains square brackets and we cannot work with it.
  So to work with it, we need to transform it into a JavaScript object or array using JSON.parse
  JSON object has two methods, parse and stringify,and parse is the method which we need if we wanna translate some data in the JSON format
  into a raw JavaScript object or array. */
  const existingUsers = JSON.parse(fileData);

  //now existingUsers is an array, and we can insert items in the array using .push
  existingUsers.push(userName);

  //now we are writing the contents in the existingUsers to the file called users.json. The stringfy method transforms the daat in
  //JS objects or arrays into the JSON format
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send('<h1>Username stored!</h1>');
});

app.listen(3000)
