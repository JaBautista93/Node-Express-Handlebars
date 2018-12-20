
// /* require Express and instantiate a variable of type "Router"
// */
// var express = require('express');
// var router  = express.Router();

// // Import the model (burger.js) so we can use its database functions.
// var burgers  = require('../models/burger.js');

// // Create the routes and associated logic
// router.get('/', function(req, res) {

//   burgers.all(function(data) {
//     var hbsObject = {
//       burgers: data
//     };
//     res.render('index', hbsObject);
//   });
// });


// router.post('/', function(req, res) {
//   burger.insertOne([
//     'burger_name',
//   ], [
//     req.body.burger_name

//   ], function(data) {
//     res.redirect('/');
//   });
// });


// router.post('/:id', function(req, res) {
//   var condition = 'id = ' + req.params.id;
//   burger.updateOne({
//     devoured: true
//   }, condition, function(data) {
//     res.redirect('/');
//   });
// });

// // Export routes for the server.js to use.
// module.exports = router;
// Rulling out my controller file
// --------------------------------------------------
var express = require("express");

var router = express.Router();
var burgers = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  burgers.all(function(burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", { burger_data: burgerData });
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for burger.addBurger
  burgers.create(req.body.burger_name, function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/:id", function(req, res) {
  burgers.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;
