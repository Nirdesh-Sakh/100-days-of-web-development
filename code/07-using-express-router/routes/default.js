const express = require('express');

//The following creates instance of a Express.js Router class which handles all the routing requests or specific routing requests logic
//to make routing organized and manageable
const router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/about', function (req, res) {
  res.render('about');
});

module.exports = router;
